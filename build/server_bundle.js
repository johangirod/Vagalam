require("source-map-support").install({ environment: 'node' });
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "a4cfdca73671da5f72a1"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(52)(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./node_modules/vitaminjs/src/server/components/ErrorPage/style.css":
/* no static exports found */
/* all exports used */
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./~/vitaminjs/src/server/components/ErrorPage/style.css ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "\nhtml {\n    height: 100%;\n    box-sizing: border-box;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}\n\nbody {\n    background-color: rgb(245, 245, 245);\n    font-family: 'Roboto', sans-serif;\n    position: relative;\n    min-height: 100%;\n    margin: 0;\n    padding-bottom: 6rem;\n}\n\n.style__page___ZsDF8 {\n    padding-top: 80px;\n    color: rgb(150, 150, 150);\n}\n\n.style__container___YJTTz {\n    margin: auto;\n    max-width: 500px;\n    text-align: center;\n}\n\n.style__pineapple___2-Ppr {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n}\n\n.style__pineapple___2-Ppr > * {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\n@media (max-width: 400px) {\n    .style__pineapple___2-Ppr {\n        font-size: 150px;\n    }\n    .style__pineapple___2-Ppr svg {\n        width: 100px;\n    }\n}\n\n@media (min-width: 401px) {\n    .style__pineapple___2-Ppr {\n        font-size: 220px;\n    }\n    .style__pineapple___2-Ppr svg {\n        width: 150px;\n    }\n}\n\n.style__stack-container___2CbNU {\n    background-color: rgb(249, 249, 249);\n    padding: 10px;\n    border-radius: 20px;\n    margin: auto;\n    margin-top: 30px;\n    max-width: 1100px;\n    width: calc(100% - 40px);\n}\n\n.style__error-details___TXmra {\n    margin-left: 15px;\n    color: sienna;\n}\n\ncode {\n    font-family: 'Roboto Mono', monospace;\n    font-size: 14px;\n}\n\npre {\n    white-space: pre-wrap;\n}\n\na {\n    color: cornflowerblue;\n}\n\nfooter {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    left: 0;\n    text-align: right;\n    padding: 1rem;\n}\n", ""]);

// exports
exports.locals = {
	"page": "style__page___ZsDF8",
	"container": "style__container___YJTTz",
	"pineapple": "style__pineapple___2-Ppr",
	"stack-container": "style__stack-container___2CbNU",
	"error-details": "style__error-details___TXmra"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Landing/style.css":
/* no static exports found */
/* all exports used */
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/Landing/style.css ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "\nsection {\n    background-size: cover;\n    background-position: center;\n    height: 300px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n\nheader {\n    color: white;\n    font-family: 'Crimson Text', serif;\n    -ms-flex-item-align: end;\n        align-self: flex-end;\n}\n\nh1 {\n    margin: 0;\n    font-size: 72px;\n    padding: 22px;\n    font-weight: normal;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/ui-element/Button/style.css":
/* no static exports found */
/* all exports used */
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/ui-element/Button/style.css ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "button {\n    border-radius: 20px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/isomorphic-style-loader/lib/insertCss.js":
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/isomorphic-style-loader/lib/insertCss.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 22);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ 23);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var id = _step.value;

      if (--inserted[id] <= 0) {
        var elem = document.getElementById(prefix + id);
        if (elem) {
          elem.parentNode.removeChild(elem);
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && btoa) {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),

/***/ "./node_modules/vitaminjs/config/build/babelrc.js":
/* exports provided: default */
/* exports used: default */
/*!*********************************************!*\
  !*** ./~/vitaminjs/config/build/babelrc.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_preset_env__ = __webpack_require__(/*! babel-preset-env */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_preset_env___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_preset_env__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_preset_react__ = __webpack_require__(/*! babel-preset-react */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_preset_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_preset_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_preset_stage_1__ = __webpack_require__(/*! babel-preset-stage-1 */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_preset_stage_1___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_preset_stage_1__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_plugin_react_require__ = __webpack_require__(/*! babel-plugin-react-require */ 13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_plugin_react_require___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_plugin_react_require__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_plugin_transform_export_default_name_forked__ = __webpack_require__(/*! babel-plugin-transform-export-default-name-forked */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_plugin_transform_export_default_name_forked___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_plugin_transform_export_default_name_forked__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_plugin_minify_replace__ = __webpack_require__(/*! babel-plugin-minify-replace */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_plugin_minify_replace___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_plugin_minify_replace__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_plugin_transform_node_env_inline__ = __webpack_require__(/*! babel-plugin-transform-node-env-inline */ 15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_plugin_transform_node_env_inline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_plugin_transform_node_env_inline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_plugin_minify_dead_code_elimination__ = __webpack_require__(/*! babel-plugin-minify-dead-code-elimination */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_plugin_minify_dead_code_elimination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_plugin_minify_dead_code_elimination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_plugin_minify_guarded_expressions__ = __webpack_require__(/*! babel-plugin-minify-guarded-expressions */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_plugin_minify_guarded_expressions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_plugin_minify_guarded_expressions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_plugin_discard_module_references__ = __webpack_require__(/*! babel-plugin-discard-module-references */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_plugin_discard_module_references___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_plugin_discard_module_references__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_react_jsx_source__ = __webpack_require__(/*! babel-plugin-transform-react-jsx-source */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_react_jsx_source___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_react_jsx_source__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_babel_plugin_transform_react_jsx_self__ = __webpack_require__(/*! babel-plugin-transform-react-jsx-self */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_babel_plugin_transform_react_jsx_self___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_babel_plugin_transform_react_jsx_self__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils__ = __webpack_require__(/*! ../utils */ "./node_modules/vitaminjs/config/utils/index.js");














/* harmony default export */ __webpack_exports__["a"] = (function babelrc(env, options) {
    return {
        // order is: last to first
        presets: [[__WEBPACK_IMPORTED_MODULE_0_babel_preset_env___default.a, {
            modules: false,
            useBuiltIns: true,
            targets: env !== 'client' ? { node: 'current' } : { browsers: options.client.targetBrowsers }
        }], __WEBPACK_IMPORTED_MODULE_1_babel_preset_react___default.a, __WEBPACK_IMPORTED_MODULE_2_babel_preset_stage_1___default.a].filter(Boolean),
        // order is: first to last
        plugins: [
        // Make optional the explicit import of React in JSX files
        __WEBPACK_IMPORTED_MODULE_3_babel_plugin_react_require___default.a,
        // Adds component stack to warning messages
        options.dev && __WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_react_jsx_source___default.a,
        // Adds __self attribute to JSX which React will use for some warnings
        options.dev && __WEBPACK_IMPORTED_MODULE_11_babel_plugin_transform_react_jsx_self___default.a,
        // replace process.env.NODE_ENV by its current value
        __WEBPACK_IMPORTED_MODULE_6_babel_plugin_transform_node_env_inline___default.a,
        // replace IS_CLIENT and IS_SERVER
        [__WEBPACK_IMPORTED_MODULE_5_babel_plugin_minify_replace___default.a, {
            replacements: [{
                identifierName: 'IS_CLIENT',
                replacement: { type: 'booleanLiteral', value: env === 'client' }
            }, {
                identifierName: 'IS_SERVER',
                replacement: { type: 'booleanLiteral', value: env === 'server' }
            }]
        }],
        // Dead code elimination (for example: if (IS_CLIENT) { ... } becames if (false) { }
        [__WEBPACK_IMPORTED_MODULE_7_babel_plugin_minify_dead_code_elimination___default.a, { keepFnName: true }],
        // transforms `IS_CLIENT && doSomething()` => `false && doSomething()` to `false`
        __WEBPACK_IMPORTED_MODULE_8_babel_plugin_minify_guarded_expressions___default.a,
        // Remove server-only or client-only imports
        __WEBPACK_IMPORTED_MODULE_9_babel_plugin_discard_module_references___default.a,
        // easier debugging on export default arrow functions with the filename
        __WEBPACK_IMPORTED_MODULE_4_babel_plugin_transform_export_default_name_forked___default.a].filter(Boolean),
        sourceRoot: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__utils__["a" /* vitaminResolve */])()
    };
});

/***/ }),

/***/ "./node_modules/vitaminjs/config/build/webpack.config.client.js":
/* exports provided: default */
/* exports used: default */
/*!***********************************************************!*\
  !*** ./~/vitaminjs/config/build/webpack.config.client.js ***!
  \***********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = clientConfig;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_mergewith__ = __webpack_require__(/*! lodash.mergewith */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_mergewith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_mergewith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webpack__ = __webpack_require__(/*! webpack */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serviceworker_webpack_plugin__ = __webpack_require__(/*! serviceworker-webpack-plugin */ 49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serviceworker_webpack_plugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_serviceworker_webpack_plugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__webpack_config_common_js__ = __webpack_require__(/*! ./webpack.config.common.js */ "./node_modules/vitaminjs/config/build/webpack.config.common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(/*! ../utils */ "./node_modules/vitaminjs/config/utils/index.js");







function clientConfig(options) {
    const hotMiddlewareEntry = `webpack-hot-middleware/client?path=${options.publicPath}/__webpack_hmr`;
    return __WEBPACK_IMPORTED_MODULE_0_lodash_mergewith___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__webpack_config_common_js__["a" /* config */])(options), {
        entry: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* vitaminResolve */])('src', 'client', 'index.jsx'), options.hot && hotMiddlewareEntry].filter(Boolean),
        output: {
            path: options.client.buildPath,
            filename: options.client.filename
        },
        module: {
            rules: [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__webpack_config_common_js__["b" /* createBabelLoader */])('client', options), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__webpack_config_common_js__["c" /* createResolveConfigLoader */])()]
        },
        plugins: [new __WEBPACK_IMPORTED_MODULE_1_webpack___default.a.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(undefined)
        }), options.hot && new __WEBPACK_IMPORTED_MODULE_1_webpack___default.a.NoEmitOnErrorsPlugin(), !options.dev && new __WEBPACK_IMPORTED_MODULE_1_webpack___default.a.optimize.UglifyJsPlugin({ minimize: true }), options.client.serviceWorker && new __WEBPACK_IMPORTED_MODULE_2_serviceworker_webpack_plugin___default.a({
            entry: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* appResolve */])(options.client.serviceWorker)
        })].filter(Boolean),
        // Some libraries import Node modules but don't use them in the browser.
        // Tell Webpack to provide empty mocks for them so importing them works.
        // fs and module are used by source-map-support
        node: {
            fs: 'empty',
            module: 'empty'
        }
    }, __WEBPACK_IMPORTED_MODULE_4__utils__["c" /* concat */]);
}

/***/ }),

