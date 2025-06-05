const textureLoader = new THREE.TextureLoader();

function loadTexture(path, magFilter, minFilter) {
    const texture = textureLoader.load(path);
    texture.magFilter = magFilter;
    texture.minFilter = minFilter;
    return texture;
}

const textures = {
    dirt: loadTexture('assets/blocks/dirt.png', THREE.NearestFilter, THREE.NearestFilter),
    stone: loadTexture('assets/blocks/stone.png', THREE.NearestFilter, THREE.NearestFilter),
    bedrock: loadTexture('assets/blocks/bedrock.png', THREE.NearestFilter, THREE.NearestFilter),
    oakLeaves: loadTexture('assets/blocks/oak_leaves.png', THREE.NearestFilter, THREE.NearestFilter),
    grassTop: loadTexture('assets/blocks/grass_top.png', THREE.NearestFilter, THREE.NearestFilter),
    grassSide: loadTexture('assets/blocks/grass_side_carried.png', THREE.NearestFilter, THREE.NearestFilter),
    oakLogTop: loadTexture('assets/blocks/oak_log_top.png', THREE.NearestFilter, THREE.NearestFilter),
    oakLogSide: loadTexture('assets/blocks/oak_log.png', THREE.NearestFilter, THREE.NearestFilter),
    oakPlanks: loadTexture('assets/blocks/oak_planks.png', THREE.NearestFilter, THREE.NearestFilter),
    cobblestone: loadTexture('assets/blocks/cobblestone.png', THREE.NearestFilter, THREE.NearestFilter),
    glass: loadTexture('assets/blocks/glass.png', THREE.NearestFilter, THREE.NearestFilter),
    coalOre: loadTexture('assets/blocks/coal_ore.png', THREE.NearestFilter, THREE.NearestFilter),
    diamondOre: loadTexture('assets/blocks/diamond_ore.png', THREE.NearestFilter, THREE.NearestFilter),
    emeraldOre: loadTexture('assets/blocks/emerald_ore.png', THREE.NearestFilter, THREE.NearestFilter),
    goldOre: loadTexture('assets/blocks/gold_ore.png', THREE.NearestFilter, THREE.NearestFilter),
    ironOre: loadTexture('assets/blocks/iron_ore.png', THREE.NearestFilter, THREE.NearestFilter),
    diamondBlock: loadTexture('assets/blocks/diamond_block.png', THREE.NearestFilter, THREE.NearestFilter),
};

const grassMaterial = new THREE.MeshBasicMaterial({
    map: textures.grassTop,
    color: 0x63b141
});

const grassTexture = [
    new THREE.MeshBasicMaterial({ map: textures.grassSide }),
    new THREE.MeshBasicMaterial({ map: textures.grassSide }),
    new THREE.MeshBasicMaterial(grassMaterial),
    new THREE.MeshBasicMaterial({ map: textures.dirt }),
    new THREE.MeshBasicMaterial({ map: textures.grassSide }),
    new THREE.MeshBasicMaterial({ map: textures.grassSide })
];

const dirtTexture = Array(6).fill(new THREE.MeshBasicMaterial({ map: textures.dirt }));

const oakLogTexture = [
    new THREE.MeshBasicMaterial({ map: textures.oakLogSide }),
    new THREE.MeshBasicMaterial({ map: textures.oakLogSide }),
    new THREE.MeshBasicMaterial({ map: textures.oakLogTop }),
    new THREE.MeshBasicMaterial({ map: textures.oakLogTop }),
    new THREE.MeshBasicMaterial({ map: textures.oakLogSide }),
    new THREE.MeshBasicMaterial({ map: textures.oakLogSide })
];

const oakLeavesMaterial = new THREE.MeshBasicMaterial({
    map: textures.oakLeaves,
    color: 0x63b141,
    transparent: true,
    opacity: 1.0
});

const glassTexture = new THREE.MeshBasicMaterial({
    map: textures.glass,
    transparent: true,
    opacity: 1.0
});

const oakLeavesTexture = Array(6).fill(oakLeavesMaterial);

