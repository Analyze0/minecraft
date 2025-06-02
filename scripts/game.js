const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let superflat = localStorage.getItem('superflat');

const inventory = {};

scene.background = new THREE.Color(0xdcebf8);


/*if (superflat == 'true') {
    scene.fog = new THREE.Fog(0xffffff, 4, 12);
} else {
    scene.fog = new THREE.Fog(0xffffff, 6, 10);
}*/

const gridSize = 10;
const spacing = 1;
const halfGridSize = Math.floor(gridSize / 2);
const geometry = new THREE.BoxGeometry();

const planeGeometry = new THREE.PlaneGeometry((gridSize - 1) * spacing, (gridSize - 1) * spacing, 1, 1);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
//scene.add(plane);

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
    const speed = 0.05;
    const friction = .8;
    const gravity = 0.01;
    const jumpStrength = 0.17;

    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(camera.quaternion);
    direction.y = 0; // Ignore vertical component
    direction.normalize();

    const right = new THREE.Vector3(1, 0, 0);
    right.applyQuaternion(camera.quaternion);
    right.y = 0; // Ignore vertical component
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
                isVisible = distance < 10;
            } else {
                isVisible = distance < 15;
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
    const playerBox = new THREE.Box3().setFromCenterAndSize(
        player.position.clone(),
        new THREE.Vector3(0.8, playerHeight, 0.8) // width, height, depth
    );

    player.onGround = false;

    for (const child of scene.children) {
        if (!(child instanceof THREE.Mesh) || child === camera) continue;

        const blockBox = new THREE.Box3().setFromObject(child);
        if (!playerBox.intersectsBox(blockBox)) continue;

        const overlap = new THREE.Vector3();

        const playerMin = playerBox.min;
        const playerMax = playerBox.max;
        const blockMin = blockBox.min;
        const blockMax = blockBox.max;

        const xOverlap = Math.min(playerMax.x - blockMin.x, blockMax.x - playerMin.x);
        const yOverlap = Math.min(playerMax.y - blockMin.y, blockMax.y - playerMin.y);
        const zOverlap = Math.min(playerMax.z - blockMin.z, blockMax.z - playerMin.z);

        if (yOverlap < xOverlap && yOverlap < zOverlap) {
            // Vertical collision
            if (player.position.y > child.position.y) {
                // Landed on block
                player.position.y += yOverlap;
                player.velocity.y = 0;
                player.onGround = true;
            } else {
                // Hit head
                player.position.y -= yOverlap;
                player.velocity.y = Math.min(0, player.velocity.y);
            }
        } else if (xOverlap < zOverlap) {
            // Horizontal X collision
            if (player.position.x > child.position.x) {
                player.position.x += xOverlap;
                player.velocity.x = Math.max(0, player.velocity.x);
            } else {
                player.position.x -= xOverlap;
                player.velocity.x = Math.min(0, player.velocity.x);
            }
        } else {
            // Horizontal Z collision
            if (player.position.z > child.position.z) {
                player.position.z += zOverlap;
                player.velocity.z = Math.max(0, player.velocity.z);
            } else {
                player.position.z -= zOverlap;
                player.velocity.z = Math.min(0, player.velocity.z);
            }
        }

        // Update bounding box after resolution
        playerBox.setFromCenterAndSize(player.position.clone(), new THREE.Vector3(0.8, playerHeight, 0.8));
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
                    if (Math.random() < 0.001 && height < 8) {
                        generateVillageHouse((x * chunkSize) + i, height + 1, (z * chunkSize) + j);
                    }
                }

                for (let k = -3; k >= -3; k--) {
                    const bedrockMaterial = new THREE.MeshFaceMaterial(bedrockTexture);
                    bedrockMaterial.name = 'bedrock';
                    const bedrockBlock = new THREE.Mesh(geometry, bedrockMaterial);
                    bedrockBlock.position.set((x * chunkSize) + i, k, (z * chunkSize) + j);
                    scene.add(bedrockBlock);
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

                for (let k = -2; k >= -2; k--) {
                    const bedrockMaterial = new THREE.MeshFaceMaterial(bedrockTexture);
                    bedrockMaterial.name = 'bedrock';
                    const bedrockBlock = new THREE.Mesh(geometry, bedrockMaterial);
                    bedrockBlock.position.set((x * chunkSize) + i, k, (z * chunkSize) + j);
                    scene.add(bedrockBlock);
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

function generateVillageHouse(x, y, z) {
    const houseLayers = [
        [
            "11111",
            "11111",
            "11111",
            "11111",
            "11111"
        ],
        [
            "12021",
            "20002",
            "20002",
            "20002",
            "12221"
        ],
        [
            "12021",
            "20002",
            "30003",
            "20002",
            "12321"
        ],
        [
            "12221",
            "20002",
            "20002",
            "20002",
            "12221"
        ],
        [
            "44444",
            "42224",
            "42224",
            "42224",
            "44444"
        ]
    ];

    for (let layerIndex = 0; layerIndex < houseLayers.length; layerIndex++) {
        const pattern = houseLayers[layerIndex];
        const occupiedPositions = new Set();

        const isOccupied = (x, y, z) => {
            const key = `${x},${y},${z}`;
            return occupiedPositions.has(key);
        };

        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const char = pattern[row][col];
                if (char === '0') continue;

                const offsetX = col - 2;
                const offsetZ = row - 2;
                const worldX = x + offsetX;
                const worldY = y + layerIndex;  // <-- stack layers vertically by adding layerIndex
                const worldZ = z + offsetZ;

                if (!isOccupied(worldX, worldY, worldZ)) {
                    let blockMaterial;
                    let blockName;

                    if (char === '1') {
                        blockMaterial = new THREE.MeshFaceMaterial(cobblestoneTexture);
                        blockName = 'cobblestone';
                    } else if (char === '2') {
                        blockMaterial = new THREE.MeshFaceMaterial(oakPlanksTexture);
                        blockName = 'oak_planks';
                    } else if (char === '3') {
                        blockMaterial = new THREE.MeshFaceMaterial(glassTexture);
                        blockName = 'glass';
                    } else if (char === '4') {
                        blockMaterial = new THREE.MeshFaceMaterial(oakLogTexture);
                        blockName = 'oak_log';
                    }

                    blockMaterial.name = blockName;
                    const block = new THREE.Mesh(geometry, blockMaterial);
                    block.position.set(worldX, worldY, worldZ);
                    scene.add(block);
                    occupiedPositions.add(`${worldX},${worldY},${worldZ}`);
                }
            }
        }
    }
}


function generateOakTree(x, y, z) {
    const trunkHeight = Math.floor(Math.random() * 3) + 2;
    const occupiedPositions = new Set();

    const isOccupied = (x, y, z) => {
        const key = `${x},${y},${z}`;
        return occupiedPositions.has(key);
    };

    // Add trunk
    for (let i = 0; i < trunkHeight; i++) {
        const oakLogMaterial = new THREE.MeshFaceMaterial(oakLogTexture);
        oakLogMaterial.name = 'oak_log';
        const oakLogBlock = new THREE.Mesh(geometry, oakLogMaterial);
        oakLogBlock.position.set(x, y + i, z);
        scene.add(oakLogBlock);
        occupiedPositions.add(`${x},${y + i},${z}`);
    }

    const leafLayers = [
        [
            "11111",
            "11111",
            "11211",
            "11111",
            "01111"
        ],
        [
            "11110",
            "11111",
            "11211",
            "11111",
            "11111"
        ],
        [
            "00000",
            "01110",
            "01210",
            "01110",
            "00000"
        ],
        [
            "00000",
            "00100",
            "01110",
            "00100",
            "00000"
        ]
    ];

    for (let layerIndex = 0; layerIndex < leafLayers.length; layerIndex++) {
        const pattern = leafLayers[layerIndex];
        const yOffset = trunkHeight + layerIndex;

        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const char = pattern[row][col];
                if (char === '0') continue;

                const offsetX = col - 2;
                const offsetZ = row - 2;
                const worldX = x + offsetX;
                const worldY = y + yOffset;
                const worldZ = z + offsetZ;

                if (!isOccupied(worldX, worldY, worldZ)) {
                    let blockMaterial;
                    let blockName;

                    if (char === '1') {
                        blockMaterial = new THREE.MeshFaceMaterial(oakLeavesTexture);
                        blockName = 'oak_leaves';
                    } else if (char === '2') {
                        blockMaterial = new THREE.MeshFaceMaterial(oakLogTexture);
                        blockName = 'oak_log';
                    }

                    blockMaterial.name = blockName;
                    const block = new THREE.Mesh(geometry, blockMaterial);
                    block.position.set(worldX, worldY, worldZ);
                    scene.add(block);
                    occupiedPositions.add(`${worldX},${worldY},${worldZ}`);
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
    coordinatesDiv.textContent = `x: ${Math.round(position.x.toFixed(2))}, y: ${Math.round(position.y.toFixed(2) - .5)}, z: ${Math.round(position.z.toFixed(2))}`;
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
            if (blockId == 'bedrock') {
                return;
            }

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

let holding = "oakPlanks";

function addBlock() {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera({ x: 0, y: 0 }, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const intersect = intersects[0];

        const normalMatrix = new THREE.Matrix3().getNormalMatrix(intersect.object.matrixWorld);
        const worldNormal = intersect.face.normal.clone().applyMatrix3(normalMatrix).normalize();

        const clickedBlockPos = intersect.object.position.clone().floor();
        const newBlockPos = clickedBlockPos.clone().add(worldNormal);

        newBlockPos.set(
            Math.round(newBlockPos.x),
            Math.round(newBlockPos.y),
            Math.round(newBlockPos.z)
        );

        const isOccupied = scene.children.some(child => {
            if (child instanceof THREE.Mesh && child !== plane) {
                const childPos = child.position;
                return childPos.x === newBlockPos.x && childPos.y === newBlockPos.y && childPos.z === newBlockPos.z;
            }
            return false;
        });

        if (!isOccupied) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshFaceMaterial(blockMaterials[holding]);
            const block = new THREE.Mesh(geometry, material);
            block.position.copy(newBlockPos);
            scene.add(block);
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
    document.getElementById('fps').innerHTML = `FPS: ${Math.round(fps)}`;

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

const hotbar = [
    "dirt",
    "stone",
    "oakPlanks",
    "cobblestone",
    "glass",
    "oakLog",
    "oakLeaves",
    "bedrock",
    "grass"
];

let hotbarSelected = 0;

document.addEventListener('DOMContentLoaded', () => {

    // Toggle inventory visibility when pressing "i" key
    document.addEventListener('keydown', (event) => {
        if (event.code === 'KeyI') {
            document.exitPointerLock();
            toggleInventory();
        } else if (event.code === 'KeyT') {
            
        } else if (event.code === 'Digit1'){
            hotbarSelected = 0;
            holding = hotbar[hotbarSelected];
        } else if (event.code === 'Digit2'){
            hotbarSelected = 1;
            holding = hotbar[hotbarSelected];
        } else if (event.code === 'Digit3'){
            hotbarSelected = 2;
            holding = hotbar[hotbarSelected];
        } else if (event.code === 'Digit4'){
            hotbarSelected = 3;
            holding = hotbar[hotbarSelected];
        } else if (event.code === 'Digit5'){
            hotbarSelected = 4;
            holding = hotbar[hotbarSelected];
        } else if (event.code === 'Digit6'){
            hotbarSelected = 5;
            holding = hotbar[hotbarSelected];
        } else if (event.code === 'Digit7'){
            hotbarSelected = 6;
            holding = hotbar[hotbarSelected];
        } else if (event.code === 'Digit8'){
            hotbarSelected = 7;
            holding = hotbar[hotbarSelected];
        } else if (event.code === 'Digit9'){
            hotbarSelected = 8;
            holding = hotbar[hotbarSelected];
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