/***/ "./node_modules/vitaminjs/config/build/webpack.config.common.js":
/* exports provided: createBabelLoader, createResolveConfigLoader, config */
/* exports used: config, createBabelLoader, createResolveConfigLoader */
/*!***********************************************************!*\
  !*** ./~/vitaminjs/config/build/webpack.config.common.js ***!
  \***********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = config;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(/*! webpack */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_case_sensitive_paths_webpack_plugin__ = __webpack_require__(/*! case-sensitive-paths-webpack-plugin */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_case_sensitive_paths_webpack_plugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_case_sensitive_paths_webpack_plugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dev_utils_WatchMissingNodeModulesPlugin__ = __webpack_require__(/*! react-dev-utils/WatchMissingNodeModulesPlugin */ 42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dev_utils_WatchMissingNodeModulesPlugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dev_utils_WatchMissingNodeModulesPlugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_postcss_omit_import_tilde__ = __webpack_require__(/*! postcss-omit-import-tilde */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_postcss_omit_import_tilde___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_postcss_omit_import_tilde__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_postcss_import__ = __webpack_require__(/*! postcss-import */ 38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_postcss_import___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_postcss_import__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_postcss_url__ = __webpack_require__(/*! postcss-url */ 41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_postcss_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_postcss_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_postcss_cssnext__ = __webpack_require__(/*! postcss-cssnext */ 37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_postcss_cssnext___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_postcss_cssnext__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_postcss_browser_reporter__ = __webpack_require__(/*! postcss-browser-reporter */ 36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_postcss_browser_reporter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_postcss_browser_reporter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_postcss_reporter__ = __webpack_require__(/*! postcss-reporter */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_postcss_reporter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_postcss_reporter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_path__ = __webpack_require__(/*! path */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils__ = __webpack_require__(/*! ../utils */ "./node_modules/vitaminjs/config/utils/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__babelrc__ = __webpack_require__(/*! ./babelrc */ "./node_modules/vitaminjs/config/build/babelrc.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };














const VITAMIN_DIRECTORY = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils__["a" /* vitaminResolve */])();
const VITAMIN_MODULES_DIRECTORY = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils__["a" /* vitaminResolve */])('node_modules');
const VITAMIN_MODULES_EXAMPLES_DIRECTORY = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils__["a" /* vitaminResolve */])('examples');
const APP_MODULES = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils__["b" /* appResolve */])('node_modules');
const MODULES_DIRECTORIES = [APP_MODULES, VITAMIN_MODULES_DIRECTORY];

const createBabelLoader = (env, options) => ({
    test: /\.js(x?)$/,
    loader: 'babel-loader',
    include: path => !path.includes('node_modules') || path.startsWith(VITAMIN_DIRECTORY) && !path.startsWith(VITAMIN_MODULES_DIRECTORY) && !path.startsWith(VITAMIN_MODULES_EXAMPLES_DIRECTORY),
    query: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__babelrc__["a" /* default */])(env, options)
});
/* harmony export (immutable) */ __webpack_exports__["b"] = createBabelLoader;


const createResolveConfigLoader = () => ({
    // The following loader will resolve the config to its final value during the build
    test: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils__["a" /* vitaminResolve */])('config/index'),
    loader: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils__["a" /* vitaminResolve */])('config/build/resolveConfigLoader')
});
/* harmony export (immutable) */ __webpack_exports__["c"] = createResolveConfigLoader;


function config(options) {
    const CSSLoaders = ({ modules }) => [{
        loader: 'isomorphic-style-loader',
        options: {
            debug: true
        }
    }, {
        loader: 'css-loader',
        options: _extends({
            minimize: !options.dev && { autoprefixer: false },
            discardComments: {
                removeAll: !options.dev
            },
            importLoaders: 1
        }, modules ? {
            localIdentName: options.dev ? '[name]__[local]___[hash:base64:5]' : '[hash:base64]',
            modules: true
        } : {})
    }, 'postcss-loader'];
    return {
        devtool: options.dev && 'source-map',
        output: {
            pathinfo: options.dev,
            publicPath: `${options.publicPath}/`
        },
        module: {
            // Disable handling of unknown requires
            unknownContextRegExp: /$^/,
            unknownContextCritical: true,
            // Disable handling of requires with a single expression
            exprContextRegExp: /$^/,
            exprContextCritical: true,
            // Disable handling of expression in require
            wrappedContextRegExp: /$^/,
            wrappedContextCritical: true,

            rules: [{
                // only files with .global will go through this loader
                test: /\.global\.css$/,
                loaders: CSSLoaders({ modules: false })
            }, {
                // anything with .global will not go through css modules loader
                test: /^((?!\.global).)*\.css$/,
                loaders: CSSLoaders({ modules: true })
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|eot|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_path__["join"])(options.filesPath, '[hash].[ext]')
                }
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.ya?ml$/,
                loader: 'yaml-loader'
            }]
        },

        resolveLoader: {
            modules: MODULES_DIRECTORIES
        },
        cache: options.hot,
        resolve: {
            alias: options.moduleMap,
            modules: MODULES_DIRECTORIES,
            extensions: ['.js', '.jsx', '.json', '.css'],
            mainFields: ['browser', 'module', 'main', 'style']
        },
        plugins: [new __WEBPACK_IMPORTED_MODULE_0_webpack__["LoaderOptionsPlugin"]({
            options: {
                context: __dirname,
                postcss: [__WEBPACK_IMPORTED_MODULE_3_postcss_omit_import_tilde___default()(), __WEBPACK_IMPORTED_MODULE_4_postcss_import___default()(), __WEBPACK_IMPORTED_MODULE_5_postcss_url___default()(), __WEBPACK_IMPORTED_MODULE_6_postcss_cssnext___default()({ browsers: options.client.targetBrowsers }), options.dev && __WEBPACK_IMPORTED_MODULE_7_postcss_browser_reporter___default()(), __WEBPACK_IMPORTED_MODULE_8_postcss_reporter___default()()].filter(Boolean)
            },
            test: /\.css$/,
            debug: true
        }), options.hot && new __WEBPACK_IMPORTED_MODULE_0_webpack__["HotModuleReplacementPlugin"](), options.hot && new __WEBPACK_IMPORTED_MODULE_0_webpack__["NamedModulesPlugin"](),

        // If you require a missing module and then `npm install` it, you still have
        // to restart the development server for Webpack to discover it. This plugin
        // makes the discovery automatic so you don't have to restart.
        // See https://github.com/facebookincubator/create-react-app/issues/186
        options.dev && new __WEBPACK_IMPORTED_MODULE_2_react_dev_utils_WatchMissingNodeModulesPlugin___default.a(APP_MODULES),

        // enforces the entire path of all required modules match the exact case
        // of the actual path on disk. Using this plugin helps alleviate cases
        // for developers working on case insensitive systems like OSX.
        options.dev && new __WEBPACK_IMPORTED_MODULE_1_case_sensitive_paths_webpack_plugin___default.a()].filter(Boolean)
    };
}

/***/ }),

/***/ "./node_modules/vitaminjs/config/index.js":
/* no static exports found */
/* exports used: default */
/*!*************************************!*\
  !*** ./~/vitaminjs/config/index.js ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = { "server": { "buildPath": "/home/johan/Project/Vagalam/build", "filename": "server_bundle.js", "host": "localhost", "port": 3000 }, "basePath": "", "publicPath": "/assets", "servePublic": true, "client": { "buildPath": "/home/johan/Project/Vagalam/public", "filename": "client_bundle.[hash].js", "serviceWorker": false, "targetBrowsers": [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"] }, "filesPath": "files", "rootElementId": "vitamin-app", "moduleMap": { "__app_modules__routes__": "/home/johan/Project/Vagalam/src/routes", "__app_modules__server_middlewares__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/emptyArray", "__app_modules__server_ErrorPage__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/ErrorPage", "__app_modules__server_onError__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/defaultFunction", "__app_modules__server_layout__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/HTMLLayout", "__app_modules__server_createInitAction__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/defaultFunction", "__app_modules__redux_reducers__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/emptyObject", "__app_modules__redux_middlewares__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/emptyArray", "__app_modules__redux_enhancers__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/emptyArray", "__app_modules__redux_stateSerializer__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/src/shared/defaultStateSerializer" } };

/***/ }),

/***/ "./node_modules/vitaminjs/config/utils/defaultFunction.js":
/* exports provided: default */
/* exports used: default */
/*!*****************************************************!*\
  !*** ./~/vitaminjs/config/utils/defaultFunction.js ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function defaultFunction() {});

/***/ }),

/***/ "./node_modules/vitaminjs/config/utils/emptyArray.js":
/* exports provided: default */
/* exports used: default */
/*!************************************************!*\
  !*** ./~/vitaminjs/config/utils/emptyArray.js ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([]);

/***/ }),

/***/ "./node_modules/vitaminjs/config/utils/emptyObject.js":
/* exports provided: default */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/vitaminjs/config/utils/emptyObject.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "./node_modules/vitaminjs/config/utils/hot.js":
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./~/vitaminjs/config/utils/hot.js ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk__ = __webpack_require__(/*! chalk */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_chalk__);
/* eslint-disable */


