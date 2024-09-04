const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let superflat = localStorage.getItem('superflat');

const inventory = {};

scene.background = new THREE.Color(0xffffff);

if (superflat == 'true') {
    scene.fog = new THREE.Fog(0xffffff, 4, 12);
} else {
    scene.fog = new THREE.Fog(0xffffff, 4, 6);
}

const gridSize = 10;
const spacing = 1;
const halfGridSize = Math.floor(gridSize / 2);
const geometry = new THREE.BoxGeometry();

const planeGeometry = new THREE.PlaneGeometry((gridSize - 1) * spacing, (gridSize - 1) * spacing, 1, 1);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const playerHeight = 2.0;
const player = {
    position: new THREE.Vector3(0, playerHeight / 2, 0),
    velocity: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
    onGround: false
};

camera.position.copy(player.position);
camera.position.y += playerHeight / 2;
camera.rotation.copy(player.rotation);

let mouseLocked = false;

function lockMouse() {
    if (!mouseLocked) {
        renderer.domElement.requestPointerLock();
        mouseLocked = true;
    }
}

renderer.domElement.addEventListener('click', lockMouse);

document.addEventListener('pointerlockchange', function() {
    mouseLocked = document.pointerLockElement === renderer.domElement;
});

const keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

const euler = new THREE.Euler(0, 0, 0, 'YXZ');
const rotationSpeed = Math.PI / 1000;

document.addEventListener('mousemove', (event) => {
    if (mouseLocked) {
        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        euler.y -= movementX * rotationSpeed;
        euler.x -= movementY * rotationSpeed;
        euler.x = Math.min(Math.max(euler.x, -1.5), 1.0472);

        camera.quaternion.setFromEuler(euler);
    }
});

const hand = document.getElementById('hand');

function handleMovement() {
    const speed = 0.1;
    const friction = .8;
    const gravity = 0.04;
    const jumpStrength = 0.4;

    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(camera.quaternion);

    const right = new THREE.Vector3(1, 0, 0);
    right.applyQuaternion(camera.quaternion);

    direction.normalize();
    right.normalize();

    if (keys['KeyW']) {
        player.velocity.add(direction.clone().multiplyScalar(speed));
    }
    if (keys['KeyS']) {
        player.velocity.sub(direction.clone().multiplyScalar(speed));
    }
    if (keys['KeyA']) {
        player.velocity.sub(right.clone().multiplyScalar(speed));
    }
    if (keys['KeyD']) {
        player.velocity.add(right.clone().multiplyScalar(speed));
    }
    if (keys['Space'] && player.onGround) {
        player.velocity.y = jumpStrength;
        player.onGround = false;
    }

    //hand.style.animation = 'bob 1s ease-in-out';

    player.velocity.x *= friction;
    player.velocity.z *= friction;

    player.velocity.y -= gravity;

    const previousPosition = player.position.clone();
    player.position.add(player.velocity);

    if (player.position.y < -10) {
        player.position.y = 60;
    }

    handleCollisionDetection();

    camera.position.copy(player.position);
    camera.position.y += playerHeight / 2;

    updateFrustum();

    scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            const distance = child.position.distanceTo(player.position);
            let isVisible;
            if (superflat == 'false') {
                isVisible = distance < 7;
            } else {
                isVisible = distance < 13;
            }
            child.visible = isVisible && isBlockInFrustum(child);
        }
    });
}

function isBlockInFrustum(block) {
    const box = new THREE.Box3().setFromObject(block);
    return camera.frustum.intersectsBox(box);
}

function updateFrustum() {
    camera.updateMatrixWorld();
    const matrix = new THREE.Matrix4();
    matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    if (!camera.frustum) {
        camera.frustum = new THREE.Frustum();
    }
    camera.frustum.setFromMatrix(matrix);
}

