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
