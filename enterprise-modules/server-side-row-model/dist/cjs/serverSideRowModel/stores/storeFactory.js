"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@ag-grid-community/core");
var partialStore_1 = require("./partialStore");
var fullStore_1 = require("./fullStore");
var StoreFactory = /** @class */ (function () {
    function StoreFactory() {
    }
    StoreFactory.prototype.createStore = function (ssrmParams, parentNode) {
        var storeParams = this.getStoreParams(ssrmParams, parentNode);
        var CacheClass = storeParams.storeType === core_1.ServerSideStoreType.Partial ? partialStore_1.PartialStore : fullStore_1.FullStore;
        return new CacheClass(ssrmParams, storeParams, parentNode);
    };
    StoreFactory.prototype.getStoreParams = function (ssrmParams, parentNode) {
        var userStoreParams = this.getLevelSpecificParams(parentNode);
        // if user provided overrideParams, we take storeType from there if it exists
        var storeType = this.getStoreType(userStoreParams);
        var cacheBlockSize = this.getBlockSize(storeType, userStoreParams);
        var maxBlocksInCache = this.getMaxBlocksInCache(storeType, ssrmParams, userStoreParams);
        var storeParams = {
            storeType: storeType,
            cacheBlockSize: cacheBlockSize,
            maxBlocksInCache: maxBlocksInCache
        };
        return storeParams;
    };
    StoreFactory.prototype.getMaxBlocksInCache = function (storeType, ssrmParams, userStoreParams) {
        if (storeType == core_1.ServerSideStoreType.Full) {
            return undefined;
        }
        var maxBlocksInCache = (userStoreParams && userStoreParams.maxBlocksInCache != null)
            ? userStoreParams.maxBlocksInCache
            : this.gridOptionsWrapper.getMaxBlocksInCache();
        var maxBlocksActive = maxBlocksInCache != null && maxBlocksInCache >= 0;
        if (!maxBlocksActive) {
            return undefined;
        }
        if (ssrmParams.dynamicRowHeight) {
            var message_1 = 'AG Grid: Server Side Row Model does not support Dynamic Row Height and Cache Purging. ' +
                'Either a) remove getRowHeight() callback or b) remove maxBlocksInCache property. Purging has been disabled.';
            core_1._.doOnce(function () { return console.warn(message_1); }, 'storeFactory.maxBlocksInCache.dynamicRowHeight');
            return undefined;
        }
        if (this.columnController.isAutoRowHeightActive()) {
            var message_2 = 'AG Grid: Server Side Row Model does not support Auto Row Height and Cache Purging. ' +
                'Either a) remove colDef.autoHeight or b) remove maxBlocksInCache property. Purging has been disabled.';
            core_1._.doOnce(function () { return console.warn(message_2); }, 'storeFactory.maxBlocksInCache.autoRowHeightActive');
            return undefined;
        }
        return maxBlocksInCache;
    };
    StoreFactory.prototype.getBlockSize = function (storeType, userStoreParams) {
        if (storeType == core_1.ServerSideStoreType.Full) {
            return undefined;
        }
        var blockSize = (userStoreParams && userStoreParams.cacheBlockSize != null)
            ? userStoreParams.cacheBlockSize
            : this.gridOptionsWrapper.getCacheBlockSize();
        if (blockSize != null && blockSize > 0) {
            return blockSize;
        }
        else {
            return 100;
        }
    };
    StoreFactory.prototype.getLevelSpecificParams = function (parentNode) {
        var callback = this.gridOptionsWrapper.getServerSideStoreParamsFunc();
        if (!callback) {
            return undefined;
        }
        var params = {
            level: parentNode.level + 1,
            parentRowNode: parentNode.level >= 0 ? parentNode : undefined,
            rowGroupColumns: this.columnController.getRowGroupColumns(),
            pivotColumns: this.columnController.getPivotColumns(),
            pivotMode: this.columnController.isPivotMode()
        };
        return callback(params);
    };
    StoreFactory.prototype.getStoreType = function (storeParams) {
        var storeType = (storeParams && storeParams.storeType != null)
            ? storeParams.storeType
            : this.gridOptionsWrapper.getServerSideStoreType();
        switch (storeType) {
            case core_1.ServerSideStoreType.Partial:
            case core_1.ServerSideStoreType.Full:
                return storeType;
            case null:
            case undefined:
                return core_1.ServerSideStoreType.Full;
            default:
                var types = Object.keys(core_1.ServerSideStoreType).join(', ');
                console.warn("AG Grid: invalid Server Side Store Type " + storeType + ", valid types are [" + types + "]");
                return core_1.ServerSideStoreType.Partial;
        }
    };
    __decorate([
        core_1.Autowired('gridOptionsWrapper')
    ], StoreFactory.prototype, "gridOptionsWrapper", void 0);
    __decorate([
        core_1.Autowired('columnController')
    ], StoreFactory.prototype, "columnController", void 0);
    StoreFactory = __decorate([
        core_1.Bean('ssrmStoreFactory')
    ], StoreFactory);
    return StoreFactory;
}());
exports.StoreFactory = StoreFactory;
//# sourceMappingURL=storeFactory.js.map