/*
 * copied from https://github.com/webpack/webpack/blob/master/hot/signal.js
 * and tweeked to display better color messages and send a restart signal
 */
/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Tobias Koppers @sokra
 */
/*globals __resourceQuery */
if (false) {
  throw new Error("[HMR] Hot Module Replacement is disabled.");
}
if (!process.send) {
  throw new Error("[HMR] You need to spawn the process.");
}
var checkForUpdate = function checkForUpdate(fromUpdate) {
  module.hot.check().then(function (updatedModules) {
    if (!updatedModules) {
      if (fromUpdate) console.log(`${__WEBPACK_IMPORTED_MODULE_0_chalk___default.a.green('\u2713')} Server hot reloaded.`);
      return;
    }

    return module.hot.apply({
      ignoreUnaccepted: true
    }).then(function (renewedModules) {
      const unacceptedModules = updatedModules.filter(moduleId => renewedModules && !renewedModules.includes(moduleId));
      if (unacceptedModules.length) {
        process.send('restart');
        return;
      }

      checkForUpdate(true);
    });
  }).catch(function () {
    process.send('restart');
  });
};

process.on(__resourceQuery.substr(1) || "SIGUSR2", function () {
  if (module.hot.status() !== "idle") {
    console.warn("[HMR] Got signal but currently in " + module.hot.status() + " state.");
    console.warn("[HMR] Need to be in idle state to start hot update.");
    return;
  }

  checkForUpdate();
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, ""))

/***/ }),

/***/ "./node_modules/vitaminjs/config/utils/index.js":
/* exports provided: vitaminResolve, appResolve, concat */
/* exports used: vitaminResolve, appResolve, concat */
/*!*******************************************!*\
  !*** ./~/vitaminjs/config/utils/index.js ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = vitaminResolve;
/* harmony export (immutable) */ __webpack_exports__["b"] = appResolve;
/* harmony export (immutable) */ __webpack_exports__["c"] = concat;

const path = __webpack_require__(/*! path */ 6);

function vitaminResolve(...args) {
    return path.resolve(process.env.VITAMIN_PATH, ...args);
}

function appResolve(...args) {
    return path.resolve(process.cwd(), ...args);
}

function concat(left, right) {
    if (!Array.isArray(left) || !Array.isArray(right) || right === left) {
        return undefined;
    }
    return left.concat(right);
}

/***/ }),

/***/ "./node_modules/vitaminjs/react-router.js":
/* exports provided: Link, IndexLink, withRouter, Route, Redirect, IndexRoute, IndexRedirect, PropTypes, browserHistory */
/* exports used: Route */
/*!*************************************!*\
  !*** ./~/vitaminjs/react-router.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(/*! react-router */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_router__);
/* unused harmony reexport Link */
/* unused harmony reexport IndexLink */
/* unused harmony reexport withRouter */
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0_react_router__, "Route")) __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_react_router__["Route"]; });
/* unused harmony reexport Redirect */
/* unused harmony reexport IndexRoute */
/* unused harmony reexport IndexRedirect */
/* unused harmony reexport PropTypes */
/* unused harmony reexport browserHistory */


/***/ }),

/***/ "./node_modules/vitaminjs/src/server/appMiddleware.js":
/* exports provided: default */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/vitaminjs/src/server/appMiddleware.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_compose__ = __webpack_require__(/*! koa-compose */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_compose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_compose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_etag__ = __webpack_require__(/*! koa-etag */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_etag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_etag__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_conditional_get__ = __webpack_require__(/*! koa-conditional-get */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_conditional_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_conditional_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middlewares_errorHandler__ = __webpack_require__(/*! ./middlewares/errorHandler */ "./node_modules/vitaminjs/src/server/middlewares/errorHandler.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_modules_server_middlewares___ = __webpack_require__(/*! __app_modules__server_middlewares__ */ "./node_modules/vitaminjs/config/utils/emptyArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__middlewares_renderer__ = __webpack_require__(/*! ./middlewares/renderer */ "./node_modules/vitaminjs/src/server/middlewares/renderer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__middlewares_store__ = __webpack_require__(/*! ./middlewares/store */ "./node_modules/vitaminjs/src/server/middlewares/store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__middlewares_router__ = __webpack_require__(/*! ./middlewares/router */ "./node_modules/vitaminjs/src/server/middlewares/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__middlewares_initActionDispatcher__ = __webpack_require__(/*! ./middlewares/initActionDispatcher */ "./node_modules/vitaminjs/src/server/middlewares/initActionDispatcher.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__middlewares_staticAssetsServer__ = __webpack_require__(/*! ./middlewares/staticAssetsServer */ "./node_modules/vitaminjs/src/server/middlewares/staticAssetsServer.js");




/*
 * We want to load errorHandler first, because usually, the global uncaught exception
 * catch will be instanciated inside it.
 */

// eslint-disable-next-line import/no-extraneous-dependencies, import/first








/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0_koa_compose___default()([
// Enable Hot Reload when vitamin devServer url differs from app url (externalUrl)
true && ((ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    return next();
}), __WEBPACK_IMPORTED_MODULE_2_koa_conditional_get___default()(), __WEBPACK_IMPORTED_MODULE_1_koa_etag___default()(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__middlewares_errorHandler__["a" /* default */])(), ...__WEBPACK_IMPORTED_MODULE_4__app_modules_server_middlewares___["a" /* default */], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__middlewares_staticAssetsServer__["a" /* default */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__middlewares_store__["a" /* default */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__middlewares_initActionDispatcher__["a" /* default */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__middlewares_router__["a" /* default */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__middlewares_renderer__["a" /* default */])()].filter(Boolean)));

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/App.jsx":
/* exports provided: default */
/* exports used: default */
/*!***************************************************!*\
  !*** ./~/vitaminjs/src/server/components/App.jsx ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_string_escape__ = __webpack_require__(/*! js-string-escape */ 27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_string_escape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_js_string_escape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(/*! react-router */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet__ = __webpack_require__(/*! react-helmet */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_modules_redux_stateSerializer___ = __webpack_require__(/*! __app_modules__redux_stateSerializer__ */ "./node_modules/vitaminjs/src/shared/defaultStateSerializer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_components_App__ = __webpack_require__(/*! ../../shared/components/App */ "./node_modules/vitaminjs/src/shared/components/App.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config__ = __webpack_require__(/*! ../../../config */ "./node_modules/vitaminjs/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__config__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/App.jsx',
    _this = this;






// eslint-disable-next-line import/no-extraneous-dependencies





const propTypes = {
    store: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
        getState: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired,
        dispatch: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired
    }).isRequired,
    insertCss: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired,
    renderProps: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].objectOf(__WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].any).isRequired,
    mainEntry: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired
};

const App = ({ store, insertCss, renderProps, mainEntry }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_5__shared_components_App__["a" /* default */],
    { store: store, insertCss: insertCss, __source: {
            fileName: _jsxFileName,
            lineNumber: 22
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_helmet___default.a, {
        script: [{ innerHTML: `window.__INITIAL_STATE__ = "${__WEBPACK_IMPORTED_MODULE_1_js_string_escape___default()(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_modules_redux_stateSerializer___["a" /* stringify */])(store.getState()))}"` }, { src: `${__WEBPACK_IMPORTED_MODULE_6__config___default.a.publicPath}/${mainEntry}`, async: true }],
        __source: {
            fileName: _jsxFileName,
            lineNumber: 23
        },
        __self: _this
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["RouterContext"], _extends({}, renderProps, {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 29
        },
        __self: _this
    }))
);
App.propTypes = propTypes;

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/ErrorPage/Error404.jsx":
/* exports provided: default */
/* exports used: default */
/*!******************************************************************!*\
  !*** ./~/vitaminjs/src/server/components/ErrorPage/Error404.jsx ***!
  \******************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pineapple__ = __webpack_require__(/*! ./Pineapple */ "./node_modules/vitaminjs/src/server/components/ErrorPage/Pineapple.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(/*! ./style.css */ "./node_modules/vitaminjs/src/server/components/ErrorPage/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);
var _jsxFileName = '/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/ErrorPage/Error404.jsx',
    _this = this;


/* eslint no-script-url: "off" */




const Error404 = () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 7
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.pineapple, __source: {
                fileName: _jsxFileName,
                lineNumber: 8
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 9
                },
                __self: _this
            },
            '4'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Pineapple__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 10
            },
            __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 11
                },
                __self: _this
            },
            '4'
        )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h1',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 13
            },
            __self: _this
        },
        'Not Found'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h2',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 14
            },
            __self: _this
        },
        'We can\'t seem to find the page you asked'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 15
            },
            __self: _this
        },
        'Maybe the resource you were looking for have been moved, or deleted. Maybe it has never existed. Anyway, you can always ',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: 'javascript:history.back()', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 18
                },
                __self: _this
            },
            'go back'
        ),
        ' where you came from.'
    )
);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a)(Error404));

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/ErrorPage/Error500.jsx":
/* exports provided: default */
/* exports used: default */
/*!******************************************************************!*\
  !*** ./~/vitaminjs/src/server/components/ErrorPage/Error500.jsx ***!
  \******************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pineapple__ = __webpack_require__(/*! ./Pineapple */ "./node_modules/vitaminjs/src/server/components/ErrorPage/Pineapple.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(/*! ./style.css */ "./node_modules/vitaminjs/src/server/components/ErrorPage/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);
var _jsxFileName = '/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/ErrorPage/Error500.jsx',
    _this = this;






