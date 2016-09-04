/**
 * @file ModPE utils library for providing API which can fill or replace blocks.
 * @author Astro <astr36@naver.com>
 * @version 1.0
 * @license Apache-2.0
 */
/** @namespace Level */
(($, Level) => {
    "use strict";

    const Thread_ = java.lang.Thread;

    let touchedId,
        touchedData,
        touchedSide;

    function exists(arr0, arr1) {
        for (let i = arr0.length; i--;) {
            let arr = arr0[i];
            if (arr[0] === arr1[0] && arr[1] === arr1[1]) {
                return true;
            }
        }
        return false;
    }

    /**
     * The maximum number of blocks that can be set at a time
     * @type {Number}
     */
    Level.FILL_MAX_TILE = 4096;

    /**
     * Fills blocks based on x and y axis.
     * @since 2016-09-04
     * @param {Number} x X
     * @param {Number} y Y
     * @param {Number} z Z
     * @param {Number} [blockid=1] Block ID
     * @param {Number} [blockData=0] Block data
     * @param {Number} [targetId=0] Target block ID
     * @param {Number} [targetData=0] Target block data
     */
    Level.fillXY = function (x, y, z, blockid, blockData, targetId, targetData) {
        let tiles = [
            [x, y]
        ];

        blockid = blockid || 1;
        blockData = blockData || 0;
        targetId = targetId || 0;
        targetData = targetData || 0;

        function fill(newX, newY) {
            if (newY < 128) {
                if (tiles.length <= Level.FILL_MAX_TILE && !exists(tiles, [newX + 1, newY]) && Level.getTile(newX + 1, newY, z) === targetId && Level.getData(newX + 1, newY, z) === targetData) {
                    tiles.push([newX + 1, newY]);
                    fill(newX + 1, newY);
                }

                if (tiles.length <= Level.FILL_MAX_TILE && !exists(tiles, [newX - 1, newY]) && Level.getTile(newX - 1, newY, z) === targetId && Level.getData(newX - 1, newY, z) === targetData) {
                    tiles.push([newX - 1, newY]);
                    fill(newX - 1, newY);
                }

                if (tiles.length <= Level.FILL_MAX_TILE && !exists(tiles, [newX, newY + 1]) && Level.getTile(newX, newY + 1, z) === targetId && Level.getData(newX, newY + 1, z) === targetData) {
                    tiles.push([newX, newY + 1]);
                    fill(newX, newY + 1);
                }

                if (tiles.length <= Level.FILL_MAX_TILE && !exists(tiles, [newX, newY - 1]) && Level.getTile(newX, newY - 1, z) === targetId && Level.getData(newX, newY - 1, z) === targetData) {
                    tiles.push([newX, newY - 1]);
                    fill(newX, newY - 1);
                }
            }
        }

        fill(x, y);

        for (let i = tiles.length; i--;) {
            let tile = tiles[i];
            Level.setTile(tile[0], tile[1], z, blockid, blockData);
        }
    };

    /**
     * Fills blocks based on x and z axis.
     * @since 2016-09-04
     * @param {Number} x X
     * @param {Number} y Y
     * @param {Number} z Z
     * @param {Number} [blockid=1] Block ID
     * @param {Number} [blockData=0] Block data
     * @param {Number} [targetId=0] Target block ID
     * @param {Number} [targetData=0] Target block data
     */
    Level.fillXZ = function (x, y, z, blockid, blockData, targetId, targetData) {
        let tiles = [
            [x, z]
        ];

        blockid = blockid || 1;
        blockData = blockData || 0;
        targetId = targetId || 0;
        targetData = targetData || 0;

        function fill(newX, newZ) {
            if (tiles.length <= Level.FILL_MAX_TILE && !exists(tiles, [newX + 1, newZ]) && Level.getTile(newX + 1, y, newZ) === targetId && Level.getData(newX + 1, y, newZ) === targetData) {
                tiles.push([newX + 1, newZ]);
                fill(newX + 1, newZ);
            }

            if (tiles.length <= Level.FILL_MAX_TILE && !exists(tiles, [newX - 1, newZ]) && Level.getTile(newX - 1, y, newZ) === targetId && Level.getData(newX - 1, y, newZ) === targetData) {
                tiles.push([newX - 1, newZ]);
                fill(newX - 1, newZ);
            }

            if (tiles.length <= Level.FILL_MAX_TILE && !exists(tiles, [newX, newZ + 1]) && Level.getTile(newX, y, newZ + 1) === targetId && Level.getData(newX, y, newZ + 1) === targetData) {
                tiles.push([newX, newZ + 1]);
                fill(newX, newZ + 1);
            }

            if (tiles.length <= Level.FILL_MAX_TILE && !exists(tiles, [newX, newZ - 1]) && Level.getTile(newX, y, newZ - 1) === targetId && Level.getData(newX, y, newZ - 1) === targetData) {
                tiles.push([newX, newZ - 1]);
                fill(newX, newZ - 1);
            }
        }

        fill(x, z);

        for (let i = tiles.length; i--;) {
            let tile = tiles[i];
            Level.setTile(tile[0], y, tile[1], blockid, blockData);
        }
    };

    /**
     * Fills blocks based on y and z axis.
     * @since 2016-09-04
     * @param {Number} x X
     * @param {Number} y Y
     * @param {Number} z Z
     * @param {Number} [blockid=1] Block ID
     * @param {Number} [blockData=0] Block data
     * @param {Number} [targetId=0] Target block ID
     * @param {Number} [targetData=0] Target block data
     */
    Level.fillYZ = function (x, y, z, blockid, blockData, targetId, targetData) {
        let tiles = [
            [y, z]
        ];

        blockid = blockid || 1;
        blockData = blockData || 0;
        targetId = targetId || 0;
        targetData = targetData || 0;

        function fill(newY, newZ) {
            if (newY < 128) {
                if (tiles.length <= Level.FILL_MAX_TILE && !exists(tiles, [newY + 1, newZ]) && Level.getTile(x, newY + 1, newZ) === targetId && Level.getData(x, newY + 1, newZ) === targetData) {
                    tiles.push([newY + 1, newZ]);
                    fill(newY + 1, newZ);
                }

                if (tiles.length <= Level.FILL_MAX_TILE && !exists(tiles, [newY - 1, newZ]) && Level.getTile(x, newY - 1, newZ) === targetId && Level.getData(x, newY - 1, newZ) === targetData) {
                    tiles.push([newY - 1, newZ]);
                    fill(newY - 1, newZ);
                }

                if (tiles.length <= Level.FILL_MAX_TILE && !exists(tiles, [newY, newZ + 1]) && Level.getTile(x, newY, newZ + 1) === targetId && Level.getData(x, newY, newZ + 1) === targetData) {
                    tiles.push([newY, newZ + 1]);
                    fill(newY, newZ + 1);
                }

                if (tiles.length <= Level.FILL_MAX_TILE && !exists(tiles, [newY, newZ - 1]) && Level.getTile(x, newY, newZ - 1) === targetId && Level.getData(x, newY, newZ - 1) === targetData) {
                    tiles.push([newY, newZ - 1]);
                    fill(newY, newZ - 1);
                }
            }
        }

        fill(y, z);

        for (let i = tiles.length; i--;) {
            let tile = tiles[i];
            Level.setTile(x, tile[0], tile[1], blockid, blockData);
        }
    };

    /**
     * Replaces blocks based on block sides which player touched.
     * @since 2016-09-04
     * @param {Number} x X
     * @param {Number} y Y
     * @param {Number} z Z
     * @param {Number} [blockid=(Touched block ID)] Block ID
     * @param {Number} [blockData=(Touched block data)] Block data
     * @param {Number} [targetId=(Around block ID, only all around block has same ID)] Target block ID
     * @param {Number} [targetData=(Around block data, only all around block has same data)] Target block data
     */
    Level.replaceTile = (x, y, z, blockid, blockData, targetId, targetData) => {
        blockid = blockid || touchedId;
        blockData = blockData || touchedData;

        let tmp;

        new java.lang.Thread({
            run() {
                switch (touchedSide) {
                case 0:
                case 1:
                    if (typeof targetId !== "number" && (tmp = Level.getTile(x + 1, y, z)) === Level.getTile(x - 1, y, z) && Level.getTile(x, y, z + 1) === tmp && Level.getTile(x, y, z - 1) === tmp) {
                        targetId = tmp;
                    }
                    if (typeof targetData !== "number" && (tmp = Level.getData(x + 1, y, z)) === Level.getData(x - 1, y, z) && Level.getData(x, y, z + 1) === tmp && Level.getData(x, y, z - 1) === tmp) {
                        targetData = tmp;
                    }
                    Level.fillXZ(x, y, z, blockid, blockData, targetId, targetData);
                    break;
                case 2:
                case 3:
                    if (typeof targetId !== "number" && (tmp = Level.getTile(x + 1, y, z)) === Level.getTile(x - 1, y, z) && Level.getTile(x, y + 1, z) === tmp && Level.getTile(x, y - 1, z) === tmp) {
                        targetId = tmp;
                    }
                    if (typeof targetData !== "number" && (tmp = Level.getData(x + 1, y, z)) === Level.getData(x - 1, y, z) && Level.getData(x, y + 1, z) === tmp && Level.getData(x, y - 1, z) === tmp) {
                        targetData = tmp;
                    }
                    Level.fillXY(x, y, z, blockid, blockData, targetId, targetData);
                    break;
                case 4:
                case 5:
                    if (typeof targetId !== "number" && (tmp = Level.getTile(x, y + 1, z)) === Level.getTile(x, y - 1, z) && Level.getTile(x, y, z + 1) === tmp && Level.getTile(x, y, z - 1) === tmp) {
                        targetId = tmp;
                    }
                    if (typeof targetData !== "number" && (tmp = Level.getData(x, y + 1, z)) === Level.getData(x, y - 1, z) && Level.getData(x, y, z + 1) === tmp && Level.getData(x, y, z - 1) === tmp) {
                        targetData = tmp;
                    }
                    Level.fillYZ(x, y, z, blockid, blockData, targetId, targetData);
                }
            }
        }).start();
    };

    /**
     * Fills blocks based on block sides which player touched.
     * @since 2016-09-04
     * @param {Number} x X
     * @param {Number} y Y
     * @param {Number} z Z
     * @param {Number} [blockid=1] Block ID
     * @param {Number} [blockData=0] Block data
     */
    Level.fillTile = (x, y, z, blockid, blockData) => {
        Level.replaceTile(x, y, z, blockid, blockData);
    };

    new Thread_({
        run() {
            Thread_.sleep(3000);
            let code = typeof $.useItem === "function" ? $.useItem.toString() : null;
            $.useItem = (x, y, z, itemid, blockid, blockSide, itemData, blockData) => {
                touchedId = blockid;
                touchedData = blockData;
                touchedSide = blockSide;
                if (code !== null) {
                    eval(code)(x, y, z, itemid, blockid, blockSide, itemData, blockData);
                }
            };
        }
    }).start();

})(this, Level);