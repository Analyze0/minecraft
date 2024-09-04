const textureLoader = new THREE.TextureLoader();

function loadTexture(path, magFilter, minFilter) {
    return textureLoader.load(path, function(texture) {
        texture.magFilter = magFilter;
        texture.minFilter = minFilter;
    });
}

const textures = {
    dirt: loadTexture('assets/blocks/dirt.png', THREE.NearestFilter, THREE.NearestFilter),
    stone: loadTexture('assets/blocks/stone.png', THREE.NearestFilter, THREE.NearestFilter),
    oakLeaves: loadTexture('assets/blocks/oak_leaves.png', THREE.NearestFilter, THREE.NearestFilter),
    grassTop: loadTexture('assets/blocks/grass_top.png', THREE.NearestFilter, THREE.NearestFilter),
    grassSide: loadTexture('assets/blocks/grass_side_carried.png', THREE.NearestFilter, THREE.NearestFilter),
    oakLogTop: loadTexture('assets/blocks/oak_log_top.png', THREE.NearestFilter, THREE.NearestFilter),
    oakLogSide: loadTexture('assets/blocks/oak_log.png', THREE.NearestFilter, THREE.NearestFilter)
};

const grassTexture = [
    new THREE.MeshBasicMaterial({ map: textures.grassSide }),
    new THREE.MeshBasicMaterial({ map: textures.grassSide }),
    new THREE.MeshBasicMaterial({ map: textures.grassTop }),
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

// Create a material with the oak leaves texture and a green color overlay
const oakLeavesMaterial = new THREE.MeshBasicMaterial({
    map: textures.oakLeaves,
    color: 0x56CC22,
    transparent: true,
    opacity: 1.0
});

const oakLeavesTexture = Array(6).fill(oakLeavesMaterial);

const stoneTexture = Array(6).fill(new THREE.MeshBasicMaterial({ map: textures.stone }));