const Error500 = () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 6
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.pineapple, __source: {
                fileName: _jsxFileName,
                lineNumber: 7
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 8
                },
                __self: _this
            },
            '5'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Pineapple__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 9
            },
            __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Pineapple__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 10
            },
            __self: _this
        })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h1',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 12
            },
            __self: _this
        },
        ' Woops... '
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h2',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 13
            },
            __self: _this
        },
        ' Looks like something went wrong! '
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 14
            },
            __self: _this
        },
        'Those error are usually tracked, but if the problem persists feel free to contact us. In the meantime, try refreshing.'
    )
);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a)(Error500));

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/ErrorPage/Pineapple.jsx":
/* exports provided: default */
/* exports used: default */
/*!*******************************************************************!*\
  !*** ./~/vitaminjs/src/server/components/ErrorPage/Pineapple.jsx ***!
  \*******************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/ErrorPage/Pineapple.jsx",
    _this = this;


/* eslint max-len: "off" */

// Pineapple with love from http://emojione.com/

/* harmony default export */ __webpack_exports__["a"] = (function pineapple() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "svg",
        { viewBox: "0 0 64 64", enableBackground: "new 0 0 64 64", __source: {
                fileName: _jsxFileName,
                lineNumber: 6
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { fill: "#64892f", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 7
                },
                __self: _this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m16.935 11.238c4.893 4.894 5.663 8.215 4.092 9.788-1.573 1.572-4.894.802-9.787-4.092-4.895-4.895-7.936-13.632-7.936-13.632s8.736 3.041 13.631 7.936", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 8
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m23.71 14.12c2.924 6.273 2.512 9.657.496 10.597-2.02.94-4.872-.919-7.796-7.193-2.927-6.272-2.795-15.522-2.795-15.522s7.169 5.845 10.1 12.12", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 9
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m29.632 21.245c-2.881 6.294-5.724 8.173-7.746 7.249-2.02-.925-2.458-4.306.422-10.6 2.88-6.294 10.01-12.191 10.01-12.191s.197 9.248-2.683 15.542", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 10
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m26.912 17.956c-.398 6.91-2.365 9.694-4.587 9.565-2.22-.128-3.853-3.12-3.453-10.03.399-6.911 4.899-14.992 4.899-14.992s3.542 8.546 3.141 15.457", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 11
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m33.2 23.979c-4.449 5.302-7.689 6.358-9.394 4.93-1.703-1.429-1.226-4.805 3.224-10.11s12.888-9.09 12.888-9.09-2.268 8.968-6.718 14.27", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 12
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m14.12 23.708c6.273 2.926 9.656 2.514 10.595.498.941-2.02-.918-4.872-7.19-7.797-6.274-2.926-15.524-2.795-15.524-2.795s5.847 7.169 12.12 10.09", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 13
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m21.245 29.631c6.294-2.88 8.174-5.724 7.248-7.746-.924-2.02-4.307-2.457-10.6.423-6.293 2.88-12.189 10.01-12.189 10.01s9.247.196 15.541-2.685", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 14
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m17.957 26.912c6.909-.398 9.693-2.366 9.564-4.587-.128-2.219-3.119-3.853-10.03-3.454s-14.991 4.9-14.991 4.9 8.546 3.541 15.457 3.141", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 15
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m23.98 33.2c5.302-4.448 6.358-7.689 4.929-9.393-1.429-1.704-4.805-1.225-10.11 3.224-5.303 4.449-9.09 12.888-9.09 12.888s8.969-2.269 14.271-6.719", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                },
                __self: _this
            })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { fill: "#b46137", d: "m55.909 31.2c7.997 7.997 5.762 16.826-1.062 23.649-6.823 6.824-15.653 9.06-23.648 1.063-7.997-7.997-14.739-25.803-7.916-32.627 6.824-6.824 24.63-.082 32.626 7.915", __source: {
                fileName: _jsxFileName,
                lineNumber: 18
            },
            __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { fill: "#e7a74f", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                },
                __self: _this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m47.05 47.05c-.973.973-2.11 4.344-1.207 5.248.906.904 4.276-.233 5.25-1.207.972-.973 2.11-4.344 1.206-5.248s-4.277.234-5.249 1.207", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 20
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m52.873 52.873c-.973.974-1.821 4.635-.916 5.539.904.904 7.359-5.552 6.455-6.455-.904-.905-4.566-.057-5.539.916", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 21
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m34.833 34.832c-.974.973-2.11 4.344-1.208 5.248.905.904 4.275-.233 5.249-1.206.973-.974 2.111-4.345 1.207-5.249s-4.276.234-5.248 1.207", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 22
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m40.941 40.941c-.973.973-2.111 4.344-1.207 5.248s4.276-.234 5.249-1.207 2.111-4.344 1.207-5.248-4.276.234-5.249 1.207", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 23
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m28.975 28.973c-.973.973-2.11 4.345-1.207 5.249s4.275-.233 5.249-1.206c.972-.973 2.11-4.346 1.206-5.25s-4.277.234-5.248 1.207", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 24
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m29.13 52c-1.383 1.383-1.01 5.797 3.589 6.958 1.219.308 3.497-7.446 2.593-8.351-1.676-1.675-5.292.502-6.182 1.393", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 25
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m36.449 57.65c-3.495 3.496 2.351 5.733 4.706 3.377.891-.889 1.17-3.402.266-4.307-.903-.904-4.081.041-4.972.93", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 26
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m38.15 48.996c-.973.973-2.101 5.096-1.196 6s5.218-.031 6.191-1c.973-.973 1.526-4.82.622-5.725-.904-.903-4.645-.244-5.617.729", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 27
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m44.34 55.19c-.973.974-1.764 4.691-.859 5.596 1.676 1.678 4.855.346 5.827-.627.973-.973 1.532-4.924.628-5.828-.904-.905-4.622-.114-5.596.859", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 28
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m32.21 43.06c-.974.973-2.355 4.841-1.451 5.745.903.904 5.111-.139 6.083-1.111.973-.973 1.772-4.686.868-5.59-.904-.904-4.527-.017-5.5.956", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 29
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m20.572 31.27c-.972.973-1.421 3.656-.519 4.561.904.904 3.589.454 4.561-.519.973-.974 2.111-4.345 1.207-5.249s-4.275.234-5.249 1.207", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 30
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m20.638 38.05c-.889.89.761 6.509 1.65 5.618.89-.889 2.447-4.68 1.543-5.584s-2.304-.924-3.193-.034", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 31
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m24.321 45.34c-1.161 1.16-1.399 6.221 1.848 6.666 1.247.171 4.154-6.388 3.25-7.292-.904-.905-4.208-.265-5.098.626", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 32
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m26.24 37.09c-.973.973-1.835 4.73-.931 5.636.903.904 4.772.152 5.746-.821.972-.973 1.614-4.731.71-5.636s-4.551-.153-5.525.821", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 33
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m52.01 29.13c1.383-1.383 5.796-1.01 6.957 3.588.309 1.22-7.447 3.498-8.351 2.594-1.675-1.678.502-5.292 1.394-6.182", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 34
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m57.65 36.449c3.495-3.496 5.733 2.35 3.378 4.707-.891.889-3.404 1.169-4.307.266-.905-.905.041-4.083.929-4.973", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 35
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m48.996 38.15c.973-.973 5.097-2.101 6-1.196s-.032 5.218-1.01 6.192c-.973.973-4.819 1.525-5.724.621-.903-.904-.244-4.644.729-5.617", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 36
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m55.19 44.34c.973-.973 4.689-1.764 5.595-.859 1.677 1.677.346 4.855-.627 5.828s-4.923 1.532-5.827.628c-.905-.904-.115-4.623.859-5.597", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 37
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m43.06 32.21c.973-.974 4.841-2.356 5.744-1.451.904.904-.138 5.112-1.111 6.085s-4.685 1.771-5.588.866c-.905-.903-.018-4.527.955-5.5", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 38
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m31.27 20.572c.973-.973 3.656-1.423 4.561-.519s.454 3.588-.519 4.561c-.974.973-4.344 2.111-5.249 1.207-.905-.904.234-4.277 1.207-5.249", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 39
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m38.06 20.637c.888-.889 6.508.761 5.617 1.651-.889.889-4.68 2.447-5.584 1.542s-.924-2.303-.033-3.193", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 40
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m45.34 24.32c1.163-1.161 6.223-1.399 6.667 1.848.172 1.246-6.388 4.154-7.291 3.25-.906-.904-.265-4.208.624-5.098", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 41
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m37.09 26.24c.973-.973 4.73-1.836 5.635-.932s.153 4.773-.82 5.747c-.973.972-4.732 1.614-5.636.71-.905-.905-.153-4.552.821-5.525", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 42
                },
                __self: _this
            })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { fill: "#84b234", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 44
                },
                __self: _this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m21.91 18.431c3.731 3.732 4.512 6.07 3.551 7.03-.96.96-3.298.179-7.03-3.552s-6.482-9.96-6.482-9.96 6.228 2.749 9.96 6.481", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 45
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m25.719 31.508c3.302-2.652 3.783-4.798 2.672-6.076-1.11-1.278-3.392-1.206-6.695 1.447-3.302 2.652-5.267 8.159-5.267 8.159s5.986-.878 9.29-3.53", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 46
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m21.385 24.16c4.657-.046 6.887 1.182 7.234 2.717.351 1.536-1.313 2.8-5.968 2.846-4.657.044-10.892-2.684-10.892-2.684s4.97-2.835 9.626-2.879", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 47
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m20.91 20.394c4.774 1.292 6.702 3.03 6.62 4.51-.081 1.479-2.145 2.14-6.919.848-4.773-1.293-10.368-5.526-10.368-5.526s5.893-1.124 10.667.168", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 48
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m31.509 25.717c-2.652 3.303-4.799 3.783-6.075 2.673-1.279-1.111-1.206-3.393 1.445-6.696 2.653-3.303 8.159-5.266 8.159-5.266s-.877 5.987-3.529 9.289", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 49
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m24.16 21.385c-.046 4.656 1.182 6.885 2.718 7.234 1.535.35 2.801-1.313 2.846-5.969.044-4.657-2.684-10.892-2.684-10.892s-2.835 4.971-2.88 9.627", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 50
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m20.396 20.909c1.291 4.775 3.03 6.703 4.51 6.621 1.479-.083 2.139-2.145.848-6.919-1.295-4.775-5.527-10.37-5.527-10.37s-1.123 5.894.169 10.668", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 51
                },
                __self: _this
            })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { fill: "#8cc63e", d: "m29.788 22.538c-1.119-2.154-3.348-3.82-3.348-3.82s-.758 1.684-1.186 3.634c-2.123-.919-5.643-2.74-5.643-2.74s1.82 3.521 2.741 5.643c-1.951.428-3.634 1.185-3.634 1.185s1.666 2.228 3.819 3.347c-1.649 2.323-2.462 5.478-2.462 5.478s6.226-1.841 9.785-5.402c3.562-3.562 5.403-9.787 5.403-9.787s-3.152.813-5.475 2.462", __source: {
                fileName: _jsxFileName,
                lineNumber: 53
            },
            __self: _this
        })
    );
});

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/ErrorPage/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!***************************************************************!*\
  !*** ./~/vitaminjs/src/server/components/ErrorPage/index.jsx ***!
  \***************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_helmet__ = __webpack_require__(/*! react-helmet */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(/*! ./style.css */ "./node_modules/vitaminjs/src/server/components/ErrorPage/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Error404__ = __webpack_require__(/*! ./Error404 */ "./node_modules/vitaminjs/src/server/components/ErrorPage/Error404.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Error500__ = __webpack_require__(/*! ./Error500 */ "./node_modules/vitaminjs/src/server/components/ErrorPage/Error500.jsx");
var _jsxFileName = '/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/ErrorPage/index.jsx',
    _this = this;









const propTypes = {
    HTTPStatus: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    // eslint-disable-next-line react/require-default-props
    error: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
        name: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired,
        message: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired,
        stack: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired
    })
};