function handleCollisionDetection() {
    const playerBoundingBox = new THREE.Box3().setFromObject(camera);

    const raycasterDown = new THREE.Raycaster(player.position, new THREE.Vector3(0, -1, 0));
    const raycasterUp = new THREE.Raycaster(player.position, new THREE.Vector3(0, 1, 0));
    const raycasterLeft = new THREE.Raycaster(player.position, new THREE.Vector3(-1, 0, 0));
    const raycasterRight = new THREE.Raycaster(player.position, new THREE.Vector3(1, 0, 0));
    const raycasterForward = new THREE.Raycaster(player.position, new THREE.Vector3(0, 0, -1));
    const raycasterBackward = new THREE.Raycaster(player.position, new THREE.Vector3(0, 0, 1));

    const intersectionsDown = raycasterDown.intersectObjects(scene.children, true);
    const intersectionsUp = raycasterUp.intersectObjects(scene.children, true);
    const intersectionsLeft = raycasterLeft.intersectObjects(scene.children, true);
    const intersectionsRight = raycasterRight.intersectObjects(scene.children, true);
    const intersectionsForward = raycasterForward.intersectObjects(scene.children, true);
    const intersectionsBackward = raycasterBackward.intersectObjects(scene.children, true);

    if (intersectionsDown.length > 0) {
        const intersectionDown = intersectionsDown[0];
        const distanceDown = intersectionDown.distance;
        const collisionY = intersectionDown.point.y;

        if (distanceDown < playerHeight / 2 + .1) { // 0.1 is a small buffer for collision tolerance
            player.onGround = true;
            player.velocity.y = 0;
            player.position.y = collisionY + playerHeight / 2;
        }
    }

    if (intersectionsUp.length > 0) {
        const intersectionUp = intersectionsUp[0];
        const distanceUp = intersectionUp.distance;
        const collisionY = intersectionUp.point.y;

        if (distanceUp < playerHeight / 2) {
            player.velocity.y = Math.min(0, player.velocity.y);
            player.position.y = collisionY - playerHeight / 2;
        }
    }

    // Handle leftward collision
    if (intersectionsLeft.length > 0) {
        const intersectionLeft = intersectionsLeft[0];
        const distanceLeft = intersectionLeft.distance;
        const collisionX = intersectionLeft.point.x;

        if (distanceLeft < 0.5) {
            player.velocity.x = Math.max(0, player.velocity.x);
            player.position.x = collisionX + 0.51;
        }
    }

    // Handle rightward collision
    if (intersectionsRight.length > 0) {
        const intersectionRight = intersectionsRight[0];
        const distanceRight = intersectionRight.distance;
        const collisionX = intersectionRight.point.x;

        if (distanceRight < 0.5) {
            player.velocity.x = Math.min(0, player.velocity.x);
            player.position.x = collisionX - 0.51;
        }
    }

    // Handle forward collision
    if (intersectionsForward.length > 0) {
        const intersectionForward = intersectionsForward[0];
        const distanceForward = intersectionForward.distance;
        const collisionZ = intersectionForward.point.z;

        if (distanceForward < 0.5) {
            player.velocity.z = Math.max(0, player.velocity.z);
            player.position.z = collisionZ + 0.51;
        }
    }

    // Handle backward collision
    if (intersectionsBackward.length > 0) {
        const intersectionBackward = intersectionsBackward[0];
        const distanceBackward = intersectionBackward.distance;
        const collisionZ = intersectionBackward.point.z;

        if (distanceBackward < 0.5) {
            player.velocity.z = Math.min(0, player.velocity.z);
            player.position.z = collisionZ - 0.51;
        }
    }
}

function animate() {
    calculateFPS(performance.now());

    requestAnimationFrame(animate);

    handleMovement();

    updateCameraPosition();

    renderer.render(scene, camera);
}

const chunkSize = 10;
const chunkDistance = 3;

const simplex = new SimplexNoise();

