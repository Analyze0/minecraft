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
    oakPlanks: loadTexture('assets/blocks/planks_oak.png', THREE.NearestFilter, THREE.NearestFilter),
    cobblestone: loadTexture('assets/blocks/cobblestone.png', THREE.NearestFilter, THREE.NearestFilter),
    glass: loadTexture('assets/blocks/glass.png', THREE.NearestFilter, THREE.NearestFilter)
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
const cobblestoneTexture = Array(6).fill(new THREE.MeshBasicMaterial({ map: textures.cobblestone }))

const blockMaterials = {
    dirt: dirtTexture,
    grass: grassTexture,
    oakLog: oakLogTexture,
    oakLeaves: oakLeavesTexture,
    glass: glassTexture,
    stone: stoneTexture,
    bedrock: bedrockTexture,
    oakPlanks: oakPlanksTexture,
    cobblestone: cobblestoneTexture
};

//Entities

const entityTexture = loadTexture('assets/blocks/dirt.png', THREE.NearestFilter, THREE.NearestFilter);
