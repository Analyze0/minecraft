const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let superflat = localStorage.getItem('superflat');

const inventory = {};

scene.background = new THREE.Color(0xdcebf8);

let username = "User";

//Survival

let maxHealth = 10; // # of full hearts displayed (e.g., 10 hearts total)
let currentHealth = 15; // Internal health value (out of 20 half-hearts for 10 hearts)
let alive = true;

let deathreason = "";

function getHealthRepresentation(healthValue) {
    let representation = "";
    let tempHealthValue = healthValue;
    // Each heart is 2 health points (half-hearts)
    for (let i = 0; i < maxHealth; i++) {
        if (tempHealthValue >= 2) {
            representation += "1";
            tempHealthValue -= 2;
        } else if (tempHealthValue === 1) {
            representation += "2";
            tempHealthValue -= 1;
        } else {
            representation += "0";
        }
    }
    return representation;
}

function updateHealthDisplay() {
    const healthBarContainer = document.getElementById('health-bar-container');
    healthBarContainer.innerHTML = ''; // Clear previous hearts

    const healthString = getHealthRepresentation(currentHealth);

    for (let i = 0; i < healthString.length; i++) {
        const heartChar = healthString[i];

        const heartContainerDiv = document.createElement('div');
        heartContainerDiv.classList.add('heart-container');

        const heartImage = document.createElement('img');

        if (heartChar === '1') {
            heartImage.src = '/assets/ui/gui/full_heart.png';
        } else if (heartChar === '2') {
            heartImage.src = '/assets/ui/gui/half_heart.png';
        } else { 
            heartImage.src = '/assets/ui/gui/blank.png';
        }

        heartContainerDiv.appendChild(heartImage);
        healthBarContainer.appendChild(heartContainerDiv);
    }
}

updateHealthDisplay();

let maxHunger = 20;
let maxHungerIcons = 10;

let currentHunger = 5;

function getHungerRepresentation(hungerValue) {
    let representation = "";
    
    let remainingPoints = maxHunger - hungerValue;
    
    remainingPoints = Math.max(0, remainingPoints);
    remainingPoints = Math.min(remainingPoints, maxHunger);

    for (let i = 0; i < maxHungerIcons; i++) {
        if (remainingPoints >= 2) {
            representation += "1";
            remainingPoints -= 2;
        } else if (remainingPoints === 1) {
            representation += "2";
            remainingPoints -= 1;
        } else {
            representation += "0";
        }
    }
    return representation;
}

function updateHungerDisplay() {
    const hungerBarContainer = document.getElementById('hunger-bar-container');
    hungerBarContainer.innerHTML = ''; // Clear previous icons

    const hungerString = getHungerRepresentation(currentHunger);

    // Create arrays to hold the different types of hunger icon elements
    const blankIcons = [];
    const halfIcons = [];
    const fullIcons = [];

    for (let i = 0; i < hungerString.length; i++) {
        const hungerChar = hungerString[i];

        const hungerIconContainerDiv = document.createElement('div');
        hungerIconContainerDiv.classList.add('hunger-container');

        const hungerImage = document.createElement('img');

        if (hungerChar === '1') {
            hungerImage.src = '/assets/ui/gui/full_food_icon.png';
            hungerIconContainerDiv.appendChild(hungerImage);
            fullIcons.push(hungerIconContainerDiv); // Store full icons
        } else if (hungerChar === '2') {
            hungerImage.src = '/assets/ui/gui/half_food_icon.png';
            hungerIconContainerDiv.appendChild(hungerImage);
            halfIcons.push(hungerIconContainerDiv); // Store half icons
        } else { // hungerChar === '0'
            hungerImage.src = '/assets/ui/gui/blank.png'; // Using your specified 'blank.png'
            hungerIconContainerDiv.appendChild(hungerImage);
            blankIcons.push(hungerIconContainerDiv); // Store blank icons
        }
    }

    // Now, append them to the container in the desired order: Blank, Half, Full
    blankIcons.forEach(icon => hungerBarContainer.appendChild(icon));
    halfIcons.forEach(icon => hungerBarContainer.appendChild(icon));
    fullIcons.forEach(icon => hungerBarContainer.appendChild(icon));
}