function generateChunk(x, z) {
    if (superflat == 'false') {
        for (let i = 0; i < chunkSize; i++) {
            for (let j = 0; j < chunkSize; j++) {
                // Generate stone blocks from y = -1 to -20
                for (let k = -1; k >= -2; k--) {
                    const stoneMaterial = new THREE.MeshFaceMaterial(stoneTexture);
                    stoneMaterial.name = 'stone';
                    const stoneBlock = new THREE.Mesh(geometry, stoneMaterial);
                    stoneBlock.position.set((x * chunkSize) + i, k, (z * chunkSize) + j);
                    scene.add(stoneBlock);
                }

                const height = Math.floor(simplex.noise2D((x * chunkSize + i) / 20, (z * chunkSize + j) / 20) * 5 + 5);

                if (height > 0) {
                    const grassMaterial = new THREE.MeshFaceMaterial(grassTexture);
                    grassMaterial.name = 'grass';
                    const grassBlock = new THREE.Mesh(geometry, grassMaterial);
                    grassBlock.position.set((x * chunkSize) + i, height, (z * chunkSize) + j);
                    scene.add(grassBlock);

                    if (Math.random() < 0.01 && height < 8) {
                        generateOakTree((x * chunkSize) + i, height + 1, (z * chunkSize) + j);
                    }
                }

                for (let k = 0; k < height; k++) {
                    const dirtMaterial = new THREE.MeshFaceMaterial(dirtTexture);
                    dirtMaterial.name = 'dirt';
                    const dirtBlock = new THREE.Mesh(geometry, dirtMaterial);
                    dirtBlock.position.set((x * chunkSize) + i, k, (z * chunkSize) + j);
                    scene.add(dirtBlock);
                }
            }
        }
    } else {//Superflats:
        for (let i = 0; i < chunkSize; i++) {
            for (let j = 0; j < chunkSize; j++) {
                // Generate stone blocks from y = -1 to
                for (let k = -1; k >= -1; k--) {
                    const stoneMaterial = new THREE.MeshFaceMaterial(stoneTexture);
                    stoneMaterial.name = 'stone';
                    const stoneBlock = new THREE.Mesh(geometry, stoneMaterial);
                    stoneBlock.position.set((x * chunkSize) + i, k, (z * chunkSize) + j);
                    scene.add(stoneBlock);
                }

                for (let k = 1; k >= 0; k--) {
                    const dirtMaterial = new THREE.MeshFaceMaterial(dirtTexture);
                    dirtMaterial.name = 'dirt';
                    const dirtBlock = new THREE.Mesh(geometry, dirtMaterial);
                    dirtBlock.position.set((x * chunkSize) + i, k, (z * chunkSize) + j);
                    scene.add(dirtBlock);
                }

                for (let k = 2; k >= 2; k--) {
                    const grassMaterial = new THREE.MeshFaceMaterial(grassTexture);
                    grassMaterial.name = 'grass';
                    const grassBlock = new THREE.Mesh(geometry, grassMaterial);
                    grassBlock.position.set((x * chunkSize) + i, k, (z * chunkSize) + j);
                    scene.add(grassBlock);
                }
            }
        }
    }
}




function generateOakTree(x, y, z) {
    const trunkHeight = Math.floor(Math.random() * 3) + 2;
    const leavesRadius = Math.floor(Math.random() * 2) + 2;
    const occupiedPositions = new Set();

    // Check if position is occupied by dirt or grass
    const isOccupied = (x, y, z) => {
        const key = `${x},${y},${z}`;
        return occupiedPositions.has(key);
    };

    for (let i = 0; i < trunkHeight; i++) {
        const oakLogMaterial = new THREE.MeshFaceMaterial(oakLogTexture);
        oakLogMaterial.name = 'oak_log';
        const oakLogBlock = new THREE.Mesh(geometry, oakLogMaterial);
        oakLogBlock.position.set(x, y + i, z);
        scene.add(oakLogBlock);
        occupiedPositions.add(`${x},${y + i},${z}`);
    }

    for (let offsetX = -leavesRadius; offsetX <= leavesRadius; offsetX++) {
        for (let offsetY = -leavesRadius; offsetY <= leavesRadius; offsetY++) {
            for (let offsetZ = -leavesRadius; offsetZ <= leavesRadius; offsetZ++) {
                const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY + offsetZ * offsetZ);
                const positionKey = `${x + offsetX},${y + trunkHeight + offsetY},${z + offsetZ}`;

                if (distance <= leavesRadius && Math.random() < 0.5 && !isOccupied(x + offsetX, y + trunkHeight + offsetY, z + offsetZ)) {
                    // Check if position is not occupied by dirt or grass
                    const oakLeavesMaterial = new THREE.MeshFaceMaterial(oakLeavesTexture);
                    oakLeavesMaterial.name = 'oak_leaves';
                    const oakLeavesBlock = new THREE.Mesh(geometry, oakLeavesMaterial);
                    oakLeavesBlock.position.set(x + offsetX, y + trunkHeight + offsetY, z + offsetZ);
                    scene.add(oakLeavesBlock);
                    occupiedPositions.add(positionKey);
                }
            }
        }
    }
}


for (let i = -chunkDistance; i <= chunkDistance; i++) {
    for (let j = -chunkDistance; j <= chunkDistance; j++) {
        generateChunk(i, j);
    }
}

