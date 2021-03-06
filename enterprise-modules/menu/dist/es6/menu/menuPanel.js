var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ManagedFocusComponent, KeyCode } from '@ag-grid-community/core';
var MenuPanel = /** @class */ (function (_super) {
    __extends(MenuPanel, _super);
    function MenuPanel(wrappedComponent) {
        var _this = _super.call(this, undefined, true) || this;
        _this.wrappedComponent = wrappedComponent;
        _this.setTemplateFromElement(wrappedComponent.getGui());
        return _this;
    }
    MenuPanel.prototype.handleKeyDown = function (e) {
        if (e.keyCode === KeyCode.ESCAPE) {
            this.closePanel();
        }
    };
    MenuPanel.prototype.onTabKeyDown = function (e) {
        _super.prototype.onTabKeyDown.call(this, e);
        if (e.defaultPrevented) {
            return;
        }
        this.closePanel();
        e.preventDefault();
    };
    MenuPanel.prototype.closePanel = function () {
        var menuItem = this.parentComponent;
        menuItem.closeSubMenu();
        setTimeout(function () { return menuItem.getGui().focus(); }, 0);
    };
    return MenuPanel;
}(ManagedFocusComponent));
export { MenuPanel };