const stoneTexture = Array(6).fill(new THREE.MeshBasicMaterial({ map: textures.stone }));
const bedrockTexture = Array(6).fill(new THREE.MeshBasicMaterial({ map: textures.bedrock }));
const oakPlanksTexture = Array(6).fill(new THREE.MeshBasicMaterial({ map: textures.oakPlanks }));
const cobblestoneTexture = Array(6).fill(new THREE.MeshBasicMaterial({ map: textures.cobblestone }));
const coalOreTexture = Array(6).fill(new THREE.MeshBasicMaterial({ map: textures.coalOre }));
const diamondOreTexture = Array(6).fill(new THREE.MeshBasicMaterial({ map: textures.diamondOre }));
const emeraldOreTexture = Array(6).fill(new THREE.MeshBasicMaterial({ map: textures.emeraldOre }));
const goldOreTexture = Array(6).fill(new THREE.MeshBasicMaterial({ map: textures.goldOre }));
const ironOreTexture = Array(6).fill(new THREE.MeshBasicMaterial({ map: textures.ironOre }));
const diamondBlockTexture = Array(6).fill(new THREE.MeshBasicMaterial({ map: textures.diamondBlock }));

const blockMaterials = {
    dirt: dirtTexture,
    grass: grassTexture,
    oakLog: oakLogTexture,
    oakLeaves: oakLeavesTexture,
    glass: glassTexture,
    stone: stoneTexture,
    bedrock: bedrockTexture,
    oakPlanks: oakPlanksTexture,
    cobblestone: cobblestoneTexture,
    coalOre: coalOreTexture,
    diamondOre: diamondOreTexture,
    emeraldOre: emeraldOreTexture,
    goldOre: goldOreTexture,
    ironOre: ironOreTexture,
    diamondBlock: diamondBlockTexture
};


function createStairGeometry() {
    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([
        // Lower step faces
        0, 0, 0,  1, 0, 0,  1, 0.5, 0,  0, 0.5, 0,    // front (0)
        0, 0, 1,  1, 0, 1,  1, 0.5, 1,  0, 0.5, 1,    // back (1)
        0, 0, 0,  0, 0.5, 0,  0, 0.5, 1,  0, 0, 1,    // left (2)
        1, 0, 0,  1, 0.5, 0,  1, 0.5, 1,  1, 0, 1,    // right (3)
        0, 0.5, 0,  1, 0.5, 0,  1, 0.5, 1,  0, 0.5, 1,// top (4)
        0, 0, 0,  1, 0, 0,  1, 0, 1,  0, 0, 1,        // bottom (5)

        // Upper step faces
        0, 0.5, 0.5,  1, 0.5, 0.5,  1, 1, 0.5,  0, 1, 0.5,   // front (6)
        0, 0.5, 1,    1, 0.5, 1,    1, 1, 1,    0, 1, 1,     // back (7)
        0, 0.5, 0.5,  0, 1, 0.5,    0, 1, 1,    0, 0.5, 1,   // left (8)
        1, 0.5, 0.5,  1, 1, 0.5,    1, 1, 1,    1, 0.5, 1,   // right (9)
        0, 1, 0.5,    1, 1, 0.5,    1, 1, 1,    0, 1, 1       // top (10)
    ]);

    for (let i = 0; i < vertices.length; i += 3) {
        vertices[i]   -= 0.5; // X
        vertices[i+1] -= 0.5; // Y
        vertices[i+2] -= 0.5; // Z
    }

    const indices = [
        // Lower step
        0,1,2, 0,2,3,     // front
        4,5,6, 4,6,7,     // back
        8,9,10, 8,10,11,  // left
        12,13,14, 12,14,15,// right
        16,17,18, 16,18,19, // top
        20,21,22, 20,22,23, // bottom

        // Upper step
        24,25,26, 24,26,27,
        28,29,30, 28,30,31,
        32,33,34, 32,34,35,
        36,37,38, 36,38,39,
        40,41,42, 40,42,43
    ];

    const uvs = [];

    for (let faceIndex = 0; faceIndex < 11; faceIndex++) {
        let faceUVs;

        switch (faceIndex) {
            case 0: // Lower front
            case 6: // Upper front
                faceUVs = [0, 0, 1, 0, 1, 0.5, 0, 0.5];
                break;
            case 1: // Lower back
            case 7: // Upper back
                faceUVs = [0, 0, 1, 0, 1, 0.5, 0, 0.5]; 
                break;
            case 2: // Lower left
            case 3: // Lower right
            case 8: // Upper left
            case 9: // Upper right
                faceUVs = [1.0, 0.5, 1.0, 1.0, 0.5, 1.0, 0.5, 0.5];
                break;
            case 4: // Top of lower step
                faceUVs = [1, 1, 0, 1, 0, 0, 1, 0];
                break;
            case 5: // Bottom of lower step
                faceUVs = [0, 0, 1, 0, 1, 1, 0, 1];
                break;
            case 10: // Top of upper step
                faceUVs = [1, 1, 0, 1, 0, 0.5, 1, 0.5];
                break;
            default:
                faceUVs = [0, 0, 1, 0, 1, 1, 0, 1];
        }

        uvs.push(...faceUVs);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
}