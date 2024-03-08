/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/MapDisplay.jsx":
/*!***************************************!*\
  !*** ./src/components/MapDisplay.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_MapContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/MapContext */ "./src/context/MapContext.jsx");



const MapDisplay = () => {
  const {
    mapRef
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_MapContext__WEBPACK_IMPORTED_MODULE_2__.MapContext);
  const setupMap = async () => {
    const overpassQuery = `[out:json][timeout:25];
            area["name"="Nebraska"]->.searchArea;
            relation["boundary"="administrative"]["admin_level"="6"](area.searchArea);
            (._;>;);
            out;`;
    fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: overpassQuery
    }).then(response => response.json()).then(data => {
      const features = [];
      const nodes = data.elements.filter(element => element.type === 'node');
      const ways = data.elements.filter(element => element.type === 'way');
      const relations = data.elements.filter(element => element.type === 'relation');
      relations.forEach(relation => {
        let boundaryCoords = [];
        relation.members.forEach(member => {
          if (member.type === 'way') {
            let wayObj = ways.find(way => way.id === member.ref);
            if (wayObj) {
              wayObj.nodes.forEach(nodeId => {
                let nodeObj = nodes.find(node => node.id === nodeId);
                if (nodeObj) {
                  let coordinates = [nodeObj.lat, nodeObj.lon];
                  boundaryCoords.push(coordinates);
                }
              });
            }
          }
        });

        // coord check for closed polygon
        if (boundaryCoords[0] !== boundaryCoords[boundaryCoords.length - 1]) {
          boundaryCoords.push(boundaryCoords[0]);
        }
        let newPolygon = turf.polygon([boundaryCoords], relation.tags);
        features.push(newPolygon);
      });
      let newCollection = turf.featureCollection(features);
      console.log(newCollection);
      let newLayer = L.geoJSON(newCollection);
      console.log(newLayer);
      newLayer.addTo(mapRef.current);
    });
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    mapRef.current = L.map('admin-map-display', {
      center: [39.8283, -98.5795],
      zoom: 4,
      maxBounds: [[49.3843, -66.8859], [24.3963, -124.8489]]
    });
    L.tileLayer('https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=GXUO6RDrkZ9BfFwKsVIr', {
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      maxZoom: 19
    }).addTo(mapRef.current);
    setupMap();
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "admin-map-display",
    style: {
      height: '750px'
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapDisplay);

/***/ }),

/***/ "./src/components/MapLegend.jsx":
/*!**************************************!*\
  !*** ./src/components/MapLegend.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_MapContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/MapContext */ "./src/context/MapContext.jsx");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




const MapLegend = () => {
  const {
    branches,
    setBranches
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_MapContext__WEBPACK_IMPORTED_MODULE_1__.MapContext);
  const handleLegendAction = event => {
    setBranches(event.target.key);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Heading, null, "Map Legend")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Grid, {
    columns: 7,
    gap: 2
  }, branches.map(branch => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      style: {
        backgroundColor: branch.color,
        color: 'white'
      },
      key: branch.id,
      onClick: handleLegendAction
    }, branch.name);
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MapLegend);

/***/ }),

/***/ "./src/components/RegionSelector.jsx":
/*!*******************************************!*\
  !*** ./src/components/RegionSelector.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_MapContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/MapContext */ "./src/context/MapContext.jsx");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




const RegionSelector = () => {
  const {
    regions,
    setRegions
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_MapContext__WEBPACK_IMPORTED_MODULE_1__.MapContext);
  const handleRegionAction = event => {
    var eventProp = event.target.id;
    var eventData = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setRegions(regions.map(region => {
      return {
        ...region,
        [eventProp]: eventData
      };
    }));
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Heading, null, "Region Selector")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Grid, {
    columns: 6,
    gap: 2
  }, regions.map(region => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      key: region.fips,
      label: region.name,
      checked: region.active,
      onChange: handleRegionAction
    });
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RegionSelector);