const ErrorPage = ({ HTTPStatus, error }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.page, __source: {
            fileName: _jsxFileName,
            lineNumber: 20
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_helmet___default.a, {
        link: [{
            href: 'https://fonts.googleapis.com/css?family=Roboto:400,700',
            rel: 'stylesheet',
            type: 'text/css'
        }, {
            href: 'https://fonts.googleapis.com/css?family=Roboto+Mono',
            rel: 'stylesheet',
            type: 'text/css'
        }],
        meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        title: `${HTTPStatus} - VitaminJS`,
        __source: {
            fileName: _jsxFileName,
            lineNumber: 21
        },
        __self: _this
    }),
    error ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a['stack-container'], __source: {
                fileName: _jsxFileName,
                lineNumber: 39
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h3',
            { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a['error-details'], __source: {
                    fileName: _jsxFileName,
                    lineNumber: 40
                },
                __self: _this
            },
            error.name,
            ': ',
            error.message
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'pre',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 43
                },
                __self: _this
            },
            ' ',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'code',
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 43
                    },
                    __self: _this
                },
                ' ',
                error.stack,
                ' '
            ),
            ' '
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'small',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 44
                },
                __self: _this
            },
            'Note: the stack trace is not available in production. You can customize this page in the config.'
        )
    ) : null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.container, __source: {
                fileName: _jsxFileName,
                lineNumber: 51
            },
            __self: _this
        },
        HTTPStatus === 404 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Error404__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 53
            },
            __self: _this
        }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Error500__["a" /* default */], { HTTPStatus: HTTPStatus, error: error, __source: {
                fileName: _jsxFileName,
                lineNumber: 55
            },
            __self: _this
        })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'footer',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 58
            },
            __self: _this
        },
        ' Powered by ',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: 'https://github.com/Evaneos/vitaminjs', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 58
                },
                __self: _this
            },
            ' VitaminJS'
        ),
        ' '
    )
);

ErrorPage.propTypes = propTypes;

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a)(ErrorPage));

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/ErrorPage/style.css":
/* no static exports found */
/* exports used: default */
/*!***************************************************************!*\
  !*** ./~/vitaminjs/src/server/components/ErrorPage/style.css ***!
  \***************************************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../../css-loader??ref--1-1!../../../../../postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./node_modules/vitaminjs/src/server/components/ErrorPage/style.css");
    var insertCss = __webpack_require__(/*! ../../../../../isomorphic-style-loader/lib/insertCss.js */ "./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(/*! !../../../../../css-loader??ref--1-1!../../../../../postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./node_modules/vitaminjs/src/server/components/ErrorPage/style.css", function() {
        content = __webpack_require__(/*! !../../../../../css-loader??ref--1-1!../../../../../postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./node_modules/vitaminjs/src/server/components/ErrorPage/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/components/HTMLLayout.jsx":
/* exports provided: default */
/* exports used: default */
/*!**********************************************************!*\
  !*** ./~/vitaminjs/src/server/components/HTMLLayout.jsx ***!
  \**********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/HTMLLayout.jsx',
    _this = this;


/* eslint react/no-danger: 0 */



const HelmetHeadPropTypes = __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
    toComponent: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired
}).isRequired;

const propTypes = {
    head: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
        title: HelmetHeadPropTypes,
        meta: HelmetHeadPropTypes,
        link: HelmetHeadPropTypes,
        base: HelmetHeadPropTypes,
        script: HelmetHeadPropTypes,
        htmlAttributes: HelmetHeadPropTypes
    }).isRequired,
    style: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].node.isRequired
};

const HTMLLayout = ({ head, style, children }) =>
// eslint-disable-next-line jsx-a11y/html-has-lang
__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'html',
    _extends({}, head.htmlAttributes.toComponent(), {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 24
        },
        __self: _this
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'head',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 25
            },
            __self: _this
        },
        head.title.toComponent(),
        head.meta.toComponent(),
        head.link.toComponent(),
        head.base.toComponent(),
        head.script.toComponent(),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style', { dangerouslySetInnerHTML: { __html: style }, __source: {
                fileName: _jsxFileName,
                lineNumber: 31
            },
            __self: _this
        })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'body',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 33
            },
            __self: _this
        },
        children
    )
);

HTMLLayout.doctype = '<!doctype html>';
HTMLLayout.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["a"] = (HTMLLayout);

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/middlewares/errorHandler.jsx":
/* exports provided: default */
/* exports used: default */
/*!*************************************************************!*\
  !*** ./~/vitaminjs/src/server/middlewares/errorHandler.jsx ***!
  \*************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server__ = __webpack_require__(/*! react-dom/server */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(/*! react-helmet */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk__ = __webpack_require__(/*! chalk */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_modules_server_onError___ = __webpack_require__(/*! __app_modules__server_onError__ */ "./node_modules/vitaminjs/config/utils/defaultFunction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_modules_server_ErrorPage___ = __webpack_require__(/*! __app_modules__server_ErrorPage__ */ "./node_modules/vitaminjs/src/server/components/ErrorPage/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_components_CSSProvider__ = __webpack_require__(/*! ../../shared/components/CSSProvider */ "./node_modules/vitaminjs/src/shared/components/CSSProvider.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__render__ = __webpack_require__(/*! ../render */ "./node_modules/vitaminjs/src/server/render.jsx");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/middlewares/errorHandler.jsx',
    _this = this;



function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





/* eslint-disable import/no-extraneous-dependencies */


/* eslint-enable import/no-extraneous-dependencies */




const renderRawError = (status, renderingError) => `
            <h2> Error while rendering the ${status} error page.</h2>
            <p>You might want to check your ErrorPage component</p>
            <strong>${renderingError.name}: ${renderingError.message}</strong>
            <pre><code>${renderingError.stack}</pre></code>
            <hr>
        `;

const renderErrorPage = props => {
    const css = [];


    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__render__["b" /* renderLayout */])({
        appHTMLString: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_6__shared_components_CSSProvider__["a" /* default */],
            { insertCss: styles => css.push(styles._getCss()), __source: {
                    fileName: _jsxFileName,
                    lineNumber: 31
                },
                __self: _this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__app_modules_server_ErrorPage___["a" /* default */], _extends({}, props, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 32
                },
                __self: _this
            }))
        )),
        style: css.join(''),
        head: __WEBPACK_IMPORTED_MODULE_2_react_helmet___default.a.rewind()
    });
};

const onError = errorContext => {
    /* eslint-disable no-console */
    console.error(__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.red(`Error ${errorContext.HTTPStatus}:`), `${errorContext.request.method} ${errorContext.request.url}`);
    if (errorContext.HTTPStatus === 500) {
        console.error(__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.red.bold(errorContext.error.message));
        console.error(__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.grey(errorContext.error.stack));
    }
    try {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_modules_server_onError___["a" /* default */])(errorContext);
    } catch (err) {
        console.error(__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.red('An error occured while calling the onError function'));
        console.error(err);
    }
    /* eslint-enable no-console */
};

const errorToErrorContext = (ctx, error) => _extends({}, error ? { error } : {}, ctx.state.store ? { state: ctx.state.store.getState() } : {}, {
    HTTPStatus: ctx.status,
    request: ctx.request
});

const renderError = (ctx, error) => {
    try {
        const errorContext = errorToErrorContext(ctx, error);
        ctx.body = renderErrorPage(errorContext);
        onError(errorContext);
    } catch (renderingError) {
        ctx.body = renderRawError(ctx.status, renderingError);
        onError(errorToErrorContext(ctx, renderingError));
    }
    ctx.type = 'html';
};

/* harmony default export */ __webpack_exports__["a"] = (function errorHandler() {
    return (() => {
        var _ref = _asyncToGenerator(function* (ctx, next) {
            try {
                yield next();
            } catch (error) {
                ctx.status = 500;
                renderError(ctx, error);
            }

            if (ctx.status === 404) {
                if (ctx.state.store) {
                    renderError(ctx);
                } else {
                    // If there is no store, it means that it is a middleware that put a 404, we don't
                    // print a vitaminjs 404
                    onError(errorToErrorContext(ctx));
                }
            }
        });

        return function () {
            return _ref.apply(this, arguments);
        };
    })();
});

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/middlewares/initActionDispatcher.js":
/* exports provided: default */
/* exports used: default */
/*!********************************************************************!*\
  !*** ./~/vitaminjs/src/server/middlewares/initActionDispatcher.js ***!
  \********************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_modules_server_createInitAction___ = __webpack_require__(/*! __app_modules__server_createInitAction__ */ "./node_modules/vitaminjs/config/utils/defaultFunction.js");
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// eslint-disable-next-line import/no-extraneous-dependencies