// Initial display update
updateHungerDisplay();

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

let direction = '';

document.addEventListener('mousemove', (event) => {
    document.getElementById('cursor').style.left = (event.clientX-25) + "px";
    document.getElementById('cursor').style.top = (event.clientY-25) + "px";
    if (mouseLocked) {
        const directionVector = new THREE.Vector3();
        camera.getWorldDirection(directionVector);

        const angle = Math.atan2(directionVector.x, directionVector.z);
        const angleDegrees = angle * (180 / Math.PI);

        if (angleDegrees >= -22.5 && angleDegrees < 22.5) {
            direction = 'North';
        } else if (angleDegrees >= 67.5 && angleDegrees < 112.5) {
            direction = 'East';
        } else if (angleDegrees >= 157.5 || angleDegrees < -157.5) {
            direction = 'South';
        } else if (angleDegrees >= -112.5 && angleDegrees < -67.5) {
            direction = 'West';
        }
        document.getElementById('cardinal-direction').innerHTML = direction;
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
    const speed = 0.027;
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
        currentHealth = 0;
        deathreason = "fell in the void";
    }

    handleCollisionDetection();

    camera.position.copy(player.position);
    camera.position.y += playerHeight / 2;

    updateFrustum();

    scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            const distance = child.position.distanceTo(player.position);
            let isVisible;
            if (superflat == 'true') {
                isVisible = distance < 13;
            } else {
                isVisible = distance < 10;
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
    if(mouseLocked == true) {
        document.getElementById('cursor').style.display = 'none';
    } else {
        document.getElementById('cursor').style.display = 'block';
    }

    updateHealthDisplay();
    updateHungerDisplay();
    if(currentHealth <= 0) {
        if(alive == true) {
            mouseLocked = false;
            document.exitPointerLock();
            document.getElementById('gameplay-ui').style.display = 'none';
            document.getElementById('deathreason').innerHTML = username + ' ' + deathreason;
            document.getElementById('deathscreen').style.display = 'block';
        }
        alive = false;
    }
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
                    const grass
 = new THREE.Mesh(geometry, grassMaterial);
                    grass
.position.set((x * chunkSize) + i, height, (z * chunkSize) + j);
                    scene.add(grass
);

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
                    const grass
 = new THREE.Mesh(geometry, grassMaterial);
                    grass
.position.set((x * chunkSize) + i, k, (z * chunkSize) + j);
                    scene.add(grass
);
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

let holding = "dirt";

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
    let block;

    if (holding === "oakStairs") {
                const geometry = createStairGeometry();
                const material = new THREE.MeshBasicMaterial({
                    map: textures.oakPlanks,
                    side: THREE.DoubleSide
                });
                block = new THREE.Mesh(geometry, material);

                let yaw = camera.rotation.y;
let yawDegrees = (THREE.MathUtils.radToDeg(yaw) + 360) % 360;

// Snap to nearest 90°
let snappedYaw;
if (yawDegrees >= 315 || yawDegrees < 45) {
    snappedYaw = 180; // South
} else if (yawDegrees >= 45 && yawDegrees < 135) {
    snappedYaw = 270; // West
} else if (yawDegrees >= -22.5 && yawDegrees < 22.5) {
    alert('pp')
} else {
    snappedYaw = 90;  // East
}

block.rotation.y = THREE.MathUtils.degToRad(snappedYaw);

            } else {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshFaceMaterial(blockMaterials[holding]);
        block = new THREE.Mesh(geometry, material);
    }

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
    "cobblestone",
    "glass",
    "oakPlanks",
    "oakStairs",
    "oakLeaves",
    "bedrock",
    "oakLog"
];

function getFaceTextures(formattedSlotName) {
    switch (formattedSlotName) {
        case 'grass':
            return { top: 'grass_top.png', side: 'grass_side_carried.png' };
        case 'oak_log':
            return { top: 'oak_log_top.png', side: 'oak_log.png' };
        default:
            return { top: `${formattedSlotName}.png`, side: `${formattedSlotName}.png` };
    }
}

hotbar.forEach(function(slot, index) {
    if (slot.length > 0) {
        // convert camelCase like ironOre to iron_ore
        const formattedSlotName = slot.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

        const foundItem = items.find(item => item.name === formattedSlotName);

        if (foundItem) {
            if (foundItem.type === 'block') {
                const faceTextures = getFaceTextures(formattedSlotName);

                // Constants for positioning
                const slotSpacing = 39; // px between slot centers, tweak as needed
                const offsetX = (index * slotSpacing) - 430;

                const html = `
  <div class="hotbar-block" style="transform: scale(25%) translateY(-460px) translateX(${offsetX}px) !important">
    <div class="hotbar-block-face hotbar-block-top" style="background:url(/assets/blocks/${faceTextures.top});background-size: 100px 100px"></div>
    <div class="hotbar-block-face hotbar-block-left">
      <div class="rotated-bg" style="background-image: url(/assets/blocks/${faceTextures.side});"></div>
    </div>
    <div class="hotbar-block-face hotbar-block-right" style="background:url(/assets/blocks/${faceTextures.side});background-size: 100px 100px"></div>
  </div>
`;

                switch (index) {
                    case 0:
                        document.getElementById('item-one').innerHTML = html;
                        break;
                    case 1:
                        document.getElementById('item-two').innerHTML = html;
                        break;
                    case 2:
                        document.getElementById('item-three').innerHTML = html;
                        break;
                    case 3:
                        document.getElementById('item-four').innerHTML = html;
                        break;
                    case 4:
                        document.getElementById('item-five').innerHTML = html;
                        break;
                    case 5:
                        document.getElementById('item-six').innerHTML = html;
                        break;
                    case 6:
                        document.getElementById('item-seven').innerHTML = html;
                        break;
                    case 7:
                        document.getElementById('item-eight').innerHTML = html;
                        break;
                    case 8:
                        document.getElementById('item-nine').innerHTML = html;
                        break;
                }
            } else {
                // Handle non-block items here if needed
            }
        } else {
            // Handle unknown items if needed
        }
    } else {
        alert(`Slot ${index}: This slot is empty.`);
    }
});

let hotbarSelected = 0;

document.addEventListener('DOMContentLoaded', () => {
    const hotbarTransforms = [
        "-510px", "-444px", "-378px", "-312px", "-246px",
        "-180px", "-114px", "-48px", "18px"
    ];

    document.addEventListener('keydown', (event) => {
        if (event.code === 'KeyI') {
            document.exitPointerLock();
            toggleInventory();
        } else if (event.code.startsWith('Digit')) {
            const digit = parseInt(event.code.replace('Digit', ''));
            if (digit >= 1 && digit <= 9) {
                hotbarSelected = digit - 1;
                updateSelectedSlot();
            }
        }
    });

    document.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            hotbarSelected = (hotbarSelected + 1) % 9;
        } else {
            hotbarSelected = (hotbarSelected + 8) % 9; // Same as -1 wrapped
        }
        updateSelectedSlot();
    });

    function updateSelectedSlot() {
        document.querySelector('.hotbar').style.opacity = "90%";
        const translateX = hotbarTransforms[hotbarSelected];
        document.getElementById('selected-slot').style.transform = `translateY(-3px) translateX(${translateX})`;
        holding = hotbar[hotbarSelected];

    // Format name (e.g., diamondBlock → diamond_block)
        const formattedName = holding.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

    // Lookup item
        const foundItem = items.find(item => item.name === formattedName);

    // Alert info
        if (foundItem) {
            document.getElementById('item-name-hotbar-preview').style.opacity = "100%";
            document.getElementById('item-name-hotbar-preview').innerHTML = foundItem.name.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
            setTimeout(function(){
                document.getElementById('item-name-hotbar-preview').style.opacity = "0%";
            },3000);
        } 
        setTimeout(function(){
            document.querySelector('.hotbar').style.opacity = "70%";
        },12000);
}


    function toggleInventory() {
        if (inventory.style.display === 'none' || !inventory.style.display) {
            inventory.style.display = 'flex';
        } else {
            inventory.style.display = 'none';
        }
    }
});

//UI:

document.getElementById('exit-game-button').onmousedown = function(e) {
    window.location.href = "/index.html";
}