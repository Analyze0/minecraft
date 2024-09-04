const items = [

    // Weapons

    {
        name: 'gold_sword',
        texture: 'path_to_gold_sword_texture',
        category: 'weapon',
        material: 'gold',
        durability: 32,
        damage: 4
    },
    {
        name: 'wooden_sword',
        texture: 'path_to_wooden_sword_texture',
        category: 'weapon',
        material: 'wood',
        durability: 59,
        damage: 4
    },
    {
        name: 'stone_sword',
        texture: 'path_to_stone_sword_texture',
        category: 'weapon',
        material: 'stone',
        durability: 131,
        damage: 5
    },
    {
        name: 'iron_sword',
        texture: 'path_to_iron_sword_texture',
        category: 'weapon',
        material: 'iron',
        durability: 250,
        damage: 6
    },
    {
        name: 'diamond_sword',
        texture: 'path_to_diamond_sword_texture',
        category: 'weapon',
        material: 'diamond',
        durability: 1561,
        damage: 7
    },

    // Pickaxe

    {
        name: 'wooden_pickaxe',
        texture: 'path_to_wooden_pickaxe_texture',
        category: 'tool',
        material: 'wood',
        durability: 59,
        damage: 2,
        efficiency: 2
    },
    {
        name: 'stone_pickaxe',
        texture: 'path_to_stone_pickaxe_texture',
        category: 'tool',
        material: 'stone',
        durability: 131,
        damage: 3,
        efficiency: 4
    },
    {
        name: 'iron_pickaxe',
        texture: 'path_to_iron_pickaxe_texture',
        category: 'tool',
        material: 'iron',
        durability: 250,
        damage: 4,
        efficiency: 6
    },
    {
        name: 'diamond_pickaxe',
        texture: 'path_to_diamond_pickaxe_texture',
        category: 'tool',
        material: 'diamond',
        durability: 1561,
        damage: 5,
        efficiency: 8
    },

    // Axes:

    {
        name: 'wooden_axe',
        texture: 'path_to_wooden_axe_texture',
        category: 'weapon',
        material: 'wood',
        durability: 59,
        damage: 7
    },
    {
        name: 'stone_axe',
        texture: 'path_to_stone_axe_texture',
        category: 'weapon',
        material: 'stone',
        durability: 131,
        damage: 9
    },
    {
        name: 'iron_axe',
        texture: 'path_to_iron_axe_texture',
        category: 'weapon',
        material: 'iron',
        durability: 250,
        damage: 9
    },
    {
        name: 'diamond_axe',
        texture: 'path_to_diamond_axe_texture',
        category: 'weapon',
        material: 'diamond',
        durability: 1561,
        damage: 9
    },

    // Armor

    {
        name: 'leather_helmet',
        texture: 'path_to_leather_helmet_texture',
        category: 'armor',
        material: 'leather',
        durability: 55,
        armorPoints: 1
    },
    {
        name: 'leather_chestplate',
        texture: 'path_to_leather_chestplate_texture',
        category: 'armor',
        material: 'leather',
        durability: 80,
        armorPoints: 3
    },
    {
        name: 'leather_leggings',
        texture: 'path_to_leather_leggings_texture',
        category: 'armor',
        material: 'leather',
        durability: 75,
        armorPoints: 2
    },
    {
        name: 'leather_boots',
        texture: 'path_to_leather_boots_texture',
        category: 'armor',
        material: 'leather',
        durability: 65,
        armorPoints: 1
    },
    {
        name: 'chainmail_helmet',
        texture: 'path_to_chainmail_helmet_texture',
        category: 'armor',
        material: 'chainmail',
        durability: 165,
        armorPoints: 2
    },
    {
        name: 'chainmail_chestplate',
        texture: 'path_to_chainmail_chestplate_texture',
        category: 'armor',
        material: 'chainmail',
        durability: 240,
        armorPoints: 5
    },
    {
        name: 'chainmail_leggings',
        texture: 'path_to_chainmail_leggings_texture',
        category: 'armor',
        material: 'chainmail',
        durability: 225,
        armorPoints: 4
    },
    {
        name: 'chainmail_boots',
        texture: 'path_to_chainmail_boots_texture',
        category: 'armor',
        material: 'chainmail',
        durability: 195,
        armorPoints: 1
    },
    {
        name: 'iron_helmet',
        texture: 'path_to_iron_helmet_texture',
        category: 'armor',
        material: 'iron',
        durability: 165,
        armorPoints: 2
    },
    {
        name: 'iron_chestplate',
        texture: 'path_to_iron_chestplate_texture',
        category: 'armor',
        material: 'iron',
        durability: 240,
        armorPoints: 6
    },
    {
        name: 'iron_leggings',
        texture: 'path_to_iron_leggings_texture',
        category: 'armor',
        material: 'iron',
        durability: 225,
        armorPoints: 5
    },
    {
        name: 'iron_boots',
        texture: 'path_to_iron_boots_texture',
        category: 'armor',
        material: 'iron',
        durability: 195,
        armorPoints: 2
    },
    {
        name: 'diamond_helmet',
        texture: 'path_to_diamond_helmet_texture',
        category: 'armor',
        material: 'diamond',
        durability: 363,
        armorPoints: 3
    },
    {
        name: 'diamond_chestplate',
        texture: 'path_to_diamond_chestplate_texture',
        category: 'armor',
        material: 'diamond',
        durability: 528,
        armorPoints: 8
    },
    {
        name: 'diamond_leggings',
        texture: 'path_to_diamond_leggings_texture',
        category: 'armor',
        material: 'diamond',
        durability: 495,
        armorPoints: 6
    },
    {
        name: 'diamond_boots',
        texture: 'path_to_diamond_boots_texture',
        category: 'armor',
        material: 'diamond',
        durability: 429,
        armorPoints: 3
    },
    // Blocks
    {
        name: 'dirt',
        texture: 'assets/blocks/dirt.png',
        category: 'block',
        hardness: 0.5,
        toolRequired: 'shovel'
    },
    {
        name: 'stone',
        texture: 'assets/blocks/stone.png',
        category: 'block',
        hardness: 1.5,
        toolRequired: 'pickaxe'
    },
    {
        name: 'grass_block',
        texture: 'assets/blocks/grass_block.png',
        category: 'block',
        hardness: 0.6,
        toolRequired: 'shovel'
    },
    {
        name: 'sand',
        texture: 'assets/blocks/sand.png',
        category: 'block',
        hardness: 0.5,
        toolRequired: 'shovel'
    },
    {
        name: 'gravel',
        texture: 'assets/blocks/gravel.png',
        category: 'block',
        hardness: 0.6,
        toolRequired: 'shovel'
    },
    {
        name: 'clay',
        texture: 'assets/blocks/clay.png',
        category: 'block',
        hardness: 0.6,
        toolRequired: 'shovel'
    },
    {
        name: 'water',
        texture: 'assets/blocks/water.png',
        category: 'block',
        hardness: -1,
        toolRequired: 'none'
    },
    {
        name: 'lava',
        texture: 'assets/blocks/lava.png',
        category: 'block',
        hardness: -1,
        toolRequired: 'none'
    },
    {
        name: 'bedrock',
        texture: 'assets/blocks/bedrock.png',
        category: 'block',
        hardness: -1,
        toolRequired: 'none'
    },
    {
        name: 'coal_ore',
        texture: 'assets/blocks/coal_ore.png',
        category: 'block',
        hardness: 3,
        toolRequired: 'pickaxe'
    },
    {
        name: 'iron_ore',
        texture: 'assets/blocks/iron_ore.png',
        category: 'block',
        hardness: 3,
        toolRequired: 'pickaxe'
    },
    {
        name: 'gold_ore',
        texture: 'assets/blocks/gold_ore.png',
        category: 'block',
        hardness: 3,
        toolRequired: 'pickaxe'
    },
    {
        name: 'diamond_ore',
        texture: 'assets/blocks/diamond_ore.png',
        category: 'block',
        hardness: 3,
        toolRequired: 'pickaxe'
    },
    {
        name: 'emerald_ore',
        texture: 'assets/blocks/emerald_ore.png',
        category: 'block',
        hardness: 3,
        toolRequired: 'pickaxe'
    },
    {
        name: 'redstone_ore',
        texture: 'assets/blocks/redstone_ore.png',
        category: 'block',
        hardness: 3,
        toolRequired: 'pickaxe'
    },
    {
        name: 'lapis_lazuli_ore',
        texture: 'assets/blocks/lapis_lazuli_ore.png',
        category: 'block',
        hardness: 3,
        toolRequired: 'pickaxe'
    },
    {
        name: 'oak_wood_log',
        texture: 'assets/blocks/oak_wood_log.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'spruce_wood_log',
        texture: 'assets/blocks/spruce_wood_log.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'birch_wood_log',
        texture: 'assets/blocks/birch_wood_log.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'jungle_wood_log',
        texture: 'assets/blocks/jungle_wood_log.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'acacia_wood_log',
        texture: 'assets/blocks/acacia_wood_log.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'dark_oak_wood_log',
        texture: 'assets/blocks/dark_oak_wood_log.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'oak_planks',
        texture: 'assets/blocks/oak_planks.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'spruce_planks',
        texture: 'assets/blocks/spruce_planks.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'birch_planks',
        texture: 'assets/blocks/birch_planks.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'jungle_planks',
        texture: 'assets/blocks/jungle_planks.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'acacia_planks',
        texture: 'assets/blocks/acacia_planks.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'dark_oak_planks',
        texture: 'assets/blocks/dark_oak_planks.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'cobblestone',
        texture: 'assets/blocks/cobblestone.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'pickaxe'
    },
    {
        name: 'bricks',
        texture: 'assets/blocks/bricks.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'pickaxe'
    },
    {
        name: 'stone_bricks',
        texture: 'assets/blocks/stone_bricks.png',
        category: 'block',
        hardness: 1.5,
        toolRequired: 'pickaxe'
    },
    {
        name: 'sandstone',
        texture: 'assets/blocks/sandstone.png',
        category: 'block',
        hardness: 0.8,
        toolRequired: 'pickaxe'
    },
    {
        name: 'red_sandstone',
        texture: 'assets/blocks/red_sandstone.png',
        category: 'block',
        hardness: 0.8,
        toolRequired: 'pickaxe'
    },
    {
        name: 'nether_bricks',
        texture: 'assets/blocks/nether_bricks.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'pickaxe'
    },
    {
        name: 'quartz_block',
        texture: 'assets/blocks/quartz_block.png',
        category: 'block',
        hardness: 0.8,
        toolRequired: 'pickaxe'
    },
    {
        name: 'prismarine_block',
        texture: 'assets/blocks/prismarine_block.png',
        category: 'block',
        hardness: 1.5,
        toolRequired: 'pickaxe'
    },
    {
        name: 'concrete',
        texture: 'assets/blocks/concrete.png',
        category: 'block',
        hardness: 1.8,
        toolRequired: 'pickaxe'
    },
    {
        name: 'terracotta',
        texture: 'assets/blocks/terracotta.png',
        category: 'block',
        hardness: 1.25,
        toolRequired: 'pickaxe'
    },
    {
        name: 'glass',
        texture: 'assets/blocks/glass.png',
        category: 'block',
        hardness: 0.3,
        toolRequired: 'pickaxe'
    },
    {
        name: 'obsidian',
        texture: 'assets/blocks/obsidian.png',
        category: 'block',
        hardness: 50,
        toolRequired: 'diamond_pickaxe'
    },

    // Miscellaneous items
    {
        name: 'bread',
        texture: 'path_to_bread_texture',
        category: 'food',
        hungerRestoration: 5
    },
    {
        name: 'bow',
        texture: 'path_to_bow_texture',
        category: 'tool',
        durability: 384
    },
    {
        name: 'arrow',
        texture: 'path_to_arrow_texture',
        category: 'tool'
    },
    {
        name: 'oak_fence',
        texture: 'assets/blocks/oak_fence.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'spruce_fence',
        texture: 'assets/blocks/spruce_fence.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'birch_fence',
        texture: 'assets/blocks/birch_fence.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'jungle_fence',
        texture: 'assets/blocks/jungle_fence.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'acacia_fence',
        texture: 'assets/blocks/acacia_fence.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'dark_oak_fence',
        texture: 'assets/blocks/dark_oak_fence.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'oak_fence_gate',
        texture: 'assets/blocks/oak_fence_gate.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'spruce_fence_gate',
        texture: 'assets/blocks/spruce_fence_gate.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'birch_fence_gate',
        texture: 'assets/blocks/birch_fence_gate.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'jungle_fence_gate',
        texture: 'assets/blocks/jungle_fence_gate.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'acacia_fence_gate',
        texture: 'assets/blocks/acacia_fence_gate.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'dark_oak_fence_gate',
        texture: 'assets/blocks/dark_oak_fence_gate.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'oak_stairs',
        texture: 'assets/blocks/oak_stairs.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'spruce_stairs',
        texture: 'assets/blocks/spruce_stairs.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'birch_stairs',
        texture: 'assets/blocks/birch_stairs.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'jungle_stairs',
        texture: 'assets/blocks/jungle_stairs.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'acacia_stairs',
        texture: 'assets/blocks/acacia_stairs.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'dark_oak_stairs',
        texture: 'assets/blocks/dark_oak_stairs.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'stone_stairs',
        texture: 'assets/blocks/stone_stairs.png',
        category: 'block',
        hardness: 1.5,
        toolRequired: 'pickaxe'
    },
    {
        name: 'brick_stairs',
        texture: 'assets/blocks/brick_stairs.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'pickaxe'
    },
    {
        name: 'sandstone_stairs',
        texture: 'assets/blocks/sandstone_stairs.png',
        category: 'block',
        hardness: 0.8,
        toolRequired: 'pickaxe'
    },
    {
        name: 'red_sandstone_stairs',
        texture: 'assets/blocks/red_sandstone_stairs.png',
        category: 'block',
        hardness: 0.8,
        toolRequired: 'pickaxe'
    },
    {
        name: 'nether_brick_stairs',
        texture: 'assets/blocks/nether_brick_stairs.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'pickaxe'
    },
    {
        name: 'quartz_stairs',
        texture: 'assets/blocks/quartz_stairs.png',
        category: 'block',
        hardness: 0.8,
        toolRequired: 'pickaxe'
    },
    {
        name: 'prismarine_stairs',
        texture: 'assets/blocks/prismarine_stairs.png',
        category: 'block',
        hardness: 1.5,
        toolRequired: 'pickaxe'
    },
    {
        name: 'stone_slab',
        texture: 'assets/blocks/stone_slab.png',
        category: 'block',
        hardness: 1.5,
        toolRequired: 'pickaxe'
    },
    {
        name: 'sandstone_slab',
        texture: 'assets/blocks/sandstone_slab.png',
        category: 'block',
        hardness: 0.8,
        toolRequired: 'pickaxe'
    },
    {
        name: 'red_sandstone_slab',
        texture: 'assets/blocks/red_sandstone_slab.png',
        category: 'block',
        hardness: 0.8,
        toolRequired: 'pickaxe'
    },
    {
        name: 'stone_brick_slab',
        texture: 'assets/blocks/stone_brick_slab.png',
        category: 'block',
        hardness: 1.5,
        toolRequired: 'pickaxe'
    },
    {
        name: 'nether_brick_slab',
        texture: 'assets/blocks/nether_brick_slab.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'pickaxe'
    },
    {
        name: 'quartz_slab',
        texture: 'assets/blocks/quartz_slab.png',
        category: 'block',
        hardness: 0.8,
        toolRequired: 'pickaxe'
    },
    {
        name: 'prismarine_slab',
        texture: 'assets/blocks/prismarine_slab.png',
        category: 'block',
        hardness: 1.5,
        toolRequired: 'pickaxe'
    },
    {
        name: 'oak_slab',
        texture: 'assets/blocks/oak_slab.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'spruce_slab',
        texture: 'assets/blocks/spruce_slab.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'birch_slab',
        texture: 'assets/blocks/birch_slab.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'jungle_slab',
        texture: 'assets/blocks/jungle_slab.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'acacia_slab',
        texture: 'assets/blocks/acacia_slab.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'dark_oak_slab',
        texture: 'assets/blocks/dark_oak_slab.png',
        category: 'block',
        hardness: 2,
        toolRequired: 'axe'
    },
    {
        name: 'white_carpet',
        texture: 'assets/blocks/white_carpet.png',
        category: 'block',
        hardness: 0.1,
        toolRequired: 'none'
    },
    {
        name: 'orange_carpet',
        texture: 'assets/blocks/orange_carpet.png',
        category: 'block',
        hardness: 0.1,
        toolRequired: 'none'
    },
    {
        name: 'magenta_carpet',
        texture: 'assets/blocks/magenta_carpet.png',
        category: 'block',
        hardness: 0.1,
        toolRequired: 'none'
    },
];