/* harmony default export */ __webpack_exports__["a"] = (function initActionDispatcher() {
    return (() => {
        var _ref = _asyncToGenerator(function* (ctx, next) {
            const { dispatch } = ctx.state.store;
            const action = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__app_modules_server_createInitAction___["a" /* default */])(ctx.request);
            if (action) {
                yield dispatch(action);
            }
            yield next();
        });

        return function () {
            return _ref.apply(this, arguments);
        };
    })();
});

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/middlewares/renderer.js":
/* exports provided: default */
/* exports used: default */
/*!********************************************************!*\
  !*** ./~/vitaminjs/src/server/middlewares/renderer.js ***!
  \********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render__ = __webpack_require__(/*! ../render */ "./node_modules/vitaminjs/src/server/render.jsx");
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* global ASSETS_BY_CHUNK_NAME */


/* harmony default export */ __webpack_exports__["a"] = (function renderer() {
    return (() => {
        var _ref = _asyncToGenerator(function* (ctx) {
            const { renderProps, store } = ctx.state;
            let mainEntry = (undefined || ctx.res.locals.webpackStats.toJson().assetsByChunkName).main;
            mainEntry = Array.isArray(mainEntry) ? mainEntry[0] : mainEntry;
            ctx.body = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__render__["a" /* default */])(renderProps, store, mainEntry);
        });

        return function () {
            return _ref.apply(this, arguments);
        };
    })();
});

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/middlewares/router.js":
/* exports provided: default */
/* exports used: default */
/*!******************************************************!*\
  !*** ./~/vitaminjs/src/server/middlewares/router.js ***!
  \******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(/*! react-router */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_modules_routes___ = __webpack_require__(/*! __app_modules__routes__ */ "./src/routes.js");
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }


// eslint-disable-next-line import/no-extraneous-dependencies


const routesWithStore = typeof __WEBPACK_IMPORTED_MODULE_1__app_modules_routes___["a" /* default */] === 'function' ? store => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__app_modules_routes___["a" /* default */])(store) : () => __WEBPACK_IMPORTED_MODULE_1__app_modules_routes___["a" /* default */];

/* harmony default export */ __webpack_exports__["a"] = (function router() {
    return (() => {
        var _ref = _asyncToGenerator(function* (ctx, next) {
            const url = ctx.req.url;
            const history = ctx.state.history;

            const appRoutes = yield routesWithStore(ctx.state.store);

            yield new Promise(function (resolve, reject) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_router__["match"])({ routes: appRoutes, location: url, history }, function (error, redirectLocation, renderProps) {
                    if (error) {
                        reject(error);
                    } else if (redirectLocation) {
                        ctx.redirect((redirectLocation.basename || '') + redirectLocation.pathname + redirectLocation.search);
                    } else if (renderProps) {
                        ctx.status = 200;
                        ctx.state.renderProps = renderProps;
                    } else {
                        ctx.status = 404;
                        ctx.body = 'Not found';
                    }
                    resolve();
                });
            });

            if (ctx.status === 200) {
                yield next();
            }
        });

        return function () {
            return _ref.apply(this, arguments);
        };
    })();
});

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/middlewares/staticAssetsServer.js":
/* exports provided: default */
/* exports used: default */
/*!******************************************************************!*\
  !*** ./~/vitaminjs/src/server/middlewares/staticAssetsServer.js ***!
  \******************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url__ = __webpack_require__(/*! url */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static__ = __webpack_require__(/*! koa-static */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_static__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_mount__ = __webpack_require__(/*! koa-mount */ 32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_mount___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_mount__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(/*! ../../../config */ "./node_modules/vitaminjs/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);





// examples
// basePath: / or /app
// publicPath: / or [/app]/public-path or http://localhost:3000[/app]/public-path
// parsedPath: / or [/app]/public-path or [/app]/public-path
// mountPath : / or /public-path

const parsedPath = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_url__["parse"])(__WEBPACK_IMPORTED_MODULE_3__config___default.a.publicPath).pathname || '';
const mountPath = parsedPath.substr(__WEBPACK_IMPORTED_MODULE_3__config___default.a.basePath.replace(/\/+$/, '').length);

const servePublic = __WEBPACK_IMPORTED_MODULE_1_koa_static___default()(__WEBPACK_IMPORTED_MODULE_3__config___default.a.client.buildPath);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_3__config___default.a.servePublic ? () => mountPath.length ? __WEBPACK_IMPORTED_MODULE_2_koa_mount___default()(mountPath, servePublic) : servePublic : () => null);

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/middlewares/store.js":
/* exports provided: default */
/* exports used: default */
/*!*****************************************************!*\
  !*** ./~/vitaminjs/src/server/middlewares/store.js ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(/*! react-router */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_modules_redux_middlewares___ = __webpack_require__(/*! __app_modules__redux_middlewares__ */ "./node_modules/vitaminjs/config/utils/emptyArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_store__ = __webpack_require__(/*! ../../shared/store */ "./node_modules/vitaminjs/src/shared/store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(/*! ../../../config */ "./node_modules/vitaminjs/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);


/* eslint-disable import/no-extraneous-dependencies */

// used require instead of import, because optional default with import cause warnings
const reducers = __webpack_require__(/*! __app_modules__redux_reducers__ */ "./node_modules/vitaminjs/config/utils/emptyObject.js");
/* eslint-enable import/no-extraneous-dependencies */

/* eslint-disable import/first */


/* eslint-enable import/first */

/* harmony default export */ __webpack_exports__["a"] = (function store() {
    return (ctx, next) => {
        const history = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_router__["createMemoryHistory"])({
            basename: __WEBPACK_IMPORTED_MODULE_3__config___default.a.basePath,
            entries: [ctx.req.url]
        });
        ctx.state.history = history;
        ctx.state.store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__shared_store__["a" /* create */])(history, reducers.default || reducers, __WEBPACK_IMPORTED_MODULE_1__app_modules_redux_middlewares___["a" /* default */]);
        return next();
    };
});

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/render.jsx":
/* exports provided: renderLayout, default */
/* exports used: default, renderLayout */
/*!*******************************************!*\
  !*** ./~/vitaminjs/src/server/render.jsx ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return renderLayout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server__ = __webpack_require__(/*! react-dom/server */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(/*! react-helmet */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_resolver__ = __webpack_require__(/*! react-resolver */ 44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_resolver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_resolver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_modules_server_layout___ = __webpack_require__(/*! __app_modules__server_layout__ */ "./node_modules/vitaminjs/src/server/components/HTMLLayout.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(/*! ../../config */ "./node_modules/vitaminjs/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_App__ = __webpack_require__(/*! ./components/App */ "./node_modules/vitaminjs/src/server/components/App.jsx");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/render.jsx',
    _this = this;



function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




// eslint-disable-next-line import/no-extraneous-dependencies





/* eslint-disable react/no-danger */
const renderLayout = (_ref) => {
    let { appHTMLString } = _ref,
        props = _objectWithoutProperties(_ref, ['appHTMLString']);

    return `${__WEBPACK_IMPORTED_MODULE_4__app_modules_server_layout___["a" /* default */].doctype ? `${__WEBPACK_IMPORTED_MODULE_4__app_modules_server_layout___["a" /* default */].doctype}\n` : ''}${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__["renderToStaticMarkup"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4__app_modules_server_layout___["a" /* default */],
        _extends({}, props, {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 14
            },
            __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { id: __WEBPACK_IMPORTED_MODULE_5__config___default.a.rootElementId, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 15
                },
                __self: _this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { dangerouslySetInnerHTML: { __html: appHTMLString }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                },
                __self: _this
            })
        )
    ))}`;
};

// Return a promise that resolves to the HTML string

/* harmony default export */ __webpack_exports__["a"] = (function render(renderProps, store, mainEntry) {
    const css = [];
    const insertCss = styles => css.push(styles._getCss());
    return __WEBPACK_IMPORTED_MODULE_3_react_resolver__["Resolver"].resolve(() => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_App__["a" /* default */], _extends({ renderProps, store, mainEntry, insertCss }, {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 27
        },
        __self: _this
    }))).then(({ Resolved, data }) => renderLayout({
        appHTMLString: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 30
                },
                __self: _this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_helmet___default.a, {
                script: [{ innerHTML: `window.__REACT_RESOLVER_PAYLOAD__ = ${JSON.stringify(data)};` }],
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 31
                },
                __self: _this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Resolved, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 34
                },
                __self: _this
            })
        )),
        style: css.join(''),
        head: __WEBPACK_IMPORTED_MODULE_2_react_helmet___default.a.rewind()
    }));
});

/***/ }),