/***/ }),

/***/ "./src/components/SubregionData.jsx":
/*!******************************************!*\
  !*** ./src/components/SubregionData.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_MapContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/MapContext */ "./src/context/MapContext.jsx");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);




const SubregionData = () => {
  const {
    selectedSubregions,
    setSelectedSubregions,
    handleMapSave
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_MapContext__WEBPACK_IMPORTED_MODULE_1__.MapContext);
  const handleSubregionAction = event => {
    var eventProp = event.target.id;
    var eventData = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setSelectedSubregions(selectedSubregions.map(subregion => {
      return {
        ...subregion,
        [eventProp]: eventData
      };
    }));
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Heading, null, "Subregion Data")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isPrimary: true,
    onClick: handleMapSave
  }, "Save Map")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    id: "active",
    label: "Activate Subregions",
    checked: selectedSubregions.every(subregion => subregion.active),
    onChange: handleSubregionAction
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    id: "branch",
    label: "Select Branch",
    options: branchOptions,
    onChange: handleSubregionAction,
    value: selectedSubregions.every(subregion => subregion.branch)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CardDivider, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    level: 4
  }, "Selected Subregions:"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, selectedSubregions.map(subregion => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: subregion.id
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Heading, {
      level: 5
    }, subregion.name));
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CardDivider, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    level: 4
  }, "Subregion Restrictions:"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    id: "restricted",
    label: "Restrict Subregions",
    checked: selectedSubregions.every(subregion => subregion.restricted),
    onChange: handleSubregionAction
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    id: "restrictionReason",
    label: "Reason for Restriction",
    value: selectedSubregions.every(subregion => subregion.restrictionReason),
    onChange: handleSubregionAction
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubregionData);

/***/ }),

/***/ "./src/context/MapContext.jsx":
/*!************************************!*\
  !*** ./src/context/MapContext.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MapContext: () => (/* binding */ MapContext),
/* harmony export */   MapProvider: () => (/* binding */ MapProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);


const MapContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const MapProvider = props => {
  const [selectedSubregions, setSelectedSubregions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [regions, setRegions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [branches, setBranches] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const handleMapSave = () => {
    console.log('saving subregions');
    console.log('saving regions');
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(MapContext.Provider, {
    value: {
      mapRef: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(),
      selectedSubregions,
      setSelectedSubregions,
      regions,
      setRegions,
      branches,
      setBranches,
      handleMapSave
    }
  }, props.children);
};


/***/ }),

/***/ "./src/layout/Layout.jsx":
/*!*******************************!*\
  !*** ./src/layout/Layout.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_RegionSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/RegionSelector */ "./src/components/RegionSelector.jsx");
/* harmony import */ var _components_MapLegend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/MapLegend */ "./src/components/MapLegend.jsx");
/* harmony import */ var _components_SubregionData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/SubregionData */ "./src/components/SubregionData.jsx");
/* harmony import */ var _components_MapDisplay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/MapDisplay */ "./src/components/MapDisplay.jsx");





// import MapProcessor from '../components/MapProcessor'

const Layout = () => {
  console.log('Layout');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_MapDisplay__WEBPACK_IMPORTED_MODULE_4__["default"], null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/layout/MapProvider.jsx":
/*!************************************!*\
  !*** ./src/layout/MapProvider.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_MapContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/MapContext */ "./src/context/MapContext.jsx");
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Layout */ "./src/layout/Layout.jsx");



function App() {
  console.log('App');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_MapContext__WEBPACK_IMPORTED_MODULE_1__.MapProvider, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Layout__WEBPACK_IMPORTED_MODULE_2__["default"], null));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _layout_MapProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout/MapProvider */ "./src/layout/MapProvider.jsx");



const mapContainer = document.getElementById('afc-territory-admin');
if (mapContainer) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(mapContainer).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_layout_MapProvider__WEBPACK_IMPORTED_MODULE_2__["default"], null));
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map