function getHighestBlockY(x, z) {
    let maxY = -Infinity;
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child !== plane) {
            if (Math.floor(child.position.x) === Math.floor(x) && Math.floor(child.position.z) === Math.floor(z)) {
                if (child.position.y > maxY) {
                    maxY = child.position.y;
                }
            }
        }
    });
    return maxY;
}

const initialX = 0;
const initialZ = 0;
const highestY = getHighestBlockY(initialX, initialZ);
player.position.set(initialX, highestY + playerHeight / 2, initialZ);
camera.position.copy(player.position);
camera.position.y += playerHeight / 2;

const coordinatesDiv = document.getElementById("coordinates");

function updateCoordinatesText(position) {
    coordinatesDiv.textContent = `x: ${position.x.toFixed(2)}, y: ${position.y.toFixed(2) - .5}, z: ${position.z.toFixed(2)}`;
}

function updateCameraPosition() {
    camera.position.copy(player.position);
    camera.position.y += playerHeight / 2.5;
    updateCoordinatesText(player.position);
}

let musicPlayed = false;

document.addEventListener('mousedown', (event) => {
    if (!musicPlayed) {
        playRandomMusic();
        musicPlayed = true;
    }
    if (mouseLocked) {
        if (event.button === 0) {
            deleteBlock();
        } else if (event.button === 2) {
            addBlock();
        }
    }
});

function deleteBlock() {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera({ x: 0, y: 0 }, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const intersect = intersects[0];
        if (intersect.object !== plane) {
            let blockId = intersect.object.material.name;

            const audio = new Audio(`assets/sound/break/${blockId}.ogg`);
            audio.play();

            scene.remove(intersect.object);

            if (blockId == 'grass') {
                blockId = 'dirt';
            } else if (blockId == "stone") {
                blockId = 'cobblestone';
            } else if (blockId == "oak_leaves") {
                return;
            }
            addToInventory(blockId);
        }
    }
}


function addBlock() {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera({ x: 0, y: 0 }, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const intersect = intersects[0];
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(intersect.object.matrixWorld);
        const normal = intersect.face.normal.clone().applyMatrix3(normalMatrix).normalize();

        const position = intersect.point
            .add(normal.clone().multiplyScalar(0.5))
            .add(normal.clone().multiplyScalar(0.01));

        position.set(
            Math.floor(position.x),
            Math.floor(position.y),
            Math.floor(position.z)
        );

        const isInsideBlock = scene.children.some(child => {
            if (child instanceof THREE.Mesh && child !== plane) {
                const box = new THREE.Box3().setFromObject(child);
                return box.containsPoint(position);
            }
            return false;
        });

        if (!isInsideBlock) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshFaceMaterial(dirtTexture);
            const newVoxel = new THREE.Mesh(geometry, material);
            newVoxel.position.copy(position);

            scene.add(newVoxel);
        }
    }
}

function addToInventory(blockId) {
    if (!blockId) {
        return;
    }

    if (inventory.hasOwnProperty(blockId)) {
        inventory[blockId]++;
    } else {
        inventory[blockId] = 1;
    }
    console.log(inventory);
}

//Music:

function playRandomMusic() {
    const randomIndex = Math.floor(Math.random() * 12) + 1;
    new Audio(`/assets/sound/music/${randomIndex}.ogg`).play();
}

setInterval(playRandomMusic, 5 * 60 * 1000);

//Fps Counter:

let frameCount = 0;
let fps = 0;
let lastTimeStamp = performance.now();

function calculateFPS(currentTimeStamp) {
    const deltaTime = (currentTimeStamp - lastTimeStamp) / 1000;
    frameCount++;

    fps = 1 / deltaTime;
    document.getElementById('fps').innerHTML = `FPS: ${Math.round(fps * 5)}`;

    lastTimeStamp = currentTimeStamp;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

animate();
updateCameraPosition();

document.addEventListener('DOMContentLoaded', () => {

    // Toggle inventory visibility when pressing "i" key
    document.addEventListener('keydown', (event) => {

        if (event.code === 'KeyI') {
            document.exitPointerLock();
            toggleInventory();
        }
        if(event.code === 'KeyT') {
            
        }
    });

    function toggleInventory() {
        if (inventory.style.display === 'none' || !inventory.style.display) {
            inventory.style.display = 'flex';
        } else {
            inventory.style.display = 'none';
        }
    }
});