/***/ "./node_modules/vitaminjs/src/server/server.js":
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/vitaminjs/src/server/server.js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url__ = __webpack_require__(/*! url */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(/*! koa */ 28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__(/*! express */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk__ = __webpack_require__(/*! chalk */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch__ = __webpack_require__(/*! node-fetch */ 35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_readline__ = __webpack_require__(/*! readline */ 46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_readline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_readline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_http_graceful_shutdown__ = __webpack_require__(/*! http-graceful-shutdown */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_http_graceful_shutdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_http_graceful_shutdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__appMiddleware__ = __webpack_require__(/*! ./appMiddleware */ "./node_modules/vitaminjs/src/server/appMiddleware.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config__ = __webpack_require__(/*! ../../config */ "./node_modules/vitaminjs/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__config_build_webpack_config_client__ = __webpack_require__(/*! ../../config/build/webpack.config.client */ "./node_modules/vitaminjs/config/build/webpack.config.client.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint-disable global-require, no-console */













global.fetch = __WEBPACK_IMPORTED_MODULE_4_node_fetch___default.a;

let currentApp = __WEBPACK_IMPORTED_MODULE_7__appMiddleware__["default"];
function appServer() {
    const app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();
    app.use(
    // ecapsulate app for hot reload
    (ctx, next) => currentApp(ctx, next));
    return app.callback();
}

const mountedServer = __WEBPACK_IMPORTED_MODULE_2_express___default()();

if (true) {

    mountedServer.use((() => {
        const app = __WEBPACK_IMPORTED_MODULE_2_express___default()();
        const webpack = __webpack_require__(/*! webpack */ 5);
        const clientBuildConfig = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__config_build_webpack_config_client__["a" /* default */])(_extends({
            hot: true,
            dev: true
        }, __WEBPACK_IMPORTED_MODULE_8__config___default.a));

        const compiler = webpack(clientBuildConfig);
        let clientBuilt = false;
        const parsedPublicPath = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_url__["parse"])(__WEBPACK_IMPORTED_MODULE_8__config___default.a.publicPath).pathname || '';
        app.use(__webpack_require__(/*! webpack-dev-middleware */ 50)(compiler, {
            quiet: true,
            noInfo: true,
            publicPath: parsedPublicPath,
            reporter: stats => {
                if (stats.hasErrors || clientBuilt) {
                    return;
                }
                clientBuilt = true;
                process.stdout.write(`\x1b[0G${__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.green('\u2713')} Client bundle(s) successfully ${__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.bold('built in memory')}\n\n`);
            },
            serverSideRender: true
        }));

        const hmrPath = `${parsedPublicPath}/__webpack_hmr`;
        app.use(__webpack_require__(/*! webpack-hot-middleware */ 51)(compiler, {
            log: () => {},
            path: hmrPath,
            reload: true
        }));

        return app;
    })());
    module.hot.accept(/*! ./appMiddleware */ "./node_modules/vitaminjs/src/server/appMiddleware.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ __WEBPACK_IMPORTED_MODULE_7__appMiddleware__ = __webpack_require__(/*! ./appMiddleware */ "./node_modules/vitaminjs/src/server/appMiddleware.js"); (() => {
        try {
            currentApp = __webpack_require__(/*! ./appMiddleware */ "./node_modules/vitaminjs/src/server/appMiddleware.js").default;
        } catch (e) {
            console.error(e);
        }
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

const { port, host } = __WEBPACK_IMPORTED_MODULE_8__config___default.a.server;
mountedServer.use(__WEBPACK_IMPORTED_MODULE_8__config___default.a.basePath, appServer());

const server = mountedServer.listen(process.env.PORT || port, process.env.HOST || host, () => {
    __WEBPACK_IMPORTED_MODULE_5_readline___default.a.clearLine(process.stdout);
    __WEBPACK_IMPORTED_MODULE_5_readline___default.a.cursorTo(0, process.stdout);
    process.stdout.write(`\x1b[0G${__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.green('\u2713')} Server listening on: ${__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.bold.underline(`http://${host}:${port}${__WEBPACK_IMPORTED_MODULE_8__config___default.a.basePath}`)}\n`);
    if (true) {
        console.log(`${__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.green('\u2713')} ${__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.bold('Hot module reload')} activated`);
        process.stdout.write(`\x1b[0G${__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.blue('\uD83D\uDD50  Building client bundle [in memory]...')}`);
    }
});

__WEBPACK_IMPORTED_MODULE_6_http_graceful_shutdown___default()(server, {
    signals: 'SIGINT SIGTERM SIGQUIT',
    timeout: 15000,
    development: true,
    callback: () => {}
});

/***/ }),

/***/ "./node_modules/vitaminjs/src/shared/components/App.jsx":
/* exports provided: default */
/* exports used: default */
/*!***************************************************!*\
  !*** ./~/vitaminjs/src/shared/components/App.jsx ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ 43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CSSProvider__ = __webpack_require__(/*! ./CSSProvider */ "./node_modules/vitaminjs/src/shared/components/CSSProvider.js");
var _jsxFileName = '/home/johan/Project/Vagalam/node_modules/vitaminjs/src/shared/components/App.jsx',
    _this = this;






const propTypes = {
    store: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
    insertCss: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].node.isRequired
};

const App = ({ store, insertCss, children }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2__CSSProvider__["a" /* default */],
    { insertCss: insertCss, __source: {
            fileName: _jsxFileName,
            lineNumber: 12
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_redux__["Provider"],
        { store: store, __source: {
                fileName: _jsxFileName,
                lineNumber: 13
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 14
                },
                __self: _this
            },
            ' ',
            children,
            ' '
        )
    )
);
App.propTypes = propTypes;

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),

/***/ "./node_modules/vitaminjs/src/shared/components/CSSProvider.js":
/* exports provided: default */
/* exports used: default */
/*!**********************************************************!*\
  !*** ./~/vitaminjs/src/shared/components/CSSProvider.js ***!
  \**********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


class CSSProvider extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

    getChildContext() {
        return {
            insertCss: this.props.insertCss
        };
    }

    render() {
        return this.props.children;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CSSProvider;

CSSProvider.propTypes = {
    insertCss: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].element.isRequired
};
CSSProvider.childContextTypes = {
    insertCss: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired
};

/***/ }),

/***/ "./node_modules/vitaminjs/src/shared/defaultStateSerializer.js":
/* exports provided: stringify, parse */
/* exports used: stringify */
/*!**********************************************************!*\
  !*** ./~/vitaminjs/src/shared/defaultStateSerializer.js ***!
  \**********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const stringify = JSON.stringify;
/* harmony export (immutable) */ __webpack_exports__["a"] = stringify;

const parse = JSON.parse;
/* unused harmony export parse */


/***/ }),

/***/ "./node_modules/vitaminjs/src/shared/devTools.js":
/* exports provided: default */
/* exports used: default */
/*!********************************************!*\
  !*** ./~/vitaminjs/src/shared/devTools.js ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const storeEnhancers = [];

if (typeof window !== 'undefined' && typeof window.devToolsExtension !== 'undefined') {
    storeEnhancers.push(window.devToolsExtension());
}


/* harmony default export */ __webpack_exports__["a"] = (storeEnhancers);

/***/ }),

/***/ "./node_modules/vitaminjs/src/shared/index.js":
/* exports provided: withStyles */
/* exports used: withStyles */
/*!*****************************************!*\
  !*** ./~/vitaminjs/src/shared/index.js ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles___default.a; });



/***/ }),

/***/ "./node_modules/vitaminjs/src/shared/store.js":
/* exports provided: createRootReducer, create */
/* exports used: create */
/*!*****************************************!*\
  !*** ./~/vitaminjs/src/shared/store.js ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createRootReducer */
/* harmony export (immutable) */ __webpack_exports__["a"] = create;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(/*! redux */ 47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux__ = __webpack_require__(/*! react-router-redux */ 45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk__ = __webpack_require__(/*! redux-thunk */ 48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_modules_redux_enhancers___ = __webpack_require__(/*! __app_modules__redux_enhancers__ */ "./node_modules/vitaminjs/config/utils/emptyArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__devTools__ = __webpack_require__(/*! ./devTools */ "./node_modules/vitaminjs/src/shared/devTools.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/* eslint-disable import/no-extraneous-dependencies */



function createRootReducer(reducers) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])(_extends({}, reducers, { routing: __WEBPACK_IMPORTED_MODULE_1_react_router_redux__["routerReducer"] }));
}

function create(history, reducers, middlewares, initialState) {
    const createStoreWithMiddleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(...middlewares, __WEBPACK_IMPORTED_MODULE_2_redux_thunk___default.a, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_router_redux__["routerMiddleware"])(history)), ...__WEBPACK_IMPORTED_MODULE_4__devTools__["a" /* default */], ...__WEBPACK_IMPORTED_MODULE_3__app_modules_redux_enhancers___["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"]);

    const rootReducer = createRootReducer(reducers);
    const store = createStoreWithMiddleware(rootReducer, initialState);

    return store;
}

/***/ }),

/***/ "./src/App.jsx":
/* no static exports found */
/* exports used: default */
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/johan/Project/Vagalam/src/App.jsx'");

/***/ }),

/***/ "./src/Landing/background.jpg":
/* no static exports found */
/* exports used: default */
/*!************************************!*\
  !*** ./src/Landing/background.jpg ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "files/b2e24f6b7884a150397208cb09913252.jpg";

/***/ }),

/***/ "./src/Landing/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!*******************************!*\
  !*** ./src/Landing/index.jsx ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_element_Button__ = __webpack_require__(/*! ../ui-element/Button */ "./src/ui-element/Button/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__background_jpg__ = __webpack_require__(/*! ./background.jpg */ "./src/Landing/background.jpg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__background_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__background_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Landing/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style_css__);
var _jsxFileName = '/home/johan/Project/Vagalam/src/Landing/index.jsx',
    _this = this;










const Landing = () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 10
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'section',
        { style: { backgroundImage: `url(${__WEBPACK_IMPORTED_MODULE_3__background_jpg___default.a})` }, __source: {
                fileName: _jsxFileName,
                lineNumber: 11
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'header',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 12
                },
                __self: _this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'h1',
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 13
                    },
                    __self: _this
                },
                ' \\Vag a lam\\ '
            )
        )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'section',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 16
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2__ui_element_Button__["a" /* default */],
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                },
                __self: _this
            },
            ' D\xE9couvrir mon voyage ! '
        )
    )
);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_4__style_css___default.a)(Landing));

/***/ }),

/***/ "./src/Landing/style.css":
/* no static exports found */
/* exports used: default */
/*!*******************************!*\
  !*** ./src/Landing/style.css ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../~/css-loader??ref--1-1!../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Landing/style.css");
    var insertCss = __webpack_require__(/*! ../../~/isomorphic-style-loader/lib/insertCss.js */ "./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(/*! !../../~/css-loader??ref--1-1!../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Landing/style.css", function() {
        content = __webpack_require__(/*! !../../~/css-loader??ref--1-1!../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Landing/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/routes.js":
/* exports provided: default */
/* exports used: default */
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__ = __webpack_require__(/*! vitaminjs/react-router */ "./node_modules/vitaminjs/react-router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__(/*! ./App */ "./src/App.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Landing__ = __webpack_require__(/*! ./Landing */ "./src/Landing/index.jsx");
var _jsxFileName = '/home/johan/Project/Vagalam/src/routes.js';





/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__["a" /* Route */],
    { component: __WEBPACK_IMPORTED_MODULE_2__App__["default"], __source: {
            fileName: _jsxFileName,
            lineNumber: 6
        },
        __self: this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__["a" /* Route */], { path: '/', component: __WEBPACK_IMPORTED_MODULE_3__Landing__["a" /* default */], __source: {
            fileName: _jsxFileName,
            lineNumber: 7
        },
        __self: this
    })
));

/***/ }),

/***/ "./src/ui-element/Button/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!*****************************************!*\
  !*** ./src/ui-element/Button/index.jsx ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(/*! ./style.css */ "./src/ui-element/Button/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/johan/Project/Vagalam/src/ui-element/Button/index.jsx',
    _this = this;



function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




const Button = (_ref) => {
  let { children } = _ref,
      props = _objectWithoutProperties(_ref, ['children']);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('button', _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    },
    __self: _this
  }));
};
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_2__style_css___default.a)(Button));

/***/ }),

/***/ "./src/ui-element/Button/style.css":
/* no static exports found */
/* exports used: default */
/*!*****************************************!*\
  !*** ./src/ui-element/Button/style.css ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/ui-element/Button/style.css");
    var insertCss = __webpack_require__(/*! ../../../~/isomorphic-style-loader/lib/insertCss.js */ "./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/ui-element/Button/style.css", function() {
        content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/ui-element/Button/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ 0:
/* no static exports found */
/* exports used: default, PropTypes, Component */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 1:
/* no static exports found */
/* exports used: default */
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),

/***/ 10:
/* no static exports found */
/* exports used: default */
/*!************************************************************!*\
  !*** external "babel-plugin-minify-dead-code-elimination" ***!
  \************************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-dead-code-elimination");

/***/ }),

/***/ 11:
/* no static exports found */
/* exports used: default */
/*!**********************************************************!*\
  !*** external "babel-plugin-minify-guarded-expressions" ***!
  \**********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-guarded-expressions");

/***/ }),

/***/ 12:
/* no static exports found */
/* exports used: default */
/*!**********************************************!*\
  !*** external "babel-plugin-minify-replace" ***!
  \**********************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-replace");

/***/ }),

/***/ 13:
/* no static exports found */
/* exports used: default */
/*!*********************************************!*\
  !*** external "babel-plugin-react-require" ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-react-require");

/***/ }),

/***/ 14:
/* no static exports found */
/* exports used: default */
/*!********************************************************************!*\
  !*** external "babel-plugin-transform-export-default-name-forked" ***!
  \********************************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-export-default-name-forked");

/***/ }),

/***/ 15:
/* no static exports found */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "babel-plugin-transform-node-env-inline" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-node-env-inline");

/***/ }),

/***/ 16:
/* no static exports found */
/* exports used: default */
/*!********************************************************!*\
  !*** external "babel-plugin-transform-react-jsx-self" ***!
  \********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-react-jsx-self");

/***/ }),

/***/ 17:
/* no static exports found */
/* exports used: default */
/*!**********************************************************!*\
  !*** external "babel-plugin-transform-react-jsx-source" ***!
  \**********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-react-jsx-source");

/***/ }),

/***/ 18:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "babel-preset-env" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-env");

/***/ }),

/***/ 19:
/* no static exports found */
/* exports used: default */
/*!*************************************!*\
  !*** external "babel-preset-react" ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-react");

/***/ }),

/***/ 2:
/* no static exports found */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "isomorphic-style-loader/lib/withStyles" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),

/***/ 20:
/* no static exports found */
/* exports used: default */
/*!***************************************!*\
  !*** external "babel-preset-stage-1" ***!
  \***************************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-stage-1");

/***/ }),

/***/ 21:
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** external "babel-runtime/core-js/get-iterator" ***!
  \*****************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),

/***/ 22:
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ 23:
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** external "babel-runtime/helpers/slicedToArray" ***!
  \******************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),

/***/ 24:
/* no static exports found */
/* exports used: default */
/*!******************************************************!*\
  !*** external "case-sensitive-paths-webpack-plugin" ***!
  \******************************************************/
/***/ (function(module, exports) {

module.exports = require("case-sensitive-paths-webpack-plugin");

/***/ }),

/***/ 25:
/* no static exports found */
/* exports used: default */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ 26:
/* no static exports found */
/* exports used: default */
/*!*****************************************!*\
  !*** external "http-graceful-shutdown" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("http-graceful-shutdown");

/***/ }),

/***/ 27:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "js-string-escape" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("js-string-escape");

/***/ }),

/***/ 28:
/* no static exports found */
/* exports used: default */
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ 29:
/* no static exports found */
/* exports used: default */
/*!******************************!*\
  !*** external "koa-compose" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("koa-compose");

/***/ }),

/***/ 3:
/* no static exports found */
/* exports used: RouterContext, match, Route, createMemoryHistory */
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ 30:
/* no static exports found */
/* exports used: default */
/*!**************************************!*\
  !*** external "koa-conditional-get" ***!
  \**************************************/
/***/ (function(module, exports) {

module.exports = require("koa-conditional-get");

/***/ }),

/***/ 31:
/* no static exports found */
/* exports used: default */
/*!***************************!*\
  !*** external "koa-etag" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("koa-etag");

/***/ }),

/***/ 32:
/* no static exports found */
/* exports used: default */
/*!****************************!*\
  !*** external "koa-mount" ***!
  \****************************/
/***/ (function(module, exports) {

module.exports = require("koa-mount");

/***/ }),

/***/ 33:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),

/***/ 34:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "lodash.mergewith" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("lodash.mergewith");

/***/ }),

/***/ 35:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ 36:
/* no static exports found */
/* exports used: default */
/*!*******************************************!*\
  !*** external "postcss-browser-reporter" ***!
  \*******************************************/
/***/ (function(module, exports) {

module.exports = require("postcss-browser-reporter");

/***/ }),

/***/ 37:
/* no static exports found */
/* exports used: default */
/*!**********************************!*\
  !*** external "postcss-cssnext" ***!
  \**********************************/
/***/ (function(module, exports) {

module.exports = require("postcss-cssnext");

/***/ }),

/***/ 38:
/* no static exports found */
/* exports used: default */
/*!*********************************!*\
  !*** external "postcss-import" ***!
  \*********************************/
/***/ (function(module, exports) {

module.exports = require("postcss-import");

/***/ }),

/***/ 39:
/* no static exports found */
/* exports used: default */
/*!********************************************!*\
  !*** external "postcss-omit-import-tilde" ***!
  \********************************************/
/***/ (function(module, exports) {

module.exports = require("postcss-omit-import-tilde");

/***/ }),

/***/ 4:
/* no static exports found */
/* exports used: default */
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ 40:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "postcss-reporter" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("postcss-reporter");

/***/ }),

/***/ 41:
/* no static exports found */
/* exports used: default */
/*!******************************!*\
  !*** external "postcss-url" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("postcss-url");

/***/ }),

/***/ 42:
/* no static exports found */
/* exports used: default */
/*!****************************************************************!*\
  !*** external "react-dev-utils/WatchMissingNodeModulesPlugin" ***!
  \****************************************************************/
/***/ (function(module, exports) {

module.exports = require("react-dev-utils/WatchMissingNodeModulesPlugin");

/***/ }),

/***/ 43:
/* no static exports found */
/* exports used: Provider */
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ 44:
/* no static exports found */
/* exports used: Resolver */
/*!*********************************!*\
  !*** external "react-resolver" ***!
  \*********************************/
/***/ (function(module, exports) {

module.exports = require("react-resolver");

/***/ }),

/***/ 45:
/* no static exports found */
/* exports used: routerReducer, routerMiddleware */
/*!*************************************!*\
  !*** external "react-router-redux" ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),

/***/ 46:
/* no static exports found */
/* exports used: default */
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),

/***/ 47:
/* no static exports found */
/* exports used: combineReducers, compose, applyMiddleware, createStore */
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ 48:
/* no static exports found */
/* exports used: default */
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ 49:
/* no static exports found */
/* exports used: default */
/*!***********************************************!*\
  !*** external "serviceworker-webpack-plugin" ***!
  \***********************************************/
/***/ (function(module, exports) {

module.exports = require("serviceworker-webpack-plugin");

/***/ }),

/***/ 5:
/* no static exports found */
/* all exports used */
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),

/***/ 50:
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ 51:
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),

/***/ 52:
/* no static exports found */
/* all exports used */
/*!**********************************************************************************!*\
  !*** multi ./~/vitaminjs/config/utils/hot.js ./~/vitaminjs/src/server/server.js ***!
  \**********************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/hot.js */"./node_modules/vitaminjs/config/utils/hot.js");
module.exports = __webpack_require__(/*! /home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/server.js */"./node_modules/vitaminjs/src/server/server.js");


/***/ }),

/***/ 6:
/* no static exports found */
/* all exports used */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ 7:
/* no static exports found */
/* exports used: renderToStaticMarkup, renderToString */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ 8:
/* no static exports found */
/* exports used: parse */
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ 9:
/* no static exports found */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "babel-plugin-discard-module-references" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-discard-module-references");

/***/ })

/******/ });
//# sourceMappingURL=server_bundle.js.map