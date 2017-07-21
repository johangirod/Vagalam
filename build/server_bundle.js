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
/******/ 	var hotCurrentHash = "accf0705997a81e6f28e"; // eslint-disable-line no-unused-vars
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
/******/ 	return hotCreateRequire(58)(__webpack_require__.s = 58);
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
exports.push([module.i, "section {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n\nsection.style__header___La0Pw {\n    background-size: cover;\n    background-position: center;\n    height: calc(100vh - 200px);\n    filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feComponentTransfer color-interpolation-filters=\"sRGB\"><feFuncR type=\"linear\" slope=\"2\" intercept=\"-0.5\" /><feFuncG type=\"linear\" slope=\"2\" intercept=\"-0.5\" /><feFuncB type=\"linear\" slope=\"2\" intercept=\"-0.5\" /></feComponentTransfer></filter></svg>#filter');\n    -webkit-filter: contrast(200%);\n            filter: contrast(200%);\n}\n\nheader {\n    color: white;\n    font-family: 'Crimson Text', serif;\n    -ms-flex-item-align: end;\n        align-self: flex-end;\n}\n\nh1 {\n    margin: 0;\n    font-size: 72px;\n    padding: 22px;\n    font-weight: normal;\n}\n\nsection.style__body___1x5DI {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    height: 200px;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}", ""]);

// exports
exports.locals = {
	"header": "style__header___La0Pw",
	"body": "style__body___1x5DI"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Details/style.css":
/* no static exports found */
/* all exports used */
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/Trip/Details/style.css ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".style__container___inKHZ > * {\n    margin: 16px;\n}", ""]);

// exports
exports.locals = {
	"container": "style__container___inKHZ"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Map/SleepMarker/style.css":
/* no static exports found */
/* all exports used */
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/Trip/Map/SleepMarker/style.css ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".style__icon___3M-PM {\n    -webkit-animation: style__swirl-in-fwd___GJZux 0.4s ease-out both;\n            animation: style__swirl-in-fwd___GJZux 0.4s ease-out both;\n    -webkit-animation-delay: 0.3s;\n            animation-delay: 0.3s;\n    padding: 4px;\n    border: 1px black solid;\n    border-radius: 100%;\n    background-color: white;\n    transition: all 0.3s;\n}\n\n/* ----------------------------------------------\n * Generated by Animista on 2017-7-21 16:44:3\n * w: http://animista.net, t: @cssanimista\n * ---------------------------------------------- */\n\n/**\n * ----------------------------------------\n * animation swirl-in-fwd\n * ----------------------------------------\n */\n\n@-webkit-keyframes style__swirl-in-fwd___GJZux {\n    0% {\n        -webkit-transform: rotate(-540deg) scale(0);\n                transform: rotate(-540deg) scale(0);\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotate(0) scale(1);\n                transform: rotate(0) scale(1);\n        opacity: 1;\n    }\n}\n\n@keyframes style__swirl-in-fwd___GJZux {\n    0% {\n        -webkit-transform: rotate(-540deg) scale(0);\n                transform: rotate(-540deg) scale(0);\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotate(0) scale(1);\n                transform: rotate(0) scale(1);\n        opacity: 1;\n    }\n}\n", ""]);

// exports
exports.locals = {
	"icon": "style__icon___3M-PM",
	"swirl-in-fwd": "style__swirl-in-fwd___GJZux"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Map/style.css":
/* no static exports found */
/* all exports used */
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/Trip/Map/style.css ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".style__map___xYL0p {\n    height: 100vh;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}", ""]);

// exports
exports.locals = {
	"map": "style__map___xYL0p"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/style.css":
/* no static exports found */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/Trip/style.css ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".style__layout___lBsfA > *:last-child {\n    position: absolute;\n    right: 0;\n    top: 0;\n}\n.style__layout___lBsfA {\n    position: relative;\n    max-width: 100%;\n    max-height: 100%;\n    height: 100vh;\n    overflow: hidden;\n}\n.style__map___1Y6_H {\n    transition: -webkit-transform 0.7s;\n    transition: transform 0.7s;\n    transition: transform 0.7s, -webkit-transform 0.7s;\n}\n.style__map___1Y6_H.style__zoom___1kgLD {\n    -webkit-transform: scale(6);\n        -ms-transform: scale(6);\n            transform: scale(6);\n}\n", ""]);

// exports
exports.locals = {
	"layout": "style__layout___lBsfA",
	"map": "style__map___1Y6_H",
	"zoom": "style__zoom___1kgLD"
};

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
exports.push([module.i, "a {\n    position: relative;\n    border-radius: 32px;\n    border: 2px solid black;\n    display: inline-block;\n    text-decoration: none;\n    color: black;\n    font-size: large;\n    padding: 12px 32px;\n    background: white;\n    transition: border-color 0.7s;\n}\na:hover {\n    border-color: transparent;\n    background-clip: padding-box;\n}\na:hover::after {\n    position: absolute;\n    top: -2px;\n    bottom: -2px;\n    left: -2px;\n    right: -2px;\n    border-radius: 32px;\n    content: '';\n    z-index: -1;\n    background: linear-gradient(45deg,\n        rgba(255, 0, 0, 1) 0%,\n        rgba(255, 255, 0, 1) 15%,\n        rgba(0, 255, 0, 1) 30%,\n        rgba(0, 255, 255, 1) 50%,\n        rgba(0, 0, 255, 1) 65%,\n        rgba(255, 0, 255, 1) 80%,\n        rgba(255, 0, 0, 1) 100%\n    );\n    -webkit-animation: style__hue-rotate___12A-w 1s linear infinite;\n            animation: style__hue-rotate___12A-w 1s linear infinite;\n}\n@-webkit-keyframes style__hue-rotate___12A-w { from { filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"0\" /></filter></svg>#filter'); -webkit-filter: hue-rotate(0deg); filter: hue-rotate(0deg); } to { filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"360\" /></filter></svg>#filter'); -webkit-filter:hue-rotate(360deg); filter:hue-rotate(360deg); }  }\n@keyframes style__hue-rotate___12A-w { from { filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"0\" /></filter></svg>#filter'); -webkit-filter: hue-rotate(0deg); filter: hue-rotate(0deg); } to { filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"360\" /></filter></svg>#filter'); -webkit-filter:hue-rotate(360deg); filter:hue-rotate(360deg); }  }", ""]);

// exports
exports.locals = {
	"hue-rotate": "style__hue-rotate___12A-w"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/ui-element/Pastille/style.css":
/* no static exports found */
/* all exports used */
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/ui-element/Pastille/style.css ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".style__pastille___foiY7 {\n    border-radius: 100%;\n    background-color: white;\n    position: relative;\n    padding: 16px;\n    height: 2em;\n    width: 2em;\n    z-index: 1;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    transition: border-color 0.7s;\n    border: 3px solid black;\n}\n\n\n.style__pastille___foiY7 strong {\n    font-size: large;\n}\n\n\n.style__pastille___foiY7:hover {\n    border-color: transparent;\n    background-clip: padding-box;\n}\n\n\n.style__pastille___foiY7:hover::after {\n    position: absolute;\n    top: -3px;\n    bottom: -3px;\n    left: -3px;\n    right: -3px;\n    border-radius: 32px;\n    content: '';\n    z-index: 0;\n    background: linear-gradient(45deg,\n        rgba(255, 0, 0, 1) 0%,\n        rgba(255, 255, 0, 1) 15%,\n        rgba(0, 255, 0, 1) 30%,\n        rgba(0, 255, 255, 1) 50%,\n        rgba(0, 0, 255, 1) 65%,\n        rgba(255, 0, 255, 1) 80%,\n        rgba(255, 0, 0, 1) 100%\n    );\n    -webkit-animation: style__hue-rotate___15A0Z 2s linear infinite;\n            animation: style__hue-rotate___15A0Z 2s linear infinite;\n}\n\n\n@-webkit-keyframes style__hue-rotate___15A0Z { from { filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"0\" /></filter></svg>#filter'); -webkit-filter: hue-rotate(0deg); filter: hue-rotate(0deg); } to { filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"360\" /></filter></svg>#filter'); -webkit-filter:hue-rotate(360deg); filter:hue-rotate(360deg); }  }\n\n\n@keyframes style__hue-rotate___15A0Z { from { filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"0\" /></filter></svg>#filter'); -webkit-filter: hue-rotate(0deg); filter: hue-rotate(0deg); } to { filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"360\" /></filter></svg>#filter'); -webkit-filter:hue-rotate(360deg); filter:hue-rotate(360deg); }  }", ""]);

// exports
exports.locals = {
	"pastille": "style__pastille___foiY7",
	"hue-rotate": "style__hue-rotate___15A0Z"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1}!./node_modules/postcss-loader/index.js!./src/style.global.css":
/* no static exports found */
/* all exports used */
/*!*******************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1}!./~/postcss-loader!./src/style.global.css ***!
  \*******************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n\n* {\n    font-family: 'Lato', sans-serif;\n}\n\np { \n    margin: 0;\n}", ""]);

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


var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 27);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ 28);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
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
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
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
    if (sourceMap && typeof btoa === 'function') {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_preset_env__ = __webpack_require__(/*! babel-preset-env */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_preset_env___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_preset_env__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_preset_react__ = __webpack_require__(/*! babel-preset-react */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_preset_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_preset_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_preset_stage_1__ = __webpack_require__(/*! babel-preset-stage-1 */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_preset_stage_1___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_preset_stage_1__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_plugin_react_require__ = __webpack_require__(/*! babel-plugin-react-require */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_plugin_react_require___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_plugin_react_require__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_plugin_transform_export_default_name_forked__ = __webpack_require__(/*! babel-plugin-transform-export-default-name-forked */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_plugin_transform_export_default_name_forked___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_plugin_transform_export_default_name_forked__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_plugin_minify_replace__ = __webpack_require__(/*! babel-plugin-minify-replace */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_plugin_minify_replace___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_plugin_minify_replace__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_plugin_transform_node_env_inline__ = __webpack_require__(/*! babel-plugin-transform-node-env-inline */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_plugin_transform_node_env_inline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_plugin_transform_node_env_inline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_plugin_minify_dead_code_elimination__ = __webpack_require__(/*! babel-plugin-minify-dead-code-elimination */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_plugin_minify_dead_code_elimination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_plugin_minify_dead_code_elimination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_plugin_minify_guarded_expressions__ = __webpack_require__(/*! babel-plugin-minify-guarded-expressions */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_plugin_minify_guarded_expressions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_plugin_minify_guarded_expressions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_plugin_discard_module_references__ = __webpack_require__(/*! babel-plugin-discard-module-references */ 15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_plugin_discard_module_references___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_plugin_discard_module_references__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_react_jsx_source__ = __webpack_require__(/*! babel-plugin-transform-react-jsx-source */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_react_jsx_source___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_react_jsx_source__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_babel_plugin_transform_react_jsx_self__ = __webpack_require__(/*! babel-plugin-transform-react-jsx-self */ 22);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_mergewith__ = __webpack_require__(/*! lodash.mergewith */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_mergewith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_mergewith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webpack__ = __webpack_require__(/*! webpack */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serviceworker_webpack_plugin__ = __webpack_require__(/*! serviceworker-webpack-plugin */ 55);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(/*! webpack */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_case_sensitive_paths_webpack_plugin__ = __webpack_require__(/*! case-sensitive-paths-webpack-plugin */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_case_sensitive_paths_webpack_plugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_case_sensitive_paths_webpack_plugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dev_utils_WatchMissingNodeModulesPlugin__ = __webpack_require__(/*! react-dev-utils/WatchMissingNodeModulesPlugin */ 48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dev_utils_WatchMissingNodeModulesPlugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dev_utils_WatchMissingNodeModulesPlugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_postcss_omit_import_tilde__ = __webpack_require__(/*! postcss-omit-import-tilde */ 44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_postcss_omit_import_tilde___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_postcss_omit_import_tilde__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_postcss_import__ = __webpack_require__(/*! postcss-import */ 43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_postcss_import___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_postcss_import__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_postcss_url__ = __webpack_require__(/*! postcss-url */ 46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_postcss_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_postcss_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_postcss_cssnext__ = __webpack_require__(/*! postcss-cssnext */ 42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_postcss_cssnext___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_postcss_cssnext__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_postcss_browser_reporter__ = __webpack_require__(/*! postcss-browser-reporter */ 41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_postcss_browser_reporter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_postcss_browser_reporter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_postcss_reporter__ = __webpack_require__(/*! postcss-reporter */ 45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_postcss_reporter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_postcss_reporter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_path__ = __webpack_require__(/*! path */ 9);
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
            minimize: !options.dev,
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
            alias: _extends({}, options.webpack.alias, options.moduleMap),
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

module.exports = { "server": { "buildPath": "/home/johan/Project/Vagalam/build", "filename": "server_bundle.js", "host": "localhost", "port": 3000 }, "basePath": "", "publicPath": "/assets", "servePublic": true, "client": { "buildPath": "/home/johan/Project/Vagalam/public", "filename": "client_bundle.[hash].js", "serviceWorker": false, "targetBrowsers": [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"] }, "webpack": { "alias": {} }, "filesPath": "files", "rootElementId": "vitamin-app", "moduleMap": { "__app_modules__routes__": "/home/johan/Project/Vagalam/src/routes", "__app_modules__server_middlewares__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/emptyArray", "__app_modules__server_ErrorPage__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/ErrorPage", "__app_modules__server_onError__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/defaultFunction", "__app_modules__server_layout__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/HTMLLayout", "__app_modules__server_createInitAction__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/defaultFunction", "__app_modules__redux_reducers__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/emptyObject", "__app_modules__redux_middlewares__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/emptyArray", "__app_modules__redux_enhancers__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/emptyArray", "__app_modules__redux_stateSerializer__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/src/shared/defaultStateSerializer" } };

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
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk__ = __webpack_require__(/*! chalk */ 7);
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

const path = __webpack_require__(/*! path */ 9);

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

/***/ "./node_modules/vitaminjs/react-helmet.js":
/* exports provided: default */
/* exports used: default */
/*!*************************************!*\
  !*** ./~/vitaminjs/react-helmet.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_helmet__ = __webpack_require__(/*! react-helmet */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_helmet__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_react_helmet___default.a; });



/***/ }),

/***/ "./node_modules/vitaminjs/react-router.js":
/* exports provided: Link, IndexLink, withRouter, Route, Redirect, IndexRoute, IndexRedirect, PropTypes, browserHistory */
/* exports used: Route */
/*!*************************************!*\
  !*** ./~/vitaminjs/react-router.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(/*! react-router */ 6);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_compose__ = __webpack_require__(/*! koa-compose */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_compose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_compose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_etag__ = __webpack_require__(/*! koa-etag */ 36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_etag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_etag__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_conditional_get__ = __webpack_require__(/*! koa-conditional-get */ 35);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_string_escape__ = __webpack_require__(/*! js-string-escape */ 32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_string_escape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_js_string_escape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(/*! react-router */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(/*! prop-types */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_helmet__ = __webpack_require__(/*! react-helmet */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_modules_redux_stateSerializer___ = __webpack_require__(/*! __app_modules__redux_stateSerializer__ */ "./node_modules/vitaminjs/src/shared/defaultStateSerializer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_components_App__ = __webpack_require__(/*! ../../shared/components/App */ "./node_modules/vitaminjs/src/shared/components/App.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config__ = __webpack_require__(/*! ../../../config */ "./node_modules/vitaminjs/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__config__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/App.jsx',
    _this = this;






// eslint-disable-next-line import/no-extraneous-dependencies





const propTypes = {
    store: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.shape({
        getState: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func.isRequired,
        dispatch: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func.isRequired
    }).isRequired,
    insertCss: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func.isRequired,
    renderProps: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any).isRequired,
    mainEntry: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string.isRequired
};

const App = ({ store, insertCss, renderProps, mainEntry }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_6__shared_components_App__["a" /* default */],
    { store: store, insertCss: insertCss, __source: {
            fileName: _jsxFileName,
            lineNumber: 22
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_helmet___default.a, {
        script: [{ innerHTML: `window.__INITIAL_STATE__ = "${__WEBPACK_IMPORTED_MODULE_1_js_string_escape___default()(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__app_modules_redux_stateSerializer___["a" /* stringify */])(store.getState()))}"` }, { src: `${__WEBPACK_IMPORTED_MODULE_7__config___default.a.publicPath}/${mainEntry}`, async: true }],
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 5);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 5);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(/*! react-helmet */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css__ = __webpack_require__(/*! ./style.css */ "./node_modules/vitaminjs/src/server/components/ErrorPage/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Error404__ = __webpack_require__(/*! ./Error404 */ "./node_modules/vitaminjs/src/server/components/ErrorPage/Error404.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Error500__ = __webpack_require__(/*! ./Error500 */ "./node_modules/vitaminjs/src/server/components/ErrorPage/Error500.jsx");
var _jsxFileName = '/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/ErrorPage/index.jsx',
    _this = this;









const propTypes = {
    HTTPStatus: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    // eslint-disable-next-line react/require-default-props
    error: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
        message: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
        stack: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
    })
};

const ErrorPage = ({ HTTPStatus, error }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.page, __source: {
            fileName: _jsxFileName,
            lineNumber: 20
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_helmet___default.a, {
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
        { className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a['stack-container'], __source: {
                fileName: _jsxFileName,
                lineNumber: 39
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h3',
            { className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a['error-details'], __source: {
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
        { className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.container, __source: {
                fileName: _jsxFileName,
                lineNumber: 51
            },
            __self: _this
        },
        HTTPStatus === 404 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Error404__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 53
            },
            __self: _this
        }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Error500__["a" /* default */], { HTTPStatus: HTTPStatus, error: error, __source: {
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

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__style_css___default.a)(ErrorPage));

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/HTMLLayout.jsx',
    _this = this;


/* eslint react/no-danger: 0 */



const HelmetHeadPropTypes = __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    toComponent: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
}).isRequired;

const propTypes = {
    head: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        title: HelmetHeadPropTypes,
        meta: HelmetHeadPropTypes,
        link: HelmetHeadPropTypes,
        base: HelmetHeadPropTypes,
        script: HelmetHeadPropTypes,
        htmlAttributes: HelmetHeadPropTypes
    }).isRequired,
    style: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server__ = __webpack_require__(/*! react-dom/server */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(/*! react-helmet */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk__ = __webpack_require__(/*! chalk */ 7);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(/*! react-router */ 6);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url__ = __webpack_require__(/*! url */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static__ = __webpack_require__(/*! koa-static */ 38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_static__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_mount__ = __webpack_require__(/*! koa-mount */ 37);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(/*! react-router */ 6);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server__ = __webpack_require__(/*! react-dom/server */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(/*! react-helmet */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_resolver__ = __webpack_require__(/*! react-resolver */ 50);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url__ = __webpack_require__(/*! url */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(/*! koa */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__(/*! express */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk__ = __webpack_require__(/*! chalk */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch__ = __webpack_require__(/*! node-fetch */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_readline__ = __webpack_require__(/*! readline */ 52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_readline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_readline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_http_graceful_shutdown__ = __webpack_require__(/*! http-graceful-shutdown */ 31);
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
        const webpack = __webpack_require__(/*! webpack */ 8);
        const clientBuildConfig = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__config_build_webpack_config_client__["a" /* default */])(_extends({
            hot: true,
            dev: true
        }, __WEBPACK_IMPORTED_MODULE_8__config___default.a));

        const compiler = webpack(clientBuildConfig);
        let clientBuilt = false;
        const parsedPublicPath = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_url__["parse"])(__WEBPACK_IMPORTED_MODULE_8__config___default.a.publicPath).pathname || '';
        app.use(__webpack_require__(/*! webpack-dev-middleware */ 56)(compiler, {
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
        app.use(__webpack_require__(/*! webpack-hot-middleware */ 57)(compiler, {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(/*! react-redux */ 49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CSSProvider__ = __webpack_require__(/*! ./CSSProvider */ "./node_modules/vitaminjs/src/shared/components/CSSProvider.js");
var _jsxFileName = '/home/johan/Project/Vagalam/node_modules/vitaminjs/src/shared/components/App.jsx',
    _this = this;







const propTypes = {
    store: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
    insertCss: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired
};

const App = ({ store, insertCss, children }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_3__CSSProvider__["a" /* default */],
    { insertCss: insertCss, __source: {
            fileName: _jsxFileName,
            lineNumber: 13
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"],
        { store: store, __source: {
                fileName: _jsxFileName,
                lineNumber: 14
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 15
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(/*! prop-types */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);



class CSSProvider extends __WEBPACK_IMPORTED_MODULE_1_react__["Component"] {

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
    insertCss: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element.isRequired
};
CSSProvider.childContextTypes = {
    insertCss: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 5);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(/*! redux */ 53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux__ = __webpack_require__(/*! react-router-redux */ 51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk__ = __webpack_require__(/*! redux-thunk */ 54);
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
/* exports provided: default */
/* exports used: default */
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_global_css__ = __webpack_require__(/*! ./style.global.css */ "./src/style.global.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_global_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_global_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vitaminjs_react_helmet__ = __webpack_require__(/*! vitaminjs/react-helmet */ "./node_modules/vitaminjs/react-helmet.js");
var _jsxFileName = '/home/johan/Project/Vagalam/src/App.jsx',
    _this = this;






/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_2__style_global_css___default.a)(({ children }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 6
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_vitaminjs_react_helmet__["a" /* default */], {
        title: 'Vagalam',
        meta: [{
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        }],
        link: [{
            href: 'https://fonts.googleapis.com/css?family=Crimson+Text|Lato',
            rel: 'stylesheet'
        }],
        __source: {
            fileName: _jsxFileName,
            lineNumber: 7
        },
        __self: _this
    }),
    children
)));

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_element_Button_Link__ = __webpack_require__(/*! ../ui-element/Button/Link */ "./src/ui-element/Button/Link.jsx");
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
        { className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.header, style: { backgroundImage: `url(${__WEBPACK_IMPORTED_MODULE_3__background_jpg___default.a})` }, __source: {
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
        { className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.body, __source: {
                fileName: _jsxFileName,
                lineNumber: 16
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2__ui_element_Button_Link__["a" /* default */],
            { href: '/voyage', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                },
                __self: _this
            },
            ' Parcourir le voyage '
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

/***/ "./src/Trip/Details/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!************************************!*\
  !*** ./src/Trip/Details/index.jsx ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_freactal__ = __webpack_require__(/*! freactal */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_freactal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_freactal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/Details/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ramda__ = __webpack_require__(/*! ramda */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ui_element_Pastille__ = __webpack_require__(/*! ../../ui-element/Pastille */ "./src/ui-element/Pastille/index.jsx");
var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/Details/index.jsx',
    _this = this;








const Details = ({ state: { currentSleepLocation } }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.container, __source: {
            fileName: _jsxFileName,
            lineNumber: 10
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__ui_element_Pastille__["a" /* default */], {
        value: currentSleepLocation ? currentSleepLocation.data['sleep_location.day_number'].value : '...',
        unit: 'jour',
        __source: {
            fileName: _jsxFileName,
            lineNumber: 11
        },
        __self: _this
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__ui_element_Pastille__["a" /* default */], { value: 1209, unit: 'km', __source: {
            fileName: _jsxFileName,
            lineNumber: 15
        },
        __self: _this
    })
);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_ramda__["compose"])(__WEBPACK_IMPORTED_MODULE_1_freactal__["injectState"], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a))(Details));

/***/ }),

/***/ "./src/Trip/Details/style.css":
/* no static exports found */
/* exports used: default */
/*!************************************!*\
  !*** ./src/Trip/Details/style.css ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Details/style.css");
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
      module.hot.accept(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Details/style.css", function() {
        content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Details/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/Trip/Map/SleepMarker/Icon.jsx":
/* exports provided: default */
/* exports used: default */
/*!*******************************************!*\
  !*** ./src/Trip/Map/SleepMarker/Icon.jsx ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "/home/johan/Project/Vagalam/src/Trip/Map/SleepMarker/Icon.jsx",
    _this = this;


/* harmony default export */ __webpack_exports__["a"] = (function icon() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    {
      x: "0px",
      y: "0px",
      viewBox: "0 0 100 125",
      enableBackground: "new 0 0 100 100",
      width: "100%",
      xmlSpace: "preserve",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 2
      },
      __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      { display: "none", __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        },
        __self: _this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("rect", {
        x: "-414",
        y: "-8.38",
        display: "inline",
        fill: "#000000",
        stroke: "#000000",
        strokeWidth: "1.0255",
        strokeMiterlimit: "10",
        width: "1370",
        height: "1329.38",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        },
        __self: _this
      })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: _this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "g",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 24
          },
          __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
          fill: "none",
          d: "M24.002,68.321l-9.069,20.691l8.432-0.024l5.79-15.218c0.275-0.723,0.962-1.215,1.746-1.182    c0.773,0.013,1.455,0.51,1.705,1.241l5.169,15.117l7.884-0.023L30.226,54.436L24.002,68.321z",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 25
          },
          __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("polygon", { fill: "none", points: "27.296,88.977 33.901,88.958 30.778,79.826   ", __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          },
          __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
          fill: "none",
          d: "M50.198,88.814c0.014,0.032,0.02,0.064,0.032,0.096l2.059-0.006l2.261-5.046    c0.426-0.949,1.542-1.374,2.49-0.949c0.95,0.426,1.375,1.541,0.949,2.49l-1.565,3.493l29.265-0.085L71.587,49.559H32.631    L50.198,88.814z M51.279,61.359h15.213c0.677,0,1.279,0.433,1.493,1.076l3.204,9.611c0.16,0.48,0.08,1.008-0.216,1.418    c-0.296,0.411-0.771,0.653-1.277,0.653H54.483c-0.677,0-1.279-0.433-1.493-1.076l-3.204-9.611c-0.16-0.48-0.08-1.008,0.216-1.418    C50.298,61.602,50.773,61.359,51.279,61.359z",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 30
          },
          __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("polygon", {
          fill: "none",
          points: "67.513,70.97 65.358,64.506 53.462,64.506 55.617,70.97   ",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          },
          __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
          fill: "none",
          d: "M33.497,31.091c0.532,0,1.018,0.3,1.257,0.774c0.385,0.765,1.153,1.24,2.005,1.24    c1.239,0,2.247-1.008,2.247-2.247c0-0.845-0.474-1.574-1.166-1.957c-0.391,0.049-0.782,0.082-1.171,0.082    c-0.345,0-0.688-0.026-1.03-0.063c-0.083,0.048-0.165,0.098-0.243,0.157c-0.331,0.254-0.755,0.347-1.162,0.258    c-0.406-0.09-0.751-0.355-0.943-0.724c-0.058-0.112-0.132-0.21-0.195-0.318c-1.859-0.727-3.534-2.004-4.781-3.712    c-0.686-0.189-1.403-0.291-2.138-0.291c-2.722,0-5.235,1.366-6.724,3.653c-0.232,0.357-0.614,0.59-1.037,0.633    c-0.423,0.044-0.845-0.108-1.144-0.411c-0.753-0.762-1.758-1.182-2.828-1.182c-2.194,0-3.978,1.784-3.978,3.978    c0,0.044,0.001,0.087,0.002,0.131H33.497z",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          },
          __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
          fill: "none",
          d: "M34.922,25.932c0.125,0.033,0.248,0.069,0.374,0.095c0.471-0.143,0.959-0.231,1.462-0.231    c0.472,0,0.921,0.086,1.355,0.207c0.253-0.057,0.506-0.128,0.756-0.217c1.041-0.371,1.961-0.994,2.702-1.817    c-2.623-0.658-4.864-2.679-5.863-5.484c-0.999-2.804-0.54-5.788,1.076-7.956c-0.344-0.053-0.689-0.079-1.033-0.079    c-0.751,0-1.495,0.126-2.209,0.381c-1.79,0.637-3.207,2.003-3.99,3.845c-0.8,1.882-0.845,4.03-0.126,6.048    c0.189,0.532,0.426,1.031,0.701,1.498C32.032,22.967,33.696,24.247,34.922,25.932z",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 42
          },
          __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M24.024,92.335h1.35h10.305h1.529h13.544h4.13h32.766h4.126l3.061-6.83c0.426-0.95,0-2.064-0.95-2.49    c-0.947-0.424-2.064,0-2.49,0.95l-1.663,3.713L75.149,47.088l3.11-6.944c0.426-0.95,0-2.065-0.949-2.49    c-0.949-0.425-2.064,0-2.49,0.949l-1.802,4.024l-1.849-4.128c-0.425-0.949-1.541-1.374-2.49-0.949    c-0.949,0.426-1.375,1.541-0.949,2.49l2.388,5.329H34.289l1.537-3.429c0.473-1.055,0.002-2.294-1.053-2.767    c-1.055-0.475-2.294-0.002-2.767,1.053l-1.776,3.963l-1.772-3.96c-0.472-1.056-1.71-1.53-2.765-1.058    c-1.056,0.472-1.53,1.71-1.058,2.765l3.213,7.181l-7.663,17.483l-9.657,21.546l-1.922-4.289c-0.425-0.949-1.54-1.374-2.49-0.949    c-0.95,0.426-1.375,1.541-0.949,2.49l3.107,6.936h4.13H24.024z M27.296,88.977l3.482-9.151l3.123,9.132L27.296,88.977z     M37.776,88.947l-5.169-15.117c-0.25-0.731-0.932-1.228-1.705-1.241c-0.784-0.033-1.471,0.46-1.746,1.182l-5.79,15.218    l-8.432,0.024l9.069-20.691l6.224-13.885L45.66,88.924L37.776,88.947z M71.587,49.559l14.102,39.249l-29.265,0.085l1.565-3.493    c0.426-0.949,0-2.064-0.949-2.49c-0.948-0.425-2.064,0-2.49,0.949l-2.261,5.046l-2.059,0.006    c-0.012-0.032-0.018-0.065-0.032-0.096L32.631,49.559H71.587z", __source: {
            fileName: _jsxFileName,
            lineNumber: 46
          },
          __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M49.786,63.43l3.204,9.611c0.214,0.643,0.816,1.076,1.493,1.076h15.213c0.506,0,0.981-0.243,1.277-0.653    c0.296-0.41,0.376-0.938,0.216-1.418l-3.204-9.611c-0.214-0.643-0.816-1.076-1.493-1.076H51.279c-0.506,0-0.981,0.243-1.277,0.653    C49.706,62.422,49.626,62.95,49.786,63.43z M65.358,64.506l2.155,6.464H55.617l-2.155-6.464H65.358z", __source: {
            fileName: _jsxFileName,
            lineNumber: 47
          },
          __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M47.544,21.982c-0.292-0.412-0.785-0.637-1.284-0.588c-2.335,0.231-4.666-1.382-5.535-3.822    c-0.87-2.441-0.082-5.157,1.872-6.461c0.42-0.28,0.658-0.764,0.624-1.267c-0.034-0.504-0.336-0.95-0.79-1.17    c-2.395-1.162-5.048-1.327-7.469-0.464c-2.54,0.905-4.541,2.821-5.636,5.396c-1.056,2.484-1.134,5.293-0.237,7.932    c-0.183-0.009-0.363-0.033-0.547-0.033c-3.162,0-6.115,1.362-8.158,3.707c-1.064-0.661-2.292-1.015-3.575-1.015    c-3.746,0-6.793,3.047-6.793,6.793c0,0.653,0.096,1.305,0.285,1.94c0.177,0.597,0.726,1.006,1.349,1.006h23.435    c0.946,1.26,2.426,2.014,4.039,2.014c2.792,0,5.063-2.271,5.063-5.062c0-1.078-0.344-2.073-0.921-2.895    c1.915-0.969,3.459-2.566,4.407-4.606C47.885,22.931,47.836,22.394,47.544,21.982z M39.123,33.136    c-0.851,0-1.619-0.475-2.005-1.24c-0.239-0.475-0.725-0.774-1.257-0.774H12.833c-0.001-0.044-0.002-0.088-0.002-0.131    c0-2.194,1.784-3.978,3.978-3.978c1.07,0,2.074,0.42,2.829,1.183c0.299,0.303,0.72,0.456,1.143,0.411    c0.424-0.043,0.805-0.276,1.037-0.633c1.488-2.287,4.002-3.653,6.724-3.653c3,0,5.725,1.656,7.113,4.321    c0.192,0.369,0.538,0.634,0.944,0.724c0.406,0.089,0.832-0.004,1.162-0.258c0.397-0.305,0.868-0.466,1.363-0.466    c1.239,0,2.247,1.008,2.247,2.247C41.37,32.128,40.362,33.136,39.123,33.136z M41.233,25.818    c-0.249,0.089-0.501,0.159-0.754,0.217c-0.434-0.122-0.883-0.208-1.356-0.208c-0.505,0-0.993,0.088-1.464,0.232    c-0.125-0.026-0.248-0.062-0.371-0.094c-1.226-1.686-2.891-2.966-4.797-3.711c-0.275-0.466-0.512-0.966-0.701-1.498    c-0.719-2.018-0.675-4.166,0.126-6.048c0.783-1.842,2.2-3.208,3.99-3.845c0.714-0.254,1.459-0.381,2.209-0.381    c0.344,0,0.69,0.027,1.034,0.08c-1.616,2.168-2.075,5.151-1.076,7.956c0.999,2.804,3.241,4.826,5.863,5.484    C43.195,24.823,42.275,25.447,41.233,25.818z", __source: {
            fileName: _jsxFileName,
            lineNumber: 48
          },
          __self: _this
        })
      )
    )
  );
});

/***/ }),

/***/ "./src/Trip/Map/SleepMarker/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!********************************************!*\
  !*** ./src/Trip/Map/SleepMarker/index.jsx ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_freactal__ = __webpack_require__(/*! freactal */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_freactal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_freactal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__(/*! ramda */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/Map/SleepMarker/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Icon__ = __webpack_require__(/*! ./Icon */ "./src/Trip/Map/SleepMarker/Icon.jsx");
var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/Map/SleepMarker/index.jsx',
    _this = this;









const Marker = ({ state: { zoom } }) => {
    const size = zoom > 7 ? '24px' : '12px';
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
            style: {
                height: size,
                width: size
            },
            className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.icon,
            __source: {
                fileName: _jsxFileName,
                lineNumber: 11
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Icon__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 18
            },
            __self: _this
        })
    );
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ramda__["compose"])(__WEBPACK_IMPORTED_MODULE_1_freactal__["injectState"], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_4__style_css___default.a))(Marker));

/***/ }),

/***/ "./src/Trip/Map/SleepMarker/style.css":
/* no static exports found */
/* exports used: default */
/*!********************************************!*\
  !*** ./src/Trip/Map/SleepMarker/style.css ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Map/SleepMarker/style.css");
    var insertCss = __webpack_require__(/*! ../../../../~/isomorphic-style-loader/lib/insertCss.js */ "./node_modules/isomorphic-style-loader/lib/insertCss.js");

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
      module.hot.accept(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Map/SleepMarker/style.css", function() {
        content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Map/SleepMarker/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/Trip/Map/bike_roads/ev4.json":
/* no static exports found */
/* exports used: default */
/*!******************************************!*\
  !*** ./src/Trip/Map/bike_roads/ev4.json ***!
  \******************************************/
/***/ (function(module, exports) {

module.exports = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"properties": {
				"name": "Voie-4_Mont-Saint-Michel-Roscoff",
				"time": "2011-10-04T10:49:25Z",
				"coordTimes": [
					"2011-10-04T10:49:25Z",
					"2011-10-04T10:48:07Z",
					"2011-10-04T10:47:13Z",
					"2011-10-04T10:43:50Z",
					"2011-10-04T10:40:35Z",
					"2013-03-04T09:46:05Z",
					"2013-03-04T09:46:30Z",
					"2013-03-04T09:46:05Z",
					"2013-03-04T09:48:55Z",
					"2013-03-04T09:49:45Z",
					"2013-03-04T09:50:45Z",
					"2013-03-04T09:50:55Z",
					"2013-03-04T09:51:15Z",
					"2013-03-04T09:51:50Z",
					"2013-03-04T09:55:05Z",
					"2013-03-04T09:55:25Z",
					"2013-03-04T09:55:45Z",
					"2013-03-04T09:56:15Z",
					"2013-03-04T09:29:35Z",
					"2013-03-04T09:28:25Z",
					"2013-03-04T09:28:15Z",
					"2013-03-04T09:26:05Z",
					"2013-03-04T10:06:25Z",
					"2013-03-04T10:10:20Z",
					"2013-03-04T10:17:25Z",
					"2013-03-04T10:18:20Z",
					"2013-03-04T10:18:35Z",
					"2013-03-04T10:19:00Z",
					"2013-03-04T10:20:00Z",
					"2013-03-04T10:20:35Z",
					"2013-03-04T10:21:00Z",
					"2013-03-04T10:21:20Z",
					"2013-03-04T10:22:20Z",
					"2013-03-04T10:22:44Z",
					"2013-03-04T10:23:25Z",
					"2013-03-04T10:23:40Z",
					"2013-03-04T10:24:40Z",
					"2013-03-04T10:28:10Z",
					"2013-03-04T10:29:00Z",
					"2013-03-04T10:30:50Z",
					"2013-03-04T10:34:35Z",
					"2013-03-04T10:35:50Z",
					"2013-03-04T10:36:15Z",
					"2013-03-04T10:37:15Z",
					"2013-03-04T10:45:20Z",
					"2013-03-04T10:49:30Z",
					"2013-03-04T11:00:35Z",
					"2013-03-04T11:03:10Z",
					"2013-03-04T11:04:35Z",
					"2013-03-04T11:04:45Z",
					"2013-03-04T11:05:10Z",
					"2013-03-04T11:05:29Z",
					"2013-03-04T11:06:25Z",
					"2013-03-04T11:07:00Z",
					"2013-03-04T11:07:35Z",
					"2013-03-04T11:07:45Z",
					"2013-03-04T11:08:00Z",
					"2013-03-04T11:08:05Z",
					"2013-03-04T11:08:30Z",
					"2013-03-04T11:08:50Z",
					"2013-03-04T11:09:20Z",
					"2013-03-04T11:11:50Z",
					"2013-03-04T11:13:05Z",
					"2013-03-04T11:13:15Z",
					"2013-03-04T11:15:10Z",
					"2013-03-04T11:15:55Z",
					"2013-03-04T11:16:55Z",
					"2013-03-04T11:17:00Z",
					"2013-03-04T11:17:25Z",
					"2013-03-04T11:18:05Z",
					"2013-03-04T11:18:15Z",
					"2013-03-04T11:18:20Z",
					"2013-03-04T11:18:45Z",
					"2013-03-04T11:19:05Z",
					"2013-03-04T11:19:10Z",
					"2013-03-04T11:20:30Z",
					"2013-03-04T11:21:50Z",
					"2013-03-04T11:26:55Z",
					"2013-03-04T11:27:10Z",
					"2013-03-04T11:27:35Z",
					"2013-03-04T11:27:55Z",
					"2013-03-04T11:28:50Z",
					"2013-03-04T11:29:15Z",
					"2013-03-04T11:29:30Z",
					"2013-03-04T11:29:55Z",
					"2013-03-04T11:31:50Z",
					"2013-03-04T11:32:15Z",
					"2013-03-04T11:32:45Z",
					"2013-03-04T11:33:00Z",
					"2013-03-04T11:33:20Z",
					"2013-03-04T11:33:45Z",
					"2013-03-04T11:34:10Z",
					"2013-03-04T11:35:10Z",
					"2013-03-04T11:50:30Z",
					"2013-03-04T11:51:55Z",
					"2013-03-04T11:52:10Z",
					"2013-03-04T11:52:20Z",
					"2013-03-04T11:52:50Z",
					"2013-03-04T11:53:15Z",
					"2013-03-04T11:53:30Z",
					"2013-03-04T11:54:35Z",
					"2013-03-04T11:55:15Z",
					"2013-03-04T11:55:35Z",
					"2013-03-04T11:56:00Z",
					"2013-03-04T11:56:40Z",
					"2013-03-04T11:57:05Z",
					"2013-03-04T11:57:55Z",
					"2013-03-04T11:58:30Z",
					"2013-03-04T11:58:55Z",
					"2013-03-04T11:59:20Z",
					"2013-03-04T12:02:10Z",
					"2013-03-04T12:03:40Z",
					"2013-03-04T12:04:50Z",
					"2013-03-04T12:06:05Z",
					"2013-03-04T12:07:55Z",
					"2013-03-04T12:08:15Z",
					"2013-03-04T12:08:35Z",
					"2013-03-04T12:09:50Z",
					"2013-03-04T12:13:10Z",
					"2013-03-04T12:13:35Z",
					"2013-03-04T12:16:35Z",
					"2013-03-04T12:17:55Z",
					"2013-03-04T13:44:54Z",
					"2013-03-04T13:43:24Z",
					"2013-03-04T13:47:44Z",
					"2013-03-04T14:01:04Z",
					"2013-03-04T14:01:49Z",
					"2013-03-04T15:39:44Z",
					"2013-03-04T15:40:09Z",
					"2013-03-04T15:40:19Z",
					"2013-03-04T15:40:39Z",
					"2013-03-04T15:40:54Z",
					"2013-03-04T15:41:09Z",
					"2013-03-04T15:42:54Z",
					"2013-03-04T15:43:14Z",
					"2013-03-04T15:43:29Z",
					"2013-03-04T15:43:39Z",
					"2013-03-04T15:43:59Z",
					"2013-03-04T15:44:14Z",
					"2013-03-04T15:44:44Z",
					"2013-03-04T15:45:04Z",
					"2013-03-04T15:46:14Z",
					"2013-03-04T15:46:34Z",
					"2013-03-04T15:51:54Z",
					"2013-03-04T15:53:14Z",
					"2013-03-04T15:53:34Z",
					"2013-03-04T15:53:54Z",
					"2013-03-04T15:55:09Z",
					"2013-03-04T15:56:24Z",
					"2013-03-04T09:31:16Z",
					"2013-03-04T09:31:46Z",
					"2013-03-04T09:32:11Z",
					"2013-03-04T09:34:36Z",
					"2013-03-04T09:35:01Z",
					"2013-03-04T09:36:31Z",
					"2013-03-04T09:36:51Z",
					"2013-03-04T09:37:21Z",
					"2013-03-04T09:38:11Z",
					"2013-03-04T09:38:21Z",
					"2013-03-04T09:39:01Z",
					"2013-03-04T09:39:51Z",
					"2013-03-04T09:40:06Z",
					"2013-03-04T09:40:56Z",
					"2013-03-04T09:42:16Z",
					"2013-03-04T09:42:46Z",
					"2013-03-04T09:43:11Z",
					"2013-03-04T09:43:46Z",
					"2013-03-04T09:44:06Z",
					"2013-03-04T09:46:26Z",
					"2013-03-04T09:46:46Z",
					"2013-03-04T09:47:11Z",
					"2013-03-04T09:47:56Z",
					"2013-03-04T09:50:41Z",
					"2013-03-04T10:05:36Z",
					"2013-03-04T10:06:31Z",
					"2013-03-04T10:07:01Z",
					"2013-03-04T10:09:46Z",
					"2013-03-04T10:10:51Z",
					"2013-03-04T10:11:35Z",
					"2013-03-04T10:17:51Z",
					"2013-03-04T10:18:01Z",
					"2013-03-04T10:18:21Z",
					"2013-03-04T10:19:51Z",
					"2013-03-04T10:20:26Z",
					"2013-03-04T10:21:16Z",
					"2013-03-04T10:21:31Z",
					"2013-03-04T10:21:56Z",
					"2013-03-04T10:22:46Z",
					"2013-03-04T10:24:21Z",
					"2013-03-04T10:24:41Z",
					"2013-03-04T10:25:11Z",
					"2013-03-04T10:25:51Z",
					"2013-03-04T10:29:41Z",
					"2013-03-04T10:31:11Z",
					"2013-03-04T10:31:56Z",
					"2013-03-04T10:33:21Z",
					"2013-03-04T10:33:56Z",
					"2013-03-04T10:34:36Z",
					"2013-03-04T10:34:46Z",
					"2013-03-04T10:39:06Z",
					"2013-03-04T10:40:01Z",
					"2013-03-04T10:40:31Z",
					"2013-03-04T10:40:56Z",
					"2013-03-04T10:41:26Z",
					"2013-03-04T10:41:51Z",
					"2013-03-04T10:42:21Z",
					"2013-03-04T10:43:46Z",
					"2013-03-04T10:44:01Z",
					"2013-03-04T10:44:16Z",
					"2013-03-04T10:44:46Z",
					"2013-03-04T10:45:26Z",
					"2013-03-04T10:45:41Z",
					"2013-03-04T10:45:56Z",
					"2013-03-04T10:47:36Z",
					"2013-03-04T10:47:56Z",
					"2013-03-04T10:48:16Z",
					"2013-03-04T10:49:26Z",
					"2013-03-04T10:50:26Z",
					"2013-03-04T10:51:00Z",
					"2013-03-04T10:51:11Z",
					"2013-03-04T10:51:26Z",
					"2013-03-04T10:51:31Z",
					"2013-03-04T10:52:16Z",
					"2013-03-04T10:54:21Z",
					"2013-03-04T10:55:16Z",
					"2013-03-04T10:55:46Z",
					"2013-03-04T10:56:01Z",
					"2013-03-04T10:56:31Z",
					"2013-03-04T10:57:31Z",
					"2013-03-04T10:57:41Z",
					"2013-03-04T10:59:51Z",
					"2013-03-04T11:01:06Z",
					"2013-03-04T11:01:41Z",
					"2013-03-04T11:03:06Z",
					"2013-03-04T11:03:26Z",
					"2013-03-04T11:04:46Z",
					"2013-03-04T11:05:21Z",
					"2013-03-04T11:06:11Z",
					"2013-03-04T11:07:06Z",
					"2013-03-04T11:07:56Z",
					"2013-03-04T11:09:35Z",
					"2013-03-04T11:14:56Z",
					"2013-03-04T12:04:36Z",
					"2013-03-04T12:04:41Z",
					"2013-03-04T12:08:26Z",
					"2013-03-04T12:09:01Z",
					"2013-03-04T12:09:26Z",
					"2013-03-04T12:09:41Z",
					"2013-03-04T12:11:46Z",
					"2013-03-04T12:11:51Z",
					"2013-03-04T12:14:11Z",
					"2013-03-04T12:14:51Z",
					"2013-03-04T12:15:06Z",
					"2013-03-04T12:15:11Z",
					"2013-03-04T12:15:36Z",
					"2013-03-04T12:15:51Z",
					"2013-03-04T12:16:46Z",
					"2013-03-04T12:18:41Z",
					"2013-03-04T12:20:01Z",
					"2013-03-04T12:20:06Z",
					"2013-03-04T12:22:01Z",
					"2013-03-04T12:25:21Z",
					"2013-03-04T12:25:51Z",
					"2013-03-04T12:26:21Z",
					"2013-03-04T12:27:06Z",
					"2013-03-04T12:28:16Z",
					"2013-03-04T12:29:36Z",
					"2013-03-04T12:31:21Z",
					"2013-03-04T12:31:51Z",
					"2013-03-04T12:34:31Z",
					"2013-03-04T12:36:51Z",
					"2013-03-04T12:38:01Z",
					"2013-03-04T12:38:26Z",
					"2013-03-04T12:38:51Z",
					"2013-03-04T12:40:56Z",
					"2013-03-04T12:43:46Z",
					"2013-03-04T12:44:26Z",
					"2013-03-04T12:47:41Z",
					"2013-03-04T12:49:21Z",
					"2013-03-04T12:50:06Z",
					"2013-03-04T12:50:36Z",
					"2013-03-04T12:50:46Z",
					"2013-03-04T12:51:16Z",
					"2013-03-04T12:52:51Z",
					"2013-03-04T12:53:56Z",
					"2013-03-04T12:56:11Z",
					"2013-03-04T12:56:31Z",
					"2013-03-04T12:57:01Z",
					"2013-03-04T12:58:41Z",
					"2013-03-04T12:58:46Z",
					"2013-03-04T12:59:36Z",
					"2013-03-04T12:59:56Z",
					"2013-03-04T13:00:31Z",
					"2013-03-04T13:05:56Z",
					"2013-03-04T13:06:26Z",
					"2013-03-04T13:07:11Z",
					"2013-03-04T13:07:16Z",
					"2013-03-04T13:07:56Z",
					"2013-03-04T13:08:31Z",
					"2013-03-04T13:08:41Z",
					"2013-03-04T13:11:41Z",
					"2013-03-04T13:12:21Z",
					"2013-03-04T13:13:31Z",
					"2013-03-04T13:25:06Z",
					"2013-03-04T13:25:56Z",
					"2013-03-04T13:26:46Z",
					"2013-03-04T13:27:36Z",
					"2013-03-04T13:28:06Z",
					"2013-03-04T13:28:56Z",
					"2013-03-04T13:30:01Z",
					"2013-03-04T13:31:56Z",
					"2013-03-04T13:32:06Z",
					"2013-03-04T13:32:26Z",
					"2013-03-04T13:32:45Z",
					"2013-03-04T13:33:11Z",
					"2013-03-04T13:34:01Z",
					"2013-03-04T13:34:21Z",
					"2013-03-04T13:34:36Z",
					"2013-03-04T13:35:35Z",
					"2013-03-04T13:41:41Z",
					"2013-03-04T13:41:56Z",
					"2013-03-04T13:42:26Z",
					"2013-03-04T13:43:21Z",
					"2013-03-04T13:44:31Z",
					"2013-03-04T13:46:01Z",
					"2013-03-04T13:48:01Z",
					"2013-03-04T13:49:56Z",
					"2013-03-04T13:50:11Z",
					"2013-03-04T13:55:51Z",
					"2013-03-04T13:58:06Z",
					"2013-03-04T13:59:56Z",
					"2013-03-04T14:00:11Z",
					"2013-03-05T08:10:46Z",
					"2013-03-05T08:12:31Z",
					"2013-03-05T08:14:56Z",
					"2013-03-05T08:15:36Z",
					"2013-03-05T08:17:01Z",
					"2013-03-05T08:17:56Z",
					"2013-03-05T08:19:26Z",
					"2013-03-05T08:19:36Z",
					"2013-03-05T08:20:16Z",
					"2013-03-05T08:20:31Z",
					"2013-03-05T08:21:16Z",
					"2013-03-05T08:22:16Z",
					"2013-03-05T08:24:01Z",
					"2013-03-05T08:25:26Z",
					"2013-03-05T08:27:16Z",
					"2013-03-05T08:28:11Z",
					"2013-03-05T08:28:51Z",
					"2013-03-05T08:30:21Z",
					"2013-03-05T08:30:51Z",
					"2013-03-05T08:32:56Z",
					"2013-03-05T08:35:51Z",
					"2013-03-05T08:36:21Z",
					"2013-03-05T08:36:51Z",
					"2013-03-05T08:36:56Z",
					"2013-03-05T08:38:11Z",
					"2013-03-05T08:38:36Z",
					"2013-03-05T08:39:41Z",
					"2013-03-05T08:41:21Z",
					"2013-03-05T08:41:56Z",
					"2013-03-05T08:42:31Z",
					"2013-03-05T08:43:26Z",
					"2013-03-05T08:44:16Z",
					"2013-03-05T08:44:21Z",
					"2013-03-05T08:44:46Z",
					"2013-03-05T08:45:41Z",
					"2013-03-05T08:45:56Z",
					"2013-03-05T08:46:21Z",
					"2013-03-05T08:46:41Z",
					"2013-03-05T08:47:46Z",
					"2013-03-05T08:48:16Z",
					"2013-03-05T08:48:56Z",
					"2013-03-05T08:52:01Z",
					"2013-03-05T08:52:36Z",
					"2013-03-05T08:53:21Z",
					"2013-03-05T08:54:36Z",
					"2013-03-05T08:55:06Z",
					"2013-03-05T08:55:56Z",
					"2013-03-05T08:56:36Z",
					"2013-03-05T08:59:11Z",
					"2013-03-05T08:59:41Z",
					"2013-03-05T09:02:51Z",
					"2013-03-05T09:38:49Z",
					"2013-03-05T09:39:14Z",
					"2013-03-05T09:40:34Z",
					"2013-03-05T09:40:59Z",
					"2013-03-05T09:41:44Z",
					"2013-03-05T09:46:34Z",
					"2013-03-05T09:46:54Z",
					"2013-03-05T09:48:24Z",
					"2013-03-05T09:51:29Z",
					"2013-03-05T09:52:19Z",
					"2013-03-05T09:53:04Z",
					"2013-03-05T09:58:49Z",
					"2013-03-05T10:00:19Z",
					"2013-03-05T10:00:49Z",
					"2013-03-05T10:03:44Z",
					"2013-03-05T10:04:24Z",
					"2013-03-05T10:05:29Z",
					"2013-03-05T10:08:24Z",
					"2013-03-05T10:08:49Z",
					"2013-03-05T10:09:39Z",
					"2013-03-05T10:10:09Z",
					"2013-03-05T10:11:44Z",
					"2013-03-05T10:16:29Z",
					"2013-03-05T10:17:34Z",
					"2013-03-05T10:19:04Z",
					"2013-03-05T10:19:54Z",
					"2013-03-05T10:22:54Z",
					"2013-03-05T10:23:14Z",
					"2013-03-05T10:23:59Z",
					"2013-03-05T10:24:39Z",
					"2013-03-05T10:24:44Z",
					"2013-03-05T10:24:54Z",
					"2013-03-05T10:25:09Z",
					"2013-03-05T10:25:29Z",
					"2013-03-05T10:31:09Z",
					"2013-03-05T10:31:39Z",
					"2013-03-05T10:32:14Z",
					"2013-03-05T10:33:04Z",
					"2013-03-05T10:33:34Z",
					"2013-03-05T10:34:34Z",
					"2013-03-05T10:35:19Z",
					"2013-03-05T10:35:59Z",
					"2013-03-05T10:36:24Z",
					"2013-03-05T10:36:29Z",
					"2013-03-05T10:38:19Z",
					"2013-03-05T10:39:39Z",
					"2013-03-05T10:40:24Z",
					"2013-03-05T10:44:14Z",
					"2013-03-05T10:46:24Z",
					"2013-03-05T10:49:19Z",
					"2013-03-05T10:51:19Z",
					"2013-03-05T10:52:34Z",
					"2013-03-05T10:53:24Z",
					"2013-03-05T10:53:59Z",
					"2013-03-05T10:54:54Z",
					"2013-03-05T10:54:59Z",
					"2013-03-05T10:56:19Z",
					"2013-03-05T11:52:24Z",
					"2013-03-05T11:52:14Z",
					"2013-03-05T11:51:24Z",
					"2013-03-05T11:48:19Z",
					"2013-03-05T11:46:59Z",
					"2013-03-05T11:45:39Z",
					"2013-03-05T11:45:24Z",
					"2013-03-05T11:45:09Z",
					"2013-03-05T11:44:04Z",
					"2013-03-05T11:38:04Z",
					"2013-03-05T11:37:14Z",
					"2013-03-05T11:36:54Z",
					"2013-03-05T11:36:49Z",
					"2013-03-05T12:11:44Z",
					"2013-03-05T12:12:54Z",
					"2013-03-05T12:13:49Z",
					"2013-03-05T12:15:44Z",
					"2013-03-05T12:16:04Z",
					"2013-03-05T12:18:14Z",
					"2013-03-05T12:20:39Z",
					"2013-03-05T12:23:29Z",
					"2013-03-05T12:25:09Z",
					"2013-03-05T12:25:24Z",
					"2013-03-05T12:26:09Z",
					"2013-03-05T12:27:39Z",
					"2013-03-05T12:28:09Z",
					"2013-03-05T12:28:39Z",
					"2013-03-05T12:28:59Z",
					"2013-03-05T12:30:09Z",
					"2013-03-05T12:33:24Z",
					"2013-03-05T12:33:34Z",
					"2013-03-05T12:34:14Z",
					"2013-03-05T12:34:29Z",
					"2013-03-05T12:34:54Z",
					"2013-03-05T12:36:19Z",
					"2013-03-05T12:39:04Z",
					"2013-03-05T12:40:29Z",
					"2013-03-05T12:41:29Z",
					"2013-03-05T12:42:39Z",
					"2013-03-05T12:43:34Z",
					"2013-03-05T12:45:34Z",
					"2013-03-05T12:46:09Z",
					"2013-03-05T12:46:44Z",
					"2013-03-05T12:49:49Z",
					"2013-03-05T12:51:54Z",
					"2013-03-05T12:52:34Z",
					"2013-03-05T12:53:14Z",
					"2013-03-05T12:55:04Z",
					"2013-03-05T12:55:19Z",
					"2013-03-05T12:55:44Z",
					"2013-03-05T12:56:04Z",
					"2013-03-05T12:56:34Z",
					"2013-03-05T12:57:14Z",
					"2013-03-05T12:57:49Z",
					"2013-03-05T12:58:09Z",
					"2013-03-05T12:58:54Z",
					"2013-03-05T13:00:29Z",
					"2013-03-05T13:03:09Z",
					"2013-03-05T13:03:44Z",
					"2013-03-05T13:11:39Z",
					"2013-03-05T13:12:04Z",
					"2013-03-05T13:15:14Z",
					"2013-03-05T13:15:34Z",
					"2013-03-05T13:16:09Z",
					"2013-03-05T13:17:53Z",
					"2013-03-05T13:18:59Z",
					"2013-03-05T13:20:19Z",
					"2013-03-05T13:21:04Z",
					"2013-03-05T13:23:54Z",
					"2013-03-05T13:24:04Z",
					"2013-03-05T13:24:34Z",
					"2013-03-05T13:24:39Z",
					"2013-03-05T13:24:54Z",
					"2013-03-05T13:28:49Z",
					"2013-03-05T13:30:34Z",
					"2013-03-05T13:31:19Z",
					"2013-03-05T13:31:54Z",
					"2013-03-05T13:32:39Z",
					"2013-03-05T13:33:19Z",
					"2013-03-05T13:34:24Z",
					"2013-03-05T13:34:34Z",
					"2013-03-05T13:36:09Z",
					"2013-03-05T13:39:29Z",
					"2013-03-05T13:41:34Z",
					"2013-03-05T13:43:39Z",
					"2013-03-05T13:44:09Z",
					"2013-03-05T13:44:59Z",
					"2013-03-05T13:45:09Z",
					"2013-03-05T13:46:04Z",
					"2013-03-05T13:46:09Z",
					"2013-03-05T13:52:44Z",
					"2013-03-05T13:53:04Z",
					"2013-03-05T13:53:49Z",
					"2013-03-05T13:54:59Z",
					"2013-03-05T13:55:59Z",
					"2013-03-05T13:56:14Z",
					"2013-03-05T13:58:09Z",
					"2013-03-05T13:58:54Z",
					"2013-03-05T13:59:19Z",
					"2013-03-05T13:59:29Z",
					"2013-03-05T14:01:09Z",
					"2013-03-05T14:02:49Z",
					"2013-03-05T14:04:04Z",
					"2013-03-05T14:04:49Z",
					"2013-03-05T14:05:49Z",
					"2013-03-05T14:06:14Z",
					"2013-03-05T14:06:54Z",
					"2013-03-05T14:06:59Z",
					"2013-03-05T14:07:14Z",
					"2013-03-05T14:07:39Z",
					"2013-03-05T14:07:59Z",
					"2013-03-05T14:08:04Z",
					"2013-03-05T14:08:18Z",
					"2013-03-05T09:08:04Z",
					"2013-03-05T09:10:04Z",
					"2013-03-05T09:10:39Z",
					"2013-03-05T09:11:04Z",
					"2013-03-05T09:11:39Z",
					"2013-03-05T09:13:04Z",
					"2013-03-05T09:13:29Z",
					"2013-03-05T09:13:39Z",
					"2013-03-05T09:14:24Z",
					"2013-03-05T09:16:04Z",
					"2013-03-05T09:18:14Z",
					"2013-03-05T09:18:39Z",
					"2013-03-05T09:19:29Z",
					"2013-03-05T09:25:29Z",
					"2013-03-05T09:25:39Z",
					"2013-03-05T09:25:59Z",
					"2013-03-05T09:26:19Z",
					"2013-03-05T09:26:54Z",
					"2013-03-05T09:27:39Z",
					"2013-03-05T09:29:24Z",
					"2013-03-05T09:29:39Z",
					"2013-03-05T09:29:59Z",
					"2013-03-05T09:31:04Z",
					"2013-03-05T10:02:49Z",
					"2013-03-05T10:04:04Z",
					"2013-03-05T10:04:54Z",
					"2013-03-05T10:05:24Z",
					"2013-03-05T10:05:59Z",
					"2013-03-05T10:06:49Z",
					"2013-03-05T10:07:24Z",
					"2013-03-05T10:09:24Z",
					"2013-03-05T10:09:49Z",
					"2013-03-05T10:10:39Z",
					"2013-03-05T10:10:59Z",
					"2013-03-05T10:11:24Z",
					"2013-03-05T10:11:34Z",
					"2013-03-05T10:11:44Z",
					"2013-03-05T10:12:29Z",
					"2013-03-05T10:12:34Z",
					"2013-03-05T10:12:59Z",
					"2013-03-05T10:13:39Z",
					"2013-03-05T10:13:49Z",
					"2013-03-05T10:14:49Z",
					"2013-03-05T10:15:34Z",
					"2013-03-05T10:16:19Z",
					"2013-03-05T10:16:34Z",
					"2013-03-05T10:16:44Z",
					"2013-03-05T10:19:09Z",
					"2013-03-05T10:19:49Z",
					"2013-03-05T10:20:29Z",
					"2013-03-05T10:21:19Z",
					"2013-03-05T10:21:54Z",
					"2013-03-05T10:22:19Z",
					"2013-03-05T10:26:04Z",
					"2013-03-05T10:26:09Z",
					"2013-03-05T10:26:14Z",
					"2013-03-05T10:28:14Z",
					"2013-03-05T10:29:04Z",
					"2013-03-05T10:29:39Z",
					"2013-03-05T10:30:49Z",
					"2013-03-05T10:31:24Z",
					"2013-03-05T10:35:09Z",
					"2013-03-05T10:38:09Z",
					"2013-03-05T10:38:24Z",
					"2013-03-05T10:38:49Z",
					"2013-03-05T10:38:59Z",
					"2013-03-05T10:40:54Z",
					"2013-03-05T10:43:24Z",
					"2013-03-05T10:43:49Z",
					"2013-03-05T10:44:49Z",
					"2013-03-05T10:45:04Z",
					"2013-03-05T10:45:24Z",
					"2013-03-05T10:45:59Z",
					"2013-03-05T10:46:34Z",
					"2013-03-05T10:48:19Z",
					"2013-03-05T10:48:44Z",
					"2013-03-05T10:49:14Z",
					"2013-03-05T10:49:49Z",
					"2013-03-05T10:51:04Z",
					"2013-03-05T10:52:04Z",
					"2013-03-05T10:57:29Z",
					"2013-03-05T10:57:44Z",
					"2013-03-05T10:57:59Z",
					"2013-03-05T10:59:09Z",
					"2013-03-05T10:59:44Z",
					"2013-03-05T11:00:24Z",
					"2013-03-05T11:01:24Z",
					"2013-03-05T11:01:39Z",
					"2013-03-05T11:07:14Z",
					"2013-03-05T11:07:44Z",
					"2013-03-05T11:08:04Z",
					"2013-03-05T11:08:59Z",
					"2013-03-05T11:10:49Z",
					"2013-03-05T11:11:39Z",
					"2013-03-05T11:12:13Z",
					"2013-03-05T11:21:34Z",
					"2013-03-05T11:22:19Z",
					"2013-03-05T11:22:53Z",
					"2013-03-05T11:24:29Z",
					"2013-03-05T11:24:54Z",
					"2013-03-05T11:26:54Z",
					"2013-03-05T11:27:09Z",
					"2013-03-05T11:27:29Z",
					"2013-03-05T11:27:59Z",
					"2013-03-05T11:28:39Z",
					"2013-03-05T11:30:44Z",
					"2013-03-05T11:32:09Z",
					"2013-03-05T11:32:44Z",
					"2013-03-05T11:33:29Z",
					"2013-03-05T11:36:59Z",
					"2013-03-05T11:37:54Z",
					"2013-03-05T11:43:59Z",
					"2013-03-05T11:44:39Z",
					"2013-03-05T11:45:24Z",
					"2013-03-05T11:46:44Z",
					"2013-03-05T11:47:14Z",
					"2013-03-05T11:49:28Z",
					"2013-03-05T11:50:39Z",
					"2013-03-05T11:55:24Z",
					"2013-03-05T11:55:34Z",
					"2013-03-05T11:55:44Z",
					"2013-03-05T11:56:19Z",
					"2013-03-05T11:58:39Z",
					"2013-03-05T12:06:04Z",
					"2013-03-05T12:06:54Z",
					"2013-03-05T12:12:04Z",
					"2013-03-05T12:12:24Z",
					"2013-03-05T12:12:39Z",
					"2013-03-05T12:13:04Z",
					"2013-03-05T12:13:44Z",
					"2013-03-05T12:13:54Z",
					"2013-03-05T12:14:14Z",
					"2013-03-05T12:15:14Z",
					"2013-03-05T12:15:39Z",
					"2013-03-05T12:17:34Z",
					"2013-03-05T12:18:19Z",
					"2013-03-05T12:20:34Z",
					"2013-03-05T12:20:59Z",
					"2013-03-05T12:21:24Z",
					"2013-03-05T12:21:39Z",
					"2013-03-05T12:21:49Z",
					"2013-03-05T12:22:29Z",
					"2013-03-05T12:22:44Z",
					"2013-03-05T12:23:19Z",
					"2013-03-05T12:24:14Z",
					"2013-03-05T12:27:14Z",
					"2013-03-05T12:27:39Z",
					"2013-03-05T12:28:09Z",
					"2013-03-05T12:28:29Z",
					"2013-03-05T12:28:59Z",
					"2013-03-05T12:29:19Z",
					"2013-03-05T12:29:49Z",
					"2013-03-05T12:30:24Z",
					"2013-03-05T12:30:39Z",
					"2013-03-05T12:30:49Z",
					"2013-03-05T12:31:49Z",
					"2013-03-05T12:32:09Z",
					"2013-03-05T12:33:44Z",
					"2013-03-05T12:33:49Z",
					"2013-03-05T12:34:19Z",
					"2013-03-05T12:38:24Z",
					"2013-03-05T12:40:04Z",
					"2013-03-05T12:40:19Z",
					"2013-03-05T12:40:29Z",
					"2013-03-05T12:41:59Z",
					"2013-03-05T12:42:44Z",
					"2013-03-05T12:43:09Z",
					"2013-03-05T12:45:54Z",
					"2013-03-05T12:46:14Z",
					"2013-03-05T12:48:44Z",
					"2013-03-05T12:49:09Z",
					"2013-03-05T12:49:19Z",
					"2013-03-05T12:49:29Z",
					"2013-03-05T12:49:59Z",
					"2013-03-05T12:51:29Z",
					"2013-03-05T12:52:59Z",
					"2013-03-05T12:53:24Z",
					"2013-03-05T12:53:39Z",
					"2013-03-05T12:54:14Z",
					"2013-03-05T12:54:39Z",
					"2013-03-05T12:55:14Z",
					"2013-03-05T13:02:49Z",
					"2013-03-05T13:03:14Z",
					"2013-03-05T13:05:49Z",
					"2013-03-05T13:05:59Z",
					"2013-03-05T13:06:49Z",
					"2013-03-05T13:06:59Z",
					"2013-03-05T13:09:49Z",
					"2013-03-05T13:10:29Z",
					"2013-03-05T13:36:04Z",
					"2013-03-05T13:37:19Z",
					"2013-03-05T13:37:54Z",
					"2013-03-05T13:38:49Z",
					"2013-03-05T13:39:14Z",
					"2013-03-05T13:40:09Z",
					"2013-03-05T13:42:59Z",
					"2013-03-05T13:44:39Z",
					"2013-03-05T13:44:49Z",
					"2013-03-05T13:45:49Z",
					"2013-03-05T13:50:44Z",
					"2013-03-05T13:52:09Z",
					"2013-03-05T13:52:24Z",
					"2013-03-05T13:52:54Z",
					"2013-03-05T13:53:14Z",
					"2013-03-05T13:53:29Z",
					"2013-03-05T13:54:04Z",
					"2013-03-05T13:54:39Z",
					"2013-03-05T13:55:29Z",
					"2013-03-05T13:55:59Z",
					"2013-03-05T13:56:39Z",
					"2013-03-05T13:58:04Z",
					"2013-03-05T13:59:39Z",
					"2013-03-05T14:02:29Z",
					"2013-03-05T14:04:24Z",
					"2013-03-05T14:05:14Z",
					"2013-03-05T14:06:04Z",
					"2013-03-05T14:06:39Z",
					"2013-03-05T14:09:44Z",
					"2013-03-05T14:10:19Z",
					"2013-03-05T14:10:59Z",
					"2013-03-05T14:11:09Z",
					"2013-03-05T14:11:29Z",
					"2013-03-05T14:11:54Z",
					"2013-03-05T14:14:14Z",
					"2013-03-05T14:14:29Z",
					"2013-03-05T14:15:04Z",
					"2013-03-05T14:16:14Z",
					"2013-03-05T14:16:29Z",
					"2013-03-05T14:16:54Z",
					"2013-03-05T14:17:34Z",
					"2013-03-05T14:18:34Z",
					"2013-03-05T14:20:44Z",
					"2013-03-05T14:20:54Z",
					"2013-03-05T14:23:04Z",
					"2013-03-05T14:24:39Z",
					"2013-03-06T07:58:35Z",
					"2013-03-06T07:59:05Z",
					"2013-03-06T07:59:30Z",
					"2013-03-06T08:00:40Z",
					"2013-03-06T08:01:20Z",
					"2013-03-06T08:01:40Z",
					"2013-03-06T08:02:00Z",
					"2013-03-06T08:02:25Z",
					"2013-03-06T08:03:05Z",
					"2013-03-06T08:06:00Z",
					"2013-03-06T08:06:25Z",
					"2013-03-06T08:06:35Z",
					"2013-03-06T08:07:10Z",
					"2013-03-06T08:26:40Z",
					"2013-03-06T08:27:40Z",
					"2013-03-06T08:28:00Z",
					"2013-03-06T08:28:10Z",
					"2013-03-06T08:28:40Z",
					"2013-03-06T09:01:20Z",
					"2013-03-06T09:01:40Z",
					"2013-03-06T09:01:50Z",
					"2013-03-06T09:02:15Z",
					"2013-03-06T09:03:45Z",
					"2013-03-06T09:06:40Z",
					"2013-03-06T09:06:50Z",
					"2013-03-06T09:07:55Z",
					"2013-03-06T09:08:05Z",
					"2013-03-06T09:11:10Z",
					"2013-03-06T09:36:35Z",
					"2013-03-06T09:35:25Z",
					"2013-03-06T09:34:25Z",
					"2013-03-06T09:33:40Z",
					"2013-03-06T09:33:00Z",
					"2013-03-06T09:41:00Z",
					"2013-03-06T09:43:40Z",
					"2013-03-06T09:44:00Z",
					"2013-03-06T09:46:00Z",
					"2013-03-06T09:48:15Z",
					"2013-03-06T09:49:35Z",
					"2013-03-06T09:50:20Z",
					"2013-03-06T09:51:20Z",
					"2013-03-06T09:52:05Z",
					"2013-03-06T09:52:20Z",
					"2013-03-06T09:52:50Z",
					"2013-03-06T09:53:15Z",
					"2013-03-06T09:53:55Z",
					"2013-03-06T09:54:15Z",
					"2013-03-06T09:54:55Z",
					"2013-03-06T09:55:10Z",
					"2013-03-06T09:55:25Z",
					"2013-03-06T09:55:40Z",
					"2013-03-06T09:56:05Z",
					"2013-03-06T09:59:25Z",
					"2013-03-06T10:00:00Z",
					"2013-03-06T10:00:30Z",
					"2013-03-06T10:01:30Z",
					"2013-03-06T10:02:10Z",
					"2013-03-06T10:02:50Z",
					"2013-03-06T10:03:15Z",
					"2013-03-06T10:03:30Z",
					"2013-03-06T10:03:45Z",
					"2013-03-06T10:05:05Z",
					"2013-03-06T10:09:55Z",
					"2013-03-06T10:11:25Z",
					"2013-03-06T10:12:25Z",
					"2013-03-06T10:14:35Z",
					"2013-03-06T10:14:40Z",
					"2013-03-06T10:15:35Z",
					"2013-03-06T10:16:45Z",
					"2013-03-06T10:17:10Z",
					"2013-03-06T10:24:00Z",
					"2013-03-06T10:25:00Z",
					"2013-03-06T10:25:25Z",
					"2013-03-06T10:26:10Z",
					"2013-03-06T10:26:45Z",
					"2013-03-06T10:28:15Z",
					"2013-03-06T10:32:40Z",
					"2013-03-06T10:32:55Z",
					"2013-03-06T10:33:25Z",
					"2013-03-06T10:33:30Z",
					"2013-03-06T10:36:25Z",
					"2013-03-06T10:38:05Z",
					"2013-03-06T10:38:55Z",
					"2013-03-06T10:40:30Z",
					"2013-03-06T10:41:15Z",
					"2013-03-06T10:42:50Z",
					"2013-03-06T10:43:00Z",
					"2013-03-06T10:43:20Z",
					"2013-03-06T11:15:55Z",
					"2013-03-06T11:15:30Z",
					"2013-03-06T11:14:55Z",
					"2013-03-06T11:14:20Z",
					"2013-03-06T11:14:10Z",
					"2013-03-06T11:13:40Z",
					"2013-03-06T11:18:50Z",
					"2013-03-06T11:19:30Z",
					"2013-03-06T11:19:35Z",
					"2013-03-06T11:19:55Z",
					"2013-03-06T11:20:55Z",
					"2013-03-06T11:21:20Z",
					"2013-03-06T11:21:50Z",
					"2013-03-06T11:22:10Z",
					"2013-03-06T11:23:00Z",
					"2013-03-06T11:23:44Z",
					"2013-03-06T11:25:20Z",
					"2013-03-06T11:25:30Z",
					"2013-03-12T13:01:42Z",
					"2013-03-06T16:20:55Z",
					"2013-03-06T14:46:04Z",
					"2013-03-06T12:41:45Z",
					"2013-03-06T12:16:13Z",
					"2013-03-06T08:36:33Z",
					"2013-03-06T08:37:53Z",
					"2013-03-06T08:38:18Z",
					"2013-03-06T08:38:33Z",
					"2013-03-06T08:38:43Z",
					"2013-03-06T08:39:23Z",
					"2013-03-06T08:40:18Z",
					"2013-03-06T08:40:58Z",
					"2013-03-06T08:41:03Z",
					"2013-03-06T08:41:18Z",
					"2013-03-06T08:43:28Z",
					"2013-03-06T08:44:28Z",
					"2013-03-06T08:44:48Z",
					"2013-03-06T08:46:58Z",
					"2013-03-06T08:48:03Z",
					"2013-03-06T08:48:28Z",
					"2013-03-06T08:48:38Z",
					"2013-03-06T08:49:03Z",
					"2013-03-06T08:49:13Z",
					"2013-03-06T08:49:28Z",
					"2013-03-06T08:59:53Z",
					"2013-03-06T09:02:33Z",
					"2013-03-06T09:05:48Z",
					"2013-03-06T09:06:33Z",
					"2013-03-06T09:07:08Z",
					"2013-03-06T09:07:58Z",
					"2013-03-06T09:08:18Z",
					"2013-03-06T09:10:28Z",
					"2013-03-06T09:11:23Z",
					"2013-03-06T09:12:18Z",
					"2013-03-06T09:12:23Z",
					"2013-03-06T09:14:08Z",
					"2013-03-06T09:17:38Z",
					"2013-03-06T09:19:13Z",
					"2013-03-06T09:23:58Z",
					"2013-03-06T09:27:23Z",
					"2013-03-06T09:27:28Z",
					"2013-03-06T09:28:33Z",
					"2013-03-06T09:28:53Z",
					"2013-03-06T09:30:48Z",
					"2013-03-06T09:53:43Z",
					"2013-03-06T09:53:48Z",
					"2013-03-06T09:54:08Z",
					"2013-03-06T09:54:23Z",
					"2013-03-06T09:54:42Z",
					"2013-03-06T09:57:23Z",
					"2013-03-06T09:57:43Z",
					"2013-03-06T09:57:48Z",
					"2013-03-06T10:13:58Z",
					"2013-03-06T10:15:28Z",
					"2013-03-06T10:16:18Z",
					"2013-03-06T10:17:03Z",
					"2013-03-06T10:17:18Z",
					"2013-03-06T10:17:38Z",
					"2013-03-06T10:17:53Z",
					"2013-03-06T10:19:28Z",
					"2013-03-06T10:20:13Z",
					"2013-03-06T10:20:38Z",
					"2013-03-06T10:21:08Z",
					"2013-03-06T10:21:38Z",
					"2013-03-06T10:21:58Z",
					"2013-03-06T10:22:23Z",
					"2013-03-06T10:22:43Z",
					"2013-03-06T10:25:08Z",
					"2013-03-06T10:25:43Z",
					"2013-03-06T10:25:58Z",
					"2013-03-06T10:26:08Z",
					"2013-03-06T10:26:33Z",
					"2013-03-06T10:27:18Z",
					"2013-03-06T10:27:53Z",
					"2013-03-06T10:29:23Z",
					"2013-03-06T10:30:43Z",
					"2013-03-06T10:31:03Z",
					"2013-03-06T10:32:03Z",
					"2013-03-06T10:34:03Z",
					"2013-03-06T10:35:58Z",
					"2013-03-06T10:36:08Z",
					"2013-03-06T10:36:13Z",
					"2013-03-06T10:36:38Z",
					"2013-03-06T10:39:28Z",
					"2013-03-06T10:39:58Z",
					"2013-03-06T10:40:03Z",
					"2013-03-06T10:40:23Z",
					"2013-03-06T10:41:03Z",
					"2013-03-06T10:46:22Z",
					"2013-03-06T10:46:58Z",
					"2013-03-06T11:01:43Z",
					"2013-03-06T11:04:38Z",
					"2013-03-06T11:05:13Z",
					"2013-03-06T11:06:13Z",
					"2013-03-06T11:07:13Z",
					"2013-03-06T11:08:08Z",
					"2013-03-06T11:09:23Z",
					"2013-03-06T11:09:43Z",
					"2013-03-06T11:10:28Z",
					"2013-03-06T11:10:58Z",
					"2013-03-06T11:11:38Z",
					"2013-03-06T11:11:58Z",
					"2013-03-06T11:12:18Z",
					"2013-03-06T11:12:28Z",
					"2013-03-06T11:13:03Z",
					"2013-03-06T11:13:28Z",
					"2013-03-06T11:13:53Z",
					"2013-03-06T11:14:58Z",
					"2013-03-06T11:16:08Z",
					"2013-03-06T11:16:58Z",
					"2013-03-06T11:17:13Z",
					"2013-03-06T11:17:33Z",
					"2013-03-06T11:22:08Z",
					"2013-03-06T11:22:33Z",
					"2013-03-06T11:23:28Z",
					"2013-03-06T11:23:58Z",
					"2013-03-06T11:26:48Z",
					"2013-03-06T11:27:48Z",
					"2013-03-06T11:28:03Z",
					"2013-03-06T11:28:13Z",
					"2013-03-06T11:28:18Z",
					"2013-03-06T11:29:08Z",
					"2013-03-06T11:29:28Z",
					"2013-03-06T11:30:08Z",
					"2013-03-06T11:30:13Z",
					"2013-03-06T11:32:03Z",
					"2013-03-06T11:32:33Z",
					"2013-03-06T11:32:58Z",
					"2013-03-06T11:33:03Z",
					"2013-03-06T11:34:23Z",
					"2013-03-06T11:35:07Z",
					"2013-03-06T11:35:38Z",
					"2013-03-06T11:36:13Z",
					"2013-03-06T11:36:18Z",
					"2013-03-06T11:36:58Z",
					"2013-03-06T11:37:03Z",
					"2013-03-06T11:38:48Z",
					"2013-03-06T11:39:38Z",
					"2013-03-06T11:41:18Z",
					"2013-03-06T11:43:32Z",
					"2013-03-06T11:44:58Z",
					"2013-03-06T11:45:23Z",
					"2013-03-06T11:46:23Z",
					"2013-03-06T11:46:38Z",
					"2013-03-06T11:47:38Z",
					"2013-03-06T11:48:58Z",
					"2013-03-06T11:49:43Z",
					"2013-03-06T11:51:18Z",
					"2013-03-06T11:54:38Z",
					"2013-03-06T11:55:38Z",
					"2013-03-06T11:56:23Z",
					"2013-03-06T12:12:38Z",
					"2013-03-06T12:13:38Z",
					"2013-03-06T12:14:28Z",
					"2013-03-06T12:25:53Z",
					"2013-03-06T12:26:43Z",
					"2013-03-06T12:27:58Z",
					"2013-03-06T12:28:08Z",
					"2013-03-06T12:31:03Z",
					"2013-03-06T12:31:43Z",
					"2013-03-06T12:32:53Z",
					"2013-03-06T12:34:43Z",
					"2013-03-06T12:34:58Z",
					"2013-03-06T12:35:43Z",
					"2013-03-06T12:35:58Z",
					"2013-03-06T12:36:38Z",
					"2013-03-06T12:36:47Z",
					"2013-03-06T12:44:58Z",
					"2013-03-06T12:45:08Z",
					"2013-03-06T12:45:23Z",
					"2013-03-06T12:46:33Z",
					"2013-03-06T12:46:48Z",
					"2013-03-06T12:47:48Z",
					"2013-03-06T12:56:23Z",
					"2013-03-06T12:56:33Z",
					"2013-03-06T12:59:48Z",
					"2013-03-06T13:00:08Z",
					"2013-03-06T13:01:33Z",
					"2013-03-06T13:02:53Z",
					"2013-03-06T13:03:38Z",
					"2013-03-06T13:04:18Z",
					"2013-03-06T13:04:48Z",
					"2013-03-06T13:08:28Z",
					"2013-03-06T13:09:08Z",
					"2013-03-06T13:09:18Z",
					"2013-03-06T13:11:53Z",
					"2013-03-06T13:14:08Z",
					"2013-03-06T13:16:43Z",
					"2013-03-06T13:18:43Z",
					"2013-03-07T09:31:24Z",
					"2013-03-07T09:35:34Z",
					"2013-03-07T09:37:14Z",
					"2013-03-07T09:37:54Z",
					"2013-03-07T09:42:39Z",
					"2013-03-07T09:42:54Z",
					"2013-03-07T09:49:09Z",
					"2013-03-07T09:50:24Z",
					"2013-03-07T09:52:24Z",
					"2013-03-07T09:52:44Z",
					"2013-03-07T09:56:13Z",
					"2013-03-07T10:55:29Z",
					"2013-03-07T10:55:48Z",
					"2013-03-07T10:56:14Z",
					"2013-03-07T10:56:19Z",
					"2013-03-07T10:56:39Z",
					"2013-03-07T10:57:19Z",
					"2013-03-07T10:58:04Z",
					"2013-03-07T10:58:19Z",
					"2013-03-07T10:58:39Z",
					"2013-03-07T10:58:54Z",
					"2013-03-07T10:58:59Z",
					"2013-03-07T10:59:19Z",
					"2013-03-07T10:59:44Z",
					"2013-03-07T11:00:09Z",
					"2013-03-07T11:00:14Z",
					"2013-03-07T11:02:14Z",
					"2013-03-07T11:02:54Z",
					"2013-03-07T11:03:19Z",
					"2013-03-07T11:04:09Z",
					"2013-03-07T11:04:54Z",
					"2013-03-07T11:05:14Z",
					"2013-03-07T11:05:34Z",
					"2013-03-07T11:07:09Z",
					"2013-03-07T11:08:44Z",
					"2013-03-07T11:09:29Z",
					"2013-03-07T11:10:24Z",
					"2013-03-07T11:36:59Z",
					"2013-03-07T11:38:44Z",
					"2013-03-07T12:07:39Z",
					"2013-03-07T12:07:03Z",
					"2013-03-07T12:05:49Z",
					"2013-03-07T12:05:14Z",
					"2013-03-07T12:04:59Z",
					"2013-03-07T12:03:39Z",
					"2013-03-07T12:02:19Z",
					"2013-03-07T11:59:29Z",
					"2013-03-07T12:15:14Z",
					"2013-03-07T12:15:49Z",
					"2013-03-07T12:16:14Z",
					"2013-03-07T12:17:04Z",
					"2013-03-07T12:17:54Z",
					"2013-03-07T12:19:09Z",
					"2013-03-07T12:19:49Z",
					"2013-03-07T12:22:34Z",
					"2013-03-07T12:23:09Z",
					"2013-03-07T12:23:24Z",
					"2013-03-07T12:24:24Z",
					"2013-03-07T12:25:29Z",
					"2013-03-07T12:26:19Z",
					"2013-03-07T12:27:14Z",
					"2013-03-07T12:27:49Z",
					"2013-03-07T12:28:14Z",
					"2013-03-07T12:31:24Z",
					"2013-03-07T12:32:14Z",
					"2013-03-07T12:33:49Z",
					"2013-03-07T12:36:49Z",
					"2013-03-07T12:37:19Z",
					"2013-03-07T12:37:44Z",
					"2013-03-07T12:38:09Z",
					"2013-03-07T12:38:59Z",
					"2013-03-07T12:39:59Z",
					"2013-03-07T12:40:39Z",
					"2013-03-07T12:41:04Z",
					"2013-03-07T12:41:44Z",
					"2013-03-07T13:30:34Z",
					"2013-03-07T13:32:04Z",
					"2013-03-07T13:33:14Z",
					"2013-03-07T13:33:24Z",
					"2013-03-07T13:54:39Z",
					"2013-03-07T13:55:14Z",
					"2013-03-07T13:56:24Z",
					"2013-03-07T13:57:04Z",
					"2013-03-07T13:57:14Z",
					"2013-03-07T13:59:09Z",
					"2013-03-07T14:00:19Z",
					"2013-03-07T14:01:19Z",
					"2013-03-07T14:02:09Z",
					"2013-03-07T14:02:39Z",
					"2013-03-07T14:04:24Z",
					"2013-03-07T14:04:59Z",
					"2013-03-07T14:07:49Z",
					"2013-03-07T14:08:09Z",
					"2013-03-07T14:08:39Z",
					"2013-03-07T14:09:59Z",
					"2013-03-07T14:10:29Z",
					"2013-03-07T14:12:04Z",
					"2013-03-07T14:12:39Z",
					"2013-03-07T14:14:59Z",
					"2013-03-07T14:15:44Z",
					"2013-03-07T14:19:14Z",
					"2013-03-07T09:06:36Z",
					"2013-03-07T09:35:31Z",
					"2013-03-07T09:36:01Z",
					"2013-03-07T09:36:31Z",
					"2013-03-07T09:36:36Z",
					"2013-03-07T09:37:46Z",
					"2013-03-07T09:38:41Z",
					"2013-03-07T09:38:56Z",
					"2013-03-07T09:39:26Z",
					"2013-03-07T09:42:06Z",
					"2013-03-07T09:43:21Z",
					"2013-03-07T09:43:41Z",
					"2013-03-07T09:44:26Z",
					"2013-03-07T09:45:16Z",
					"2013-03-07T09:46:11Z",
					"2013-03-07T09:47:01Z",
					"2013-03-07T09:47:26Z",
					"2013-03-07T09:47:46Z",
					"2013-03-07T09:57:11Z",
					"2013-03-07T09:57:06Z",
					"2013-03-07T09:56:51Z",
					"2013-03-07T09:56:31Z",
					"2013-03-07T09:56:16Z",
					"2013-03-07T09:56:31Z",
					"2013-03-07T09:57:31Z",
					"2013-03-07T10:01:21Z",
					"2013-03-07T10:01:41Z",
					"2013-03-07T10:02:16Z",
					"2013-03-07T10:02:31Z",
					"2013-03-07T10:34:31Z",
					"2013-03-07T10:36:05Z",
					"2013-03-07T10:36:56Z",
					"2013-03-07T10:37:36Z",
					"2013-03-07T10:38:01Z",
					"2013-03-07T10:38:06Z",
					"2013-03-07T10:39:21Z",
					"2013-03-07T10:41:01Z",
					"2013-03-07T11:31:16Z",
					"2013-03-07T11:31:36Z",
					"2013-03-07T11:33:26Z",
					"2013-03-07T11:34:16Z",
					"2013-03-07T11:35:36Z",
					"2013-03-07T11:36:56Z",
					"2013-03-07T11:39:56Z",
					"2013-03-07T11:40:21Z",
					"2013-03-07T11:40:36Z",
					"2013-03-07T11:40:51Z",
					"2013-03-07T11:41:11Z",
					"2013-03-07T11:41:16Z",
					"2013-03-07T11:43:31Z",
					"2013-03-07T11:43:51Z",
					"2013-03-07T11:44:26Z",
					"2013-03-07T11:45:41Z",
					"2013-03-07T11:45:51Z",
					"2013-03-07T11:46:46Z",
					"2013-03-07T11:49:06Z",
					"2013-03-07T11:49:46Z",
					"2013-03-07T11:50:06Z",
					"2013-03-07T11:52:46Z",
					"2013-03-07T11:54:31Z",
					"2013-03-07T11:55:16Z",
					"2013-03-07T11:55:41Z",
					"2013-03-07T11:56:21Z",
					"2013-03-07T11:59:26Z",
					"2013-03-07T12:00:31Z",
					"2013-03-07T12:02:51Z",
					"2013-03-07T12:03:06Z",
					"2013-03-07T12:04:11Z",
					"2013-03-07T12:08:01Z",
					"2013-03-07T12:08:21Z",
					"2013-03-07T12:09:21Z",
					"2013-03-07T12:10:51Z",
					"2013-03-07T12:11:11Z",
					"2013-03-07T12:11:51Z",
					"2013-03-07T12:12:26Z",
					"2013-03-07T12:13:11Z",
					"2013-03-07T12:21:01Z",
					"2013-03-07T12:34:41Z",
					"2013-03-07T12:35:41Z",
					"2013-03-07T12:37:11Z",
					"2013-03-07T12:38:16Z",
					"2013-03-07T12:38:26Z",
					"2013-03-07T12:39:11Z",
					"2013-03-07T12:39:41Z",
					"2013-03-07T12:40:06Z",
					"2013-03-07T12:40:45Z",
					"2013-03-07T12:41:56Z",
					"2013-03-07T12:42:16Z",
					"2013-03-07T12:42:21Z",
					"2013-03-07T12:42:41Z",
					"2013-03-07T12:43:11Z",
					"2013-03-07T12:43:21Z",
					"2013-03-07T12:43:46Z",
					"2013-03-07T12:44:11Z",
					"2013-03-07T12:44:31Z",
					"2013-03-07T12:47:36Z",
					"2013-03-07T12:48:11Z",
					"2013-03-07T12:48:41Z",
					"2013-03-07T12:49:26Z",
					"2013-03-07T12:50:01Z",
					"2013-03-07T12:50:11Z",
					"2013-03-07T12:50:16Z",
					"2013-03-07T12:50:51Z",
					"2013-03-07T12:52:26Z",
					"2013-03-07T12:53:51Z",
					"2013-03-07T12:54:31Z",
					"2013-03-07T12:54:41Z",
					"2013-03-07T12:54:51Z",
					"2013-03-07T12:55:16Z",
					"2013-03-07T12:58:26Z",
					"2013-03-07T12:59:16Z",
					"2013-03-07T12:59:41Z",
					"2013-03-07T13:00:11Z",
					"2013-03-07T13:00:31Z",
					"2013-03-07T13:01:16Z",
					"2013-03-07T13:01:31Z",
					"2013-03-07T13:01:41Z",
					"2013-03-07T13:01:51Z",
					"2013-03-07T13:02:01Z",
					"2013-03-07T13:03:46Z",
					"2013-03-07T13:05:36Z",
					"2013-03-07T13:06:06Z",
					"2013-03-07T13:06:36Z",
					"2013-03-07T13:07:51Z",
					"2013-03-07T13:11:41Z",
					"2013-03-07T13:12:46Z",
					"2013-03-07T13:13:11Z",
					"2013-03-07T13:13:31Z",
					"2013-03-07T13:13:51Z",
					"2013-03-07T13:14:26Z",
					"2013-03-07T13:14:46Z",
					"2013-03-07T13:14:51Z",
					"2013-03-07T13:15:06Z",
					"2013-03-07T13:15:31Z",
					"2013-03-07T13:16:56Z",
					"2013-03-07T13:17:21Z",
					"2013-03-07T13:17:56Z",
					"2013-03-07T13:18:31Z",
					"2013-03-07T13:19:16Z",
					"2013-03-07T13:19:36Z",
					"2013-03-07T13:20:41Z",
					"2013-03-07T13:20:51Z",
					"2013-03-07T13:21:01Z",
					"2013-03-07T13:21:31Z",
					"2013-03-07T13:21:41Z",
					"2013-03-07T13:22:06Z",
					"2013-03-07T13:22:36Z",
					"2013-03-07T13:22:46Z",
					"2013-03-07T13:22:56Z",
					"2013-03-07T13:23:31Z",
					"2013-03-07T13:23:56Z",
					"2013-03-07T13:25:16Z",
					"2013-03-07T13:25:51Z",
					"2013-03-07T13:25:56Z",
					"2013-03-07T13:26:01Z",
					"2013-03-07T13:26:36Z",
					"2013-03-07T13:26:56Z",
					"2013-03-08T08:54:01Z",
					"2013-03-08T08:55:21Z",
					"2013-03-08T08:59:06Z",
					"2013-03-08T08:59:26Z",
					"2013-03-08T09:00:06Z",
					"2013-03-08T09:00:31Z",
					"2013-03-08T09:01:16Z",
					"2013-03-08T09:02:31Z",
					"2013-03-08T09:03:06Z",
					"2013-03-08T09:03:41Z",
					"2013-03-08T09:04:01Z",
					"2013-03-08T09:04:21Z",
					"2013-03-08T09:05:01Z",
					"2013-03-08T09:08:01Z",
					"2013-03-08T09:08:26Z",
					"2013-03-08T09:14:51Z",
					"2013-03-08T09:16:01Z",
					"2013-03-08T09:16:41Z",
					"2013-03-08T09:17:26Z",
					"2013-03-08T09:19:06Z",
					"2013-03-08T09:19:51Z",
					"2013-03-08T09:20:11Z",
					"2013-03-08T09:20:36Z",
					"2013-03-08T09:26:06Z",
					"2013-03-08T09:26:41Z",
					"2013-03-08T09:27:21Z",
					"2013-03-08T09:28:36Z",
					"2013-03-08T09:29:06Z",
					"2013-03-08T09:29:56Z",
					"2013-03-08T09:30:21Z",
					"2013-03-08T09:30:41Z",
					"2013-03-08T09:31:11Z",
					"2013-03-08T09:31:41Z",
					"2013-03-08T09:31:46Z",
					"2013-03-08T09:31:56Z",
					"2013-03-08T09:32:56Z",
					"2013-03-08T09:33:26Z",
					"2013-03-08T09:34:06Z",
					"2013-03-08T09:34:41Z",
					"2013-03-08T09:35:01Z",
					"2013-03-08T09:35:16Z",
					"2013-03-08T09:35:26Z",
					"2013-03-08T09:35:51Z",
					"2013-03-08T09:36:36Z",
					"2013-03-08T09:39:21Z",
					"2013-03-08T09:40:26Z",
					"2013-03-08T09:40:46Z",
					"2013-03-08T09:42:16Z",
					"2013-03-08T10:12:56Z",
					"2013-03-08T10:13:21Z",
					"2013-03-08T10:13:56Z",
					"2013-03-08T10:14:36Z",
					"2013-03-08T10:15:16Z",
					"2013-03-08T10:15:51Z",
					"2013-03-08T10:16:11Z",
					"2013-03-08T10:16:31Z",
					"2013-03-08T10:16:41Z",
					"2013-03-08T10:18:01Z",
					"2013-03-08T10:23:51Z",
					"2013-03-08T10:24:11Z",
					"2013-03-08T10:24:51Z",
					"2013-03-08T10:25:31Z",
					"2013-03-08T10:25:56Z",
					"2013-03-08T10:26:51Z",
					"2013-03-08T10:28:46Z",
					"2013-03-08T10:29:41Z",
					"2013-03-08T10:30:01Z",
					"2013-03-08T10:31:41Z",
					"2013-03-08T10:32:06Z",
					"2013-03-08T10:33:01Z",
					"2013-03-08T10:34:26Z",
					"2013-03-08T10:40:01Z",
					"2013-03-08T10:40:11Z",
					"2013-03-08T10:40:41Z",
					"2013-03-08T10:41:46Z",
					"2013-03-08T10:42:56Z",
					"2013-03-08T10:43:16Z",
					"2013-03-08T10:43:21Z",
					"2013-03-08T10:43:51Z",
					"2013-03-08T10:44:41Z",
					"2013-03-08T10:45:06Z",
					"2013-03-08T10:46:21Z",
					"2013-03-08T10:47:06Z",
					"2013-03-08T10:47:36Z",
					"2013-03-08T10:48:56Z",
					"2013-03-08T10:49:56Z",
					"2013-03-08T10:53:16Z",
					"2013-03-08T10:52:51Z",
					"2013-03-08T10:52:26Z",
					"2013-03-08T10:54:01Z",
					"2013-03-08T10:54:36Z",
					"2013-03-08T10:55:16Z",
					"2013-03-08T10:55:31Z",
					"2013-03-08T10:55:51Z",
					"2013-03-08T10:56:15Z",
					"2013-03-08T10:59:51Z",
					"2013-03-08T11:01:16Z",
					"2013-03-08T11:02:06Z",
					"2013-03-08T11:02:11Z",
					"2013-03-08T11:02:56Z",
					"2013-03-08T11:03:11Z",
					"2013-03-08T11:03:31Z",
					"2013-03-08T11:04:06Z",
					"2013-03-08T11:10:11Z",
					"2013-03-08T11:11:31Z",
					"2013-03-08T11:12:46Z",
					"2013-03-08T11:28:01Z",
					"2013-03-08T11:28:06Z",
					"2013-03-08T11:29:21Z",
					"2013-03-08T11:29:46Z",
					"2013-03-08T11:30:01Z",
					"2013-03-08T11:31:06Z",
					"2013-03-08T11:31:36Z",
					"2013-03-08T11:32:46Z",
					"2013-03-08T11:33:26Z",
					"2013-03-08T11:34:06Z",
					"2013-03-08T11:35:56Z",
					"2013-03-08T11:36:31Z",
					"2013-03-08T11:37:01Z",
					"2013-03-08T11:37:41Z",
					"2013-03-08T11:38:11Z",
					"2013-03-08T11:38:56Z",
					"2013-03-08T11:39:31Z",
					"2013-03-08T11:39:41Z",
					"2013-03-08T11:46:31Z",
					"2013-03-08T11:46:46Z",
					"2013-03-08T11:47:06Z",
					"2013-03-08T11:47:31Z",
					"2013-03-08T11:48:16Z",
					"2013-03-08T11:50:36Z",
					"2013-03-08T11:51:01Z",
					"2013-03-08T11:51:41Z",
					"2013-03-08T11:52:06Z",
					"2013-03-08T11:53:06Z",
					"2013-03-08T11:53:36Z",
					"2013-03-08T11:53:51Z",
					"2013-03-08T11:54:01Z",
					"2013-03-08T11:54:36Z",
					"2013-03-08T11:56:51Z",
					"2013-03-08T11:57:51Z",
					"2013-03-08T11:58:16Z",
					"2013-03-08T11:58:36Z",
					"2013-03-08T11:58:51Z",
					"2013-03-08T12:01:56Z",
					"2013-03-08T12:04:36Z",
					"2013-03-08T12:06:26Z",
					"2013-03-08T12:06:41Z",
					"2013-03-08T12:07:46Z",
					"2013-03-08T12:08:06Z",
					"2013-03-08T12:08:36Z",
					"2013-03-08T12:11:41Z",
					"2013-03-08T12:12:36Z",
					"2013-03-08T12:13:36Z",
					"2013-03-08T12:13:41Z",
					"2013-03-08T12:14:01Z",
					"2013-03-08T12:15:16Z",
					"2013-03-08T12:16:01Z",
					"2013-03-08T12:16:16Z",
					"2013-03-08T12:18:11Z",
					"2013-03-08T12:20:16Z",
					"2013-03-08T12:20:51Z",
					"2013-03-08T12:21:51Z",
					"2013-03-08T12:22:06Z",
					"2013-03-08T12:22:36Z",
					"2013-03-08T12:22:51Z",
					"2013-03-08T12:25:06Z",
					"2013-03-08T12:25:16Z",
					"2013-03-08T12:25:31Z",
					"2013-03-08T12:25:56Z",
					"2013-03-08T12:26:11Z",
					"2013-03-08T12:26:31Z",
					"2013-03-08T12:26:51Z",
					"2013-03-08T12:27:16Z",
					"2013-03-08T12:27:36Z",
					"2013-03-08T12:27:46Z",
					"2013-03-08T12:28:06Z",
					"2013-03-08T12:28:46Z",
					"2013-03-08T12:29:26Z",
					"2013-03-08T12:31:41Z",
					"2013-03-08T12:31:51Z",
					"2013-03-08T12:31:56Z",
					"2013-03-08T12:32:16Z",
					"2013-03-08T12:32:46Z",
					"2013-03-08T12:34:06Z",
					"2013-03-08T12:35:26Z",
					"2013-03-08T12:37:51Z",
					"2013-03-08T12:38:11Z",
					"2013-03-08T12:38:31Z",
					"2013-03-08T12:38:41Z",
					"2013-03-08T12:38:56Z",
					"2013-03-08T12:39:06Z",
					"2013-03-08T12:40:16Z",
					"2013-03-08T12:42:26Z",
					"2013-03-08T12:42:56Z",
					"2013-03-08T12:43:06Z",
					"2013-03-08T12:43:51Z",
					"2013-03-08T12:44:11Z",
					"2013-03-08T12:44:21Z",
					"2013-03-08T12:45:26Z",
					"2013-03-08T12:45:46Z",
					"2013-03-08T12:45:51Z",
					"2013-03-08T12:46:26Z",
					"2013-03-08T12:48:01Z",
					"2013-03-08T12:49:11Z",
					"2013-03-08T12:49:51Z",
					"2013-03-08T12:51:36Z",
					"2013-03-08T12:52:36Z",
					"2013-03-08T12:53:21Z",
					"2013-03-08T12:53:51Z",
					"2013-03-08T12:54:21Z",
					"2013-03-08T12:55:51Z",
					"2013-03-08T12:56:51Z",
					"2013-03-08T12:57:21Z",
					"2013-03-08T12:58:41Z",
					"2013-03-08T13:00:06Z",
					"2013-03-08T13:03:41Z",
					"2013-03-08T13:03:56Z",
					"2013-03-08T13:04:36Z",
					"2013-03-08T13:05:56Z",
					"2013-03-08T13:10:16Z",
					"2013-03-08T13:10:26Z",
					"2013-03-08T13:11:36Z",
					"2013-03-08T13:12:06Z",
					"2013-03-08T13:12:51Z",
					"2013-03-08T13:13:11Z",
					"2013-03-08T13:13:26Z",
					"2013-03-08T09:32:49Z",
					"2013-03-08T09:34:14Z",
					"2013-03-08T09:34:29Z",
					"2008-01-20T05:40:42Z",
					"2008-01-20T05:32:57Z",
					"2008-01-20T05:28:35Z",
					"2008-01-20T05:27:23Z",
					"2008-01-20T05:23:51Z",
					"2008-01-20T05:23:29Z",
					"2008-01-20T05:20:52Z",
					"2008-01-20T05:18:22Z",
					"2008-01-20T05:15:16Z",
					"2008-01-20T05:13:51Z",
					"2008-01-20T05:13:14Z",
					"2008-01-20T05:12:53Z",
					"2008-01-20T05:12:52Z",
					"2008-01-20T05:12:42Z",
					"2008-01-20T05:12:29Z",
					"2008-01-20T05:12:26Z",
					"2008-01-20T05:12:05Z",
					"2008-01-20T05:11:53Z",
					"2008-01-20T05:11:28Z",
					"2008-01-20T05:10:44Z",
					"2008-01-20T05:10:08Z",
					"2008-01-20T05:09:39Z",
					"2008-01-20T05:09:07Z",
					"2008-01-20T05:08:27Z",
					"2008-01-20T05:08:18Z",
					"2008-01-20T05:08:06Z",
					"2008-01-20T05:07:08Z",
					"2008-01-20T05:05:06Z",
					"2008-01-20T05:01:21Z",
					"2008-01-20T05:00:20Z",
					"2008-01-20T04:59:59Z",
					"2008-01-20T04:57:33Z",
					"2008-01-20T04:57:09Z",
					"2008-01-20T04:56:51Z",
					"2008-01-20T04:56:42Z",
					"2008-01-20T04:56:34Z",
					"2008-01-20T04:56:27Z",
					"2008-01-20T04:56:19Z",
					"2008-01-20T04:56:17Z",
					"2008-01-20T04:56:10Z",
					"2008-01-20T04:56:02Z",
					"2008-01-20T04:55:39Z",
					"2008-01-20T04:55:14Z",
					"2008-01-20T04:55:12Z",
					"2008-01-20T04:53:59Z",
					"2008-01-20T04:53:14Z",
					"2008-01-20T04:52:46Z",
					"2008-01-20T04:52:28Z",
					"2008-01-20T04:51:43Z",
					"2008-01-20T04:51:05Z",
					"2008-01-20T04:49:04Z",
					"2008-01-20T04:48:58Z",
					"2008-01-20T04:48:00Z",
					"2008-01-20T04:43:25Z",
					"2008-01-20T04:42:23Z",
					"2008-01-20T04:39:57Z",
					"2008-01-20T04:38:11Z",
					"2008-01-20T04:36:53Z",
					"2008-01-20T04:36:37Z",
					"2008-01-20T04:36:33Z",
					"2008-01-20T04:34:23Z",
					"2008-01-20T04:32:21Z",
					"2008-01-20T04:32:00Z",
					"2008-01-20T04:28:47Z",
					"2008-01-20T04:25:58Z",
					"2008-01-20T04:23:43Z",
					"2008-01-20T04:23:27Z",
					"2008-01-20T04:23:05Z",
					"2008-01-20T04:23:03Z",
					"2008-01-20T04:22:19Z",
					"2008-01-20T04:21:36Z",
					"2008-01-20T04:20:30Z",
					"2008-01-20T04:19:52Z",
					"2008-01-20T04:18:07Z",
					"2008-01-20T04:17:48Z",
					"2008-01-20T04:17:12Z",
					"2008-01-20T04:17:03Z",
					"2008-01-20T04:16:25Z",
					"2008-01-20T04:16:01Z",
					"2008-01-20T04:15:35Z",
					"2008-01-20T04:14:24Z",
					"2008-01-20T04:14:18Z",
					"2008-01-20T04:12:54Z",
					"2008-01-20T04:12:29Z",
					"2008-01-20T04:11:59Z",
					"2008-01-20T04:10:18Z",
					"2008-01-20T04:10:03Z",
					"2008-01-20T04:09:51Z",
					"2008-01-20T04:09:35Z",
					"2008-01-20T04:08:25Z",
					"2008-01-20T04:07:53Z",
					"2008-01-20T04:05:35Z",
					"2008-01-20T04:04:05Z",
					"2008-01-20T04:01:44Z",
					"2008-01-20T04:00:42Z",
					"2008-01-20T03:56:39Z",
					"2008-01-20T03:55:39Z",
					"2008-01-20T03:00:46Z",
					"2008-01-20T03:00:05Z",
					"2008-01-20T02:59:48Z",
					"2008-01-20T02:59:24Z",
					"2008-01-20T02:59:22Z",
					"2008-01-20T02:58:29Z",
					"2008-01-20T02:58:00Z",
					"2008-01-20T02:54:48Z",
					"2008-01-20T02:54:32Z",
					"2008-01-20T02:54:20Z",
					"2008-01-20T02:53:25Z",
					"2008-01-20T02:52:06Z",
					"2008-01-20T02:51:52Z",
					"2008-01-20T02:50:56Z",
					"2008-01-20T02:50:15Z",
					"2008-01-20T02:48:16Z",
					"2008-01-20T02:48:01Z",
					"2008-01-20T02:46:40Z",
					"2008-01-20T02:45:38Z",
					"2008-01-20T02:45:21Z",
					"2008-01-20T02:44:43Z",
					"2008-01-20T02:43:51Z",
					"2008-01-20T02:43:29Z",
					"2008-01-20T02:43:02Z",
					"2008-01-20T02:42:14Z",
					"2008-01-20T02:41:44Z",
					"2008-01-20T02:41:12Z",
					"2008-01-20T02:40:42Z",
					"2008-01-20T02:39:27Z",
					"2008-01-20T02:38:39Z",
					"2008-01-20T02:38:31Z",
					"2008-01-20T02:38:07Z",
					"2008-01-20T02:37:51Z",
					"2008-01-20T02:37:24Z",
					"2008-01-20T02:36:37Z",
					"2008-01-20T02:36:28Z",
					"2008-01-20T02:36:24Z",
					"2008-01-20T02:11:30Z",
					"2008-01-20T02:10:37Z",
					"2008-01-20T02:10:23Z",
					"2008-01-20T02:08:33Z",
					"2008-01-20T02:08:20Z",
					"2008-01-20T02:04:41Z",
					"2008-01-20T02:04:10Z",
					"2008-01-20T01:34:23Z",
					"2008-01-20T01:31:30Z",
					"2008-01-20T01:30:42Z",
					"2008-01-20T01:29:18Z",
					"2008-01-20T01:26:19Z",
					"2008-01-20T01:25:38Z",
					"2008-01-20T01:24:19Z",
					"2008-01-20T01:22:19Z",
					"2008-01-20T01:21:50Z",
					"2008-01-20T01:21:21Z",
					"2008-01-20T01:20:41Z",
					"2008-01-20T01:20:19Z",
					"2008-01-20T01:13:07Z",
					"2008-01-20T01:12:54Z",
					"2008-01-20T01:12:33Z",
					"2008-01-20T01:11:57Z",
					"2008-01-20T01:10:28Z",
					"2008-01-20T01:10:03Z",
					"2008-01-20T01:09:45Z",
					"2008-01-20T01:09:23Z",
					"2008-01-20T01:07:57Z",
					"2008-01-20T01:06:20Z",
					"2008-01-20T01:06:04Z",
					"2008-01-20T01:05:44Z",
					"2008-01-20T01:05:20Z",
					"2008-01-20T01:03:22Z",
					"2008-01-20T01:02:53Z",
					"2008-01-20T01:02:42Z",
					"2008-01-20T01:02:23Z",
					"2008-01-20T01:01:53Z",
					"2008-01-20T01:01:35Z",
					"2008-01-20T01:01:34Z",
					"2008-01-20T00:59:44Z",
					"2008-01-20T00:57:31Z",
					"2008-01-20T00:55:56Z",
					"2008-01-20T00:55:38Z",
					"2008-01-20T00:50:07Z",
					"2008-01-20T00:49:52Z",
					"2008-01-20T00:46:47Z",
					"2008-01-20T00:46:03Z",
					"2008-01-20T00:45:35Z",
					"2008-01-20T00:45:10Z",
					"2008-01-20T00:41:26Z",
					"2008-01-20T00:41:12Z",
					"2008-01-20T00:40:12Z",
					"2008-01-20T00:39:43Z",
					"2008-01-20T00:38:54Z"
				]
			},
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						-1.512164,
						48.635182,
						9.27
					],
					[
						-1.51046,
						48.63475,
						12.63
					],
					[
						-1.508329,
						48.63021,
						9.75
					],
					[
						-1.507947,
						48.627462,
						9.27
					],
					[
						-1.508322,
						48.625077,
						9.27
					],
					[
						-1.510336,
						48.621143,
						9.27
					],
					[
						-1.510954,
						48.61908,
						11.67
					],
					[
						-1.511131,
						48.618502,
						9.27
					],
					[
						-1.513982,
						48.598223,
						10.71
					],
					[
						-1.5158878,
						48.5983213,
						10.23
					],
					[
						-1.5159471,
						48.6009055,
						6.87
					],
					[
						-1.5191446,
						48.6030999,
						6.87
					],
					[
						-1.532826,
						48.6062556,
						7.35
					],
					[
						-1.5441585,
						48.5872394,
						5.42
					],
					[
						-1.542795,
						48.579815
					],
					[
						-1.548702,
						48.579127
					],
					[
						-1.550773,
						48.579733
					],
					[
						-1.551289,
						48.580385
					],
					[
						-1.553785,
						48.580725
					],
					[
						-1.554372,
						48.581457
					],
					[
						-1.556885,
						48.581898
					],
					[
						-1.564236,
						48.5822
					],
					[
						-1.56539,
						48.583003
					],
					[
						-1.56608,
						48.584857
					],
					[
						-1.565977,
						48.586059
					],
					[
						-1.567146,
						48.586971
					],
					[
						-1.567684,
						48.587718
					],
					[
						-1.567799,
						48.589923
					],
					[
						-1.568695,
						48.591071
					],
					[
						-1.569928,
						48.591608
					],
					[
						-1.575243,
						48.592952
					],
					[
						-1.576292,
						48.593663
					],
					[
						-1.582679,
						48.595599
					],
					[
						-1.58324,
						48.596175
					],
					[
						-1.584434,
						48.596463
					],
					[
						-1.58629,
						48.597892
					],
					[
						-1.587516,
						48.598503
					],
					[
						-1.588411,
						48.599417
					],
					[
						-1.589492,
						48.601226
					],
					[
						-1.589892,
						48.602437
					],
					[
						-1.589575,
						48.602937
					],
					[
						-1.590448,
						48.604288
					],
					[
						-1.591462,
						48.604584
					],
					[
						-1.592373,
						48.604345
					],
					[
						-1.593738,
						48.604631
					],
					[
						-1.595061,
						48.604391
					],
					[
						-1.598241,
						48.605594
					],
					[
						-1.600939,
						48.605575
					],
					[
						-1.602398,
						48.605022
					],
					[
						-1.60608,
						48.606885
					],
					[
						-1.606767,
						48.607481
					],
					[
						-1.60685,
						48.608077
					],
					[
						-1.609331,
						48.608503
					],
					[
						-1.615846,
						48.609051
					],
					[
						-1.622297,
						48.608855
					],
					[
						-1.625889,
						48.608313
					],
					[
						-1.626159,
						48.607696
					],
					[
						-1.631625,
						48.606672
					],
					[
						-1.639968,
						48.607495
					],
					[
						-1.640548,
						48.607017
					],
					[
						-1.654713,
						48.608573
					],
					[
						-1.659022,
						48.607283
					],
					[
						-1.660388,
						48.607358
					],
					[
						-1.662815,
						48.608136
					],
					[
						-1.662983,
						48.6078595,
						6.9140625
					],
					[
						-1.666674,
						48.606996
					],
					[
						-1.667531,
						48.609135
					],
					[
						-1.668147,
						48.609765
					],
					[
						-1.671266,
						48.610684
					],
					[
						-1.673,
						48.610864
					],
					[
						-1.676655,
						48.610623
					],
					[
						-1.688936,
						48.608435
					],
					[
						-1.696851,
						48.607332
					],
					[
						-1.707628,
						48.606341
					],
					[
						-1.708538,
						48.606505
					],
					[
						-1.711271,
						48.60625
					],
					[
						-1.710916,
						48.605436
					],
					[
						-1.711284,
						48.605214
					],
					[
						-1.713379,
						48.604998
					],
					[
						-1.721269,
						48.604646
					],
					[
						-1.721298,
						48.605804
					],
					[
						-1.721966,
						48.605859
					],
					[
						-1.74544,
						48.605071
					],
					[
						-1.750324,
						48.604657
					],
					[
						-1.753038,
						48.60406
					],
					[
						-1.754711,
						48.603237
					],
					[
						-1.757091,
						48.602788
					],
					[
						-1.766416,
						48.602621
					],
					[
						-1.77057,
						48.602002
					],
					[
						-1.783694,
						48.604858
					],
					[
						-1.788545,
						48.605657
					],
					[
						-1.807322,
						48.607518
					],
					[
						-1.816111,
						48.608672
					],
					[
						-1.825006,
						48.610257
					],
					[
						-1.841499,
						48.613986
					],
					[
						-1.843558,
						48.615018
					],
					[
						-1.851275,
						48.619802
					],
					[
						-1.855169,
						48.622503
					],
					[
						-1.857576,
						48.624515
					],
					[
						-1.861877,
						48.628657
					],
					[
						-1.868193,
						48.636881
					],
					[
						-1.869014,
						48.636473
					],
					[
						-1.869829,
						48.635329
					],
					[
						-1.871237,
						48.634602
					],
					[
						-1.874644,
						48.635028
					],
					[
						-1.877082,
						48.635654
					],
					[
						-1.878744,
						48.636984
					],
					[
						-1.881398,
						48.638299
					],
					[
						-1.880931,
						48.639252
					],
					[
						-1.882541,
						48.64037
					],
					[
						-1.882974,
						48.641192
					],
					[
						-1.883885,
						48.641527
					],
					[
						-1.883907,
						48.642281
					],
					[
						-1.890842,
						48.641756
					],
					[
						-1.894145,
						48.641964
					],
					[
						-1.899145,
						48.639569
					],
					[
						-1.898941,
						48.640164
					],
					[
						-1.897511,
						48.641482
					],
					[
						-1.897063,
						48.644533
					],
					[
						-1.896456,
						48.645546
					],
					[
						-1.895456,
						48.645472
					],
					[
						-1.893197,
						48.645901
					],
					[
						-1.893181,
						48.647354
					],
					[
						-1.891187,
						48.650033
					],
					[
						-1.88806,
						48.652043
					],
					[
						-1.886671,
						48.652658
					],
					[
						-1.884615,
						48.654223
					],
					[
						-1.884105,
						48.655124
					],
					[
						-1.885308,
						48.657592
					],
					[
						-1.885499,
						48.661139
					],
					[
						-1.887112,
						48.662561
					],
					[
						-1.887675,
						48.664312
					],
					[
						-1.886193,
						48.66752
					],
					[
						-1.886401,
						48.669858
					],
					[
						-1.883663,
						48.670264
					],
					[
						-1.880714,
						48.670256
					],
					[
						-1.878832,
						48.670111
					],
					[
						-1.876073,
						48.669359
					],
					[
						-1.876311,
						48.668433
					],
					[
						-1.875543,
						48.667964
					],
					[
						-1.874564,
						48.66339
					],
					[
						-1.868995,
						48.658945
					],
					[
						-1.867508,
						48.658433
					],
					[
						-1.865912,
						48.658918
					],
					[
						-1.865045,
						48.659812
					],
					[
						-1.866014,
						48.662176
					],
					[
						-1.864429,
						48.664015
					],
					[
						-1.863915,
						48.666229
					],
					[
						-1.862945,
						48.667566
					],
					[
						-1.861228,
						48.668609
					],
					[
						-1.857802,
						48.669245
					],
					[
						-1.854429,
						48.671061
					],
					[
						-1.852967,
						48.67114
					],
					[
						-1.853101,
						48.673194
					],
					[
						-1.854113,
						48.673859
					],
					[
						-1.854909,
						48.675295
					],
					[
						-1.856272,
						48.674782
					],
					[
						-1.858573,
						48.674745
					],
					[
						-1.861928,
						48.673654
					],
					[
						-1.86713,
						48.674289
					],
					[
						-1.868937,
						48.671756
					],
					[
						-1.873234,
						48.669497
					],
					[
						-1.87533,
						48.669242
					],
					[
						-1.886569,
						48.669814
					],
					[
						-1.890119,
						48.669275
					],
					[
						-1.89282,
						48.668037
					],
					[
						-1.899743,
						48.66749
					],
					[
						-1.903198,
						48.666621
					],
					[
						-1.907084,
						48.666407
					],
					[
						-1.909443,
						48.665743
					],
					[
						-1.910986,
						48.666079
					],
					[
						-1.913947,
						48.665885
					],
					[
						-1.912838,
						48.668256
					],
					[
						-1.909994,
						48.669595
					],
					[
						-1.909947,
						48.670056
					],
					[
						-1.912137,
						48.673054
					],
					[
						-1.911501,
						48.674135
					],
					[
						-1.91052,
						48.674808
					],
					[
						-1.911364,
						48.675363
					],
					[
						-1.911298,
						48.675813
					],
					[
						-1.91379,
						48.676562
					],
					[
						-1.916582,
						48.678104
					],
					[
						-1.919528,
						48.67871
					],
					[
						-1.922623,
						48.680406
					],
					[
						-1.925191,
						48.68148
					],
					[
						-1.926325,
						48.681674
					],
					[
						-1.929259,
						48.680942
					],
					[
						-1.930903,
						48.68125
					],
					[
						-1.933273,
						48.680486
					],
					[
						-1.93403,
						48.680067
					],
					[
						-1.933716,
						48.678879
					],
					[
						-1.934327,
						48.677164
					],
					[
						-1.93513,
						48.677131
					],
					[
						-1.935486,
						48.676633
					],
					[
						-1.93821,
						48.676576
					],
					[
						-1.939163,
						48.677928
					],
					[
						-1.940412,
						48.678772
					],
					[
						-1.943034,
						48.678267
					],
					[
						-1.943882,
						48.67848
					],
					[
						-1.945409,
						48.680369
					],
					[
						-1.948149,
						48.681731
					],
					[
						-1.949978,
						48.681889
					],
					[
						-1.955429,
						48.679799
					],
					[
						-1.959977,
						48.679379
					],
					[
						-1.961066,
						48.679563
					],
					[
						-1.963996,
						48.68136
					],
					[
						-1.967705,
						48.681131
					],
					[
						-1.968016,
						48.681843
					],
					[
						-1.968526,
						48.681818
					],
					[
						-1.977414,
						48.679947
					],
					[
						-1.97883,
						48.678517
					],
					[
						-1.979315,
						48.676854
					],
					[
						-1.982779,
						48.670888
					],
					[
						-1.983579,
						48.668776
					],
					[
						-1.984217,
						48.667916
					],
					[
						-1.985478,
						48.666925
					],
					[
						-1.987665,
						48.665669
					],
					[
						-1.988541,
						48.662818
					],
					[
						-1.996643,
						48.657287
					],
					[
						-2.002642,
						48.656238
					],
					[
						-2.014793,
						48.65243
					],
					[
						-2.020395,
						48.65183
					],
					[
						-2.022119,
						48.651036
					],
					[
						-2.023552,
						48.649008
					],
					[
						-2.023599,
						48.646216
					],
					[
						-2.022285,
						48.643404
					],
					[
						-2.023117,
						48.642421
					],
					[
						-2.047524,
						48.6354855,
						3.7109375
					],
					[
						-2.0487616,
						48.6363119,
						8.8
					],
					[
						-2.0475524,
						48.6355614,
						9.3
					],
					[
						-2.0487616,
						48.6363119,
						8.8
					],
					[
						-2.048838,
						48.6363893,
						-0.3
					],
					[
						-2.0489917,
						48.6363792,
						6.4
					],
					[
						-2.0489549,
						48.6351431,
						24.7
					],
					[
						-2.0491387,
						48.6347599,
						26.1
					],
					[
						-2.0495022,
						48.6344185,
						23.2
					],
					[
						-2.050589,
						48.6341592,
						20.8
					],
					[
						-2.0507972,
						48.6338609,
						25.1
					],
					[
						-2.0513875,
						48.633212,
						24.2
					],
					[
						-2.0514441,
						48.632279,
						22.7
					],
					[
						-2.0527109,
						48.6307257,
						17.9
					],
					[
						-2.0541711,
						48.6295247,
						29.5
					],
					[
						-2.055284,
						48.6279507,
						30.9
					],
					[
						-2.0557516,
						48.6278322,
						35.7
					],
					[
						-2.055943,
						48.6246338,
						28.5
					],
					[
						-2.0568068,
						48.6235785,
						35.2
					],
					[
						-2.0617489,
						48.6232417,
						37.2
					],
					[
						-2.0644647,
						48.6160154,
						53
					],
					[
						-2.0655832,
						48.6132596,
						45.8
					],
					[
						-2.0653165,
						48.6127542,
						44.4
					],
					[
						-2.0659569,
						48.6122023,
						46.8
					],
					[
						-2.0669838,
						48.6095632,
						45.8
					],
					[
						-2.0664866,
						48.6085958,
						48.7
					],
					[
						-2.0657062,
						48.6087045,
						48.7
					],
					[
						-2.0650445,
						48.6083358,
						48.7
					],
					[
						-2.0667998,
						48.6061136,
						48.7
					],
					[
						-2.067879,
						48.6055776,
						49.2
					],
					[
						-2.0684139,
						48.6056823,
						51.1
					],
					[
						-2.0684663,
						48.6056662,
						50.1
					],
					[
						-2.0688857,
						48.6045504,
						52.5
					],
					[
						-2.0718831,
						48.5966964,
						51.6
					],
					[
						-2.0720592,
						48.5953292,
						52.1
					],
					[
						-2.0709735,
						48.5928533,
						54.5
					],
					[
						-2.0688915,
						48.5897694,
						65
					],
					[
						-2.0685126,
						48.5896739,
						64.6
					],
					[
						-2.0685947,
						48.5886985,
						62.6
					],
					[
						-2.0671505,
						48.5860403,
						69.4
					],
					[
						-2.059566,
						48.5724183,
						77
					],
					[
						-2.0586958,
						48.5672101,
						92.9
					],
					[
						-2.0583163,
						48.5600165,
						79.9
					],
					[
						-2.0615903,
						48.5594634,
						79
					],
					[
						-2.0646303,
						48.5593272,
						73.2
					],
					[
						-2.0654707,
						48.5592183,
						71.3
					],
					[
						-2.067466,
						48.5591366,
						62.1
					],
					[
						-2.068527,
						48.5596976,
						54
					],
					[
						-2.0701142,
						48.5599503,
						54
					],
					[
						-2.0714715,
						48.5605336,
						60.7
					],
					[
						-2.073573,
						48.5612554,
						60.7
					],
					[
						-2.0742404,
						48.5616166,
						59.3
					],
					[
						-2.0748621,
						48.5624457,
						56.9
					],
					[
						-2.0751981,
						48.562595,
						54.5
					],
					[
						-2.0756501,
						48.5639438,
						54
					],
					[
						-2.0764382,
						48.5647209,
						55.9
					],
					[
						-2.0772928,
						48.5655019,
						56.4
					],
					[
						-2.0776352,
						48.5666804,
						47.2
					],
					[
						-2.0790885,
						48.5669771,
						39.1
					],
					[
						-2.0800012,
						48.5667741,
						36.7
					],
					[
						-2.0827718,
						48.5650356,
						37.6
					],
					[
						-2.0840165,
						48.5645058,
						62.6
					],
					[
						-2.0848511,
						48.5643054,
						67.4
					],
					[
						-2.0850611,
						48.5642659,
						67.9
					],
					[
						-2.0865248,
						48.5641618,
						56.4
					],
					[
						-2.0898178,
						48.5629004,
						43.9
					],
					[
						-2.0907986,
						48.5624824,
						38.1
					],
					[
						-2.0912663,
						48.5624847,
						36.7
					],
					[
						-2.092985,
						48.563447,
						45.3
					],
					[
						-2.0937445,
						48.563343,
						53.5
					],
					[
						-2.0939049,
						48.5632987,
						54
					],
					[
						-2.098054,
						48.5630163,
						64.6
					],
					[
						-2.1035419,
						48.5616983,
						67.9
					],
					[
						-2.1103245,
						48.5597336,
						53.5
					],
					[
						-2.1110707,
						48.5601347,
						51.1
					],
					[
						-2.1113772,
						48.561321,
						52.5
					],
					[
						-2.1119709,
						48.5621361,
						50.6
					],
					[
						-2.1147833,
						48.5648017,
						47.7
					],
					[
						-2.1166874,
						48.5655199,
						52.1
					],
					[
						-2.1170949,
						48.5663136,
						53
					],
					[
						-2.1172525,
						48.5673422,
						49.7
					],
					[
						-2.1193056,
						48.5708638,
						40.5
					],
					[
						-2.1210006,
						48.5713087,
						39.1
					],
					[
						-2.1228042,
						48.5728626,
						32.8
					],
					[
						-2.1236819,
						48.5733243,
						35.7
					],
					[
						-2.1248318,
						48.5726841,
						38.6
					],
					[
						-2.1264609,
						48.5715671,
						32.3
					],
					[
						-2.1257228,
						48.5706807,
						29.9
					],
					[
						-2.129131,
						48.569761,
						34.3
					],
					[
						-2.1309653,
						48.5693057,
						25.6
					],
					[
						-2.13516,
						48.5685864,
						30.4
					],
					[
						-2.1360317,
						48.5680951,
						30.4
					],
					[
						-2.1367676,
						48.5678265,
						28.5
					],
					[
						-2.1397384,
						48.5676642,
						23.2
					],
					[
						-2.1423104,
						48.5673876,
						14.6
					],
					[
						-2.1435015,
						48.5683162,
						10.7
					],
					[
						-2.1502375,
						48.5695935,
						8.3
					],
					[
						-2.152304,
						48.571593,
						8.3
					],
					[
						-2.15402,
						48.5722235,
						7.8
					],
					[
						-2.1542146,
						48.5734394,
						9.3
					],
					[
						-2.1566026,
						48.573107,
						7.8
					],
					[
						-2.1586313,
						48.5733225,
						10.2
					],
					[
						-2.1611756,
						48.570677,
						4.5
					],
					[
						-2.1622488,
						48.5686284,
						3
					],
					[
						-2.1642083,
						48.5679929,
						4.5
					],
					[
						-2.1656299,
						48.5671476,
						5.4
					],
					[
						-2.1656974,
						48.567088,
						4.9
					],
					[
						-2.168204,
						48.5697124,
						6.9
					],
					[
						-2.1740711,
						48.5699997,
						10.2
					],
					[
						-2.1754724,
						48.5729172,
						17.4
					],
					[
						-2.1764555,
						48.5726822,
						29
					],
					[
						-2.1772056,
						48.572459,
						30.9
					],
					[
						-2.1778449,
						48.5724322,
						33.8
					],
					[
						-2.1811064,
						48.5715011,
						30.4
					],
					[
						-2.1823858,
						48.5714251,
						41
					],
					[
						-2.1828285,
						48.5716467,
						41.5
					],
					[
						-2.188068,
						48.5713392,
						40
					],
					[
						-2.1901605,
						48.5735947,
						38.1
					],
					[
						-2.1908576,
						48.5753908,
						33.8
					],
					[
						-2.1965579,
						48.5736522,
						36.7
					],
					[
						-2.2005219,
						48.5722223,
						28
					],
					[
						-2.2025855,
						48.5724593,
						37.2
					],
					[
						-2.2061155,
						48.5722407,
						25.1
					],
					[
						-2.2080868,
						48.5727644,
						25.078125
					],
					[
						-2.2103472,
						48.5729261,
						11.046875
					],
					[
						-2.2113605,
						48.5728183,
						5.2851563
					],
					[
						-2.2114384,
						48.5721715,
						8.5351563
					],
					[
						-2.2124127,
						48.5716864,
						7.75
					],
					[
						-2.212852,
						48.5723531,
						10.7
					],
					[
						-2.2143237,
						48.5743784,
						10.7
					],
					[
						-2.2144417,
						48.5747375,
						11.2
					],
					[
						-2.2150033,
						48.5741763,
						11.7
					],
					[
						-2.2161559,
						48.5742837,
						10.7
					],
					[
						-2.2180217,
						48.5738079,
						14.6
					],
					[
						-2.2192333,
						48.5729842,
						23.7
					],
					[
						-2.220448,
						48.5722987,
						25.6
					],
					[
						-2.2221523,
						48.5722687,
						30.9
					],
					[
						-2.2233706,
						48.5724782,
						33.3
					],
					[
						-2.2255478,
						48.571676,
						38.6
					],
					[
						-2.2278685,
						48.5717275,
						44.8
					],
					[
						-2.2296524,
						48.5738604,
						49.7
					],
					[
						-2.2304546,
						48.5762548,
						45.8
					],
					[
						-2.2352685,
						48.58129,
						60.2
					],
					[
						-2.2368601,
						48.5822802,
						59.7
					],
					[
						-2.263316,
						48.5895966,
						79
					],
					[
						-2.2773695,
						48.5934111,
						70.3
					],
					[
						-2.2818025,
						48.5936427,
						70.8
					],
					[
						-2.285768,
						48.5944758,
						73.7
					],
					[
						-2.2884479,
						48.5955811,
						75.6
					],
					[
						-2.2916975,
						48.5962268,
						73.7
					],
					[
						-2.2912796,
						48.5970975,
						77.5
					],
					[
						-2.2930618,
						48.5973279,
						70.3
					],
					[
						-2.2926432,
						48.5964351,
						70.8
					],
					[
						-2.2925608,
						48.5963207,
						67
					],
					[
						-2.2926133,
						48.5960466,
						65.5
					],
					[
						-2.2948021,
						48.5951918,
						55.4
					],
					[
						-2.2964463,
						48.5951187,
						44.8
					],
					[
						-2.2983472,
						48.5957233,
						38.6
					],
					[
						-2.3000962,
						48.5966358,
						46.3
					],
					[
						-2.3006156,
						48.5968603,
						46.3
					],
					[
						-2.3024152,
						48.5981159,
						49.7
					],
					[
						-2.3053614,
						48.5979251,
						52.5
					],
					[
						-2.3061991,
						48.5978749,
						52.5
					],
					[
						-2.3102565,
						48.5980489,
						42.4
					],
					[
						-2.3121648,
						48.5982159,
						35.2
					],
					[
						-2.3146502,
						48.5988746,
						19.4
					],
					[
						-2.3156038,
						48.6000803,
						23.2
					],
					[
						-2.3187088,
						48.6012189,
						17.9
					],
					[
						-2.3205741,
						48.6021771,
						10.2
					],
					[
						-2.3271135,
						48.6033272,
						25.6
					],
					[
						-2.3286331,
						48.6039598,
						21.8
					],
					[
						-2.3304319,
						48.6041833,
						18.4
					],
					[
						-2.3346864,
						48.6035991,
						6.9
					],
					[
						-2.3394818,
						48.6044905,
						22.3
					],
					[
						-2.3393509,
						48.6054721,
						29.9
					],
					[
						-2.3383764,
						48.6072126,
						37.2
					],
					[
						-2.3385492,
						48.6079318,
						42.9
					],
					[
						-2.3376974,
						48.6091758,
						44.8
					],
					[
						-2.3405112,
						48.6090666,
						49.2
					],
					[
						-2.3436314,
						48.6099008,
						39.6
					],
					[
						-2.3368131,
						48.6177126,
						6.9
					],
					[
						-2.33719,
						48.6179892,
						5.9
					],
					[
						-2.3366204,
						48.6184947,
						4
					],
					[
						-2.3376384,
						48.619701,
						7.8
					],
					[
						-2.3381154,
						48.6202548,
						6.4
					],
					[
						-2.3353559,
						48.6214139,
						4.9
					],
					[
						-2.3347262,
						48.6217873,
						5.4
					],
					[
						-2.334245,
						48.6226884,
						5.4
					],
					[
						-2.3312985,
						48.6239645,
						5.9
					],
					[
						-2.3281037,
						48.6260112,
						4.9
					],
					[
						-2.326905,
						48.6264348,
						5.9
					],
					[
						-2.3267238,
						48.626835,
						6.9
					],
					[
						-2.3252336,
						48.62776,
						6.4
					],
					[
						-2.3204977,
						48.6288944,
						12.6
					],
					[
						-2.3208506,
						48.6296355,
						15.5
					],
					[
						-2.322339,
						48.6307847,
						19.4
					],
					[
						-2.3209634,
						48.6324194,
						29.5
					],
					[
						-2.3208041,
						48.6330526,
						42.4
					],
					[
						-2.3209955,
						48.6337832,
						49.7
					],
					[
						-2.3210688,
						48.6339631,
						51.1
					],
					[
						-2.3201247,
						48.6353866,
						56.4
					],
					[
						-2.3213889,
						48.6362126,
						64.6
					],
					[
						-2.3222056,
						48.6368292,
						65
					],
					[
						-2.3227828,
						48.6360976,
						64.1
					],
					[
						-2.3241626,
						48.6366141,
						67
					],
					[
						-2.3255206,
						48.6362611,
						67.9
					],
					[
						-2.3272292,
						48.6354479,
						64.6
					],
					[
						-2.328464,
						48.63849,
						62.1
					],
					[
						-2.3290976,
						48.6391869,
						62.1
					],
					[
						-2.3300298,
						48.6398435,
						59.3
					],
					[
						-2.3309973,
						48.6415344,
						54.9
					],
					[
						-2.3313297,
						48.6436328,
						52.1
					],
					[
						-2.3323109,
						48.6438973,
						53.5
					],
					[
						-2.3327312,
						48.6445768,
						52.1
					],
					[
						-2.3307822,
						48.6456421,
						48.7
					],
					[
						-2.3305527,
						48.6462417,
						42.9
					],
					[
						-2.3309233,
						48.6471591,
						39.1
					],
					[
						-2.3293052,
						48.6497797,
						46.8
					],
					[
						-2.3295831,
						48.6502298,
						53
					],
					[
						-2.3295735,
						48.6502296,
						56.9
					],
					[
						-2.3293545,
						48.6503172,
						56.4
					],
					[
						-2.3285199,
						48.6505956,
						57.3
					],
					[
						-2.3282943,
						48.6507513,
						58.3
					],
					[
						-2.3259845,
						48.6518395,
						53.5
					],
					[
						-2.3251332,
						48.6533024,
						54.5
					],
					[
						-2.325051,
						48.6534731,
						53.5
					],
					[
						-2.3259459,
						48.6543286,
						54.9
					],
					[
						-2.3268146,
						48.6547149,
						55.4
					],
					[
						-2.3287535,
						48.6555272,
						53.5
					],
					[
						-2.3293205,
						48.655264,
						49.7
					],
					[
						-2.3300055,
						48.6553923,
						48.7
					],
					[
						-2.3305228,
						48.6556708,
						45.3
					],
					[
						-2.3297462,
						48.656624,
						50.1
					],
					[
						-2.3316923,
						48.6575775,
						43.4
					],
					[
						-2.3323228,
						48.6588514,
						45.8
					],
					[
						-2.3329632,
						48.6592132,
						47.2
					],
					[
						-2.3332449,
						48.6594865,
						46.8
					],
					[
						-2.3340635,
						48.6601346,
						42.4
					],
					[
						-2.3335648,
						48.660911,
						49.7
					],
					[
						-2.3310918,
						48.6616907,
						58.3
					],
					[
						-2.3299351,
						48.6636269,
						55.9
					],
					[
						-2.3264234,
						48.6640627,
						61.2
					],
					[
						-2.3309406,
						48.6699804,
						49.2
					],
					[
						-2.3316332,
						48.6697877,
						52.5
					],
					[
						-2.3321514,
						48.6697042,
						51.6
					],
					[
						-2.3341875,
						48.6697153,
						45.8
					],
					[
						-2.3350631,
						48.6691479,
						44.8
					],
					[
						-2.3362023,
						48.6679833,
						40.5
					],
					[
						-2.3373736,
						48.6673434,
						39.1
					],
					[
						-2.3412611,
						48.6666362,
						43.4
					],
					[
						-2.341537,
						48.6665013,
						42.9
					],
					[
						-2.342644,
						48.6650051,
						39.1
					],
					[
						-2.3429908,
						48.6634632,
						41
					],
					[
						-2.3438204,
						48.6630405,
						41
					],
					[
						-2.3442202,
						48.6630083,
						40.5
					],
					[
						-2.346432,
						48.6633674,
						31.4
					],
					[
						-2.3475805,
						48.6631757,
						26.1
					],
					[
						-2.3480241,
						48.6628295,
						19.4
					],
					[
						-2.34823,
						48.6619611,
						15
					],
					[
						-2.3470274,
						48.6594411,
						22.7
					],
					[
						-2.3470082,
						48.6593301,
						22.7
					],
					[
						-2.3474364,
						48.657728,
						33.8
					],
					[
						-2.3424523,
						48.6528109,
						40.5
					],
					[
						-2.3443746,
						48.6527045,
						41.5
					],
					[
						-2.3468683,
						48.65313,
						37.6
					],
					[
						-2.3494524,
						48.6528668,
						39.1
					],
					[
						-2.3530082,
						48.6524259,
						34.7
					],
					[
						-2.3524292,
						48.650489,
						34.7
					],
					[
						-2.3524637,
						48.6503425,
						31.4
					],
					[
						-2.3542002,
						48.6505749,
						30.9
					],
					[
						-2.3556118,
						48.6497536,
						35.2
					],
					[
						-2.3592656,
						48.6487227,
						42.9
					],
					[
						-2.3603854,
						48.6499491,
						49.2
					],
					[
						-2.3609037,
						48.6503477,
						49.7
					],
					[
						-2.3618326,
						48.6505634,
						53.5
					],
					[
						-2.3665896,
						48.6504627,
						58.8
					],
					[
						-2.3676664,
						48.6499368,
						53
					],
					[
						-2.3694759,
						48.6480841,
						36.2
					],
					[
						-2.3717839,
						48.6470959,
						45.3
					],
					[
						-2.3746349,
						48.6430952,
						41.5
					],
					[
						-2.374846,
						48.6415497,
						44.8
					],
					[
						-2.3757502,
						48.6407568,
						47.2
					],
					[
						-2.3762049,
						48.6404049,
						45.8
					],
					[
						-2.3775363,
						48.6410298,
						44.4
					],
					[
						-2.3809381,
						48.6399419,
						44.4
					],
					[
						-2.3837396,
						48.640011,
						44.4
					],
					[
						-2.3842685,
						48.6403139,
						43.4
					],
					[
						-2.3851488,
						48.6402263,
						42
					],
					[
						-2.3864029,
						48.6409314,
						41
					],
					[
						-2.3887942,
						48.6428806,
						46.8
					],
					[
						-2.3888116,
						48.6428998,
						46.8
					],
					[
						-2.3914467,
						48.6414245,
						41
					],
					[
						-2.393317,
						48.6405928,
						29.9
					],
					[
						-2.3950939,
						48.640686,
						32.8
					],
					[
						-2.3979454,
						48.6410788,
						23.2
					],
					[
						-2.3982685,
						48.6404318,
						25.6
					],
					[
						-2.3978568,
						48.6394334,
						31.9
					],
					[
						-2.397869,
						48.6392805,
						31.4
					],
					[
						-2.3988232,
						48.6388958,
						31.9
					],
					[
						-2.3995556,
						48.6400479,
						22.7
					],
					[
						-2.4000048,
						48.6401567,
						19.4
					],
					[
						-2.400459,
						48.6394929,
						21.8
					],
					[
						-2.4017583,
						48.638979,
						10.7
					],
					[
						-2.4026649,
						48.6375524,
						12.2
					],
					[
						-2.4035299,
						48.6375315,
						11.2
					],
					[
						-2.4053693,
						48.6383819,
						4.5
					],
					[
						-2.4061007,
						48.6392099,
						1.6
					],
					[
						-2.4063203,
						48.639088,
						5.4
					],
					[
						-2.4071248,
						48.638433,
						5.4
					],
					[
						-2.409233,
						48.6367857,
						0.1
					],
					[
						-2.4088159,
						48.6358004,
						1.6
					],
					[
						-2.4103341,
						48.6348033,
						0.6
					],
					[
						-2.4102221,
						48.634557,
						3
					],
					[
						-2.4102869,
						48.6343892,
						3
					],
					[
						-2.4109386,
						48.6344899,
						0.6
					],
					[
						-2.4114159,
						48.6340907,
						-1.3
					],
					[
						-2.4115856,
						48.6329256,
						3
					],
					[
						-2.4121221,
						48.6324023,
						3.5
					],
					[
						-2.4129203,
						48.6320396,
						2.5
					],
					[
						-2.4162071,
						48.6322211,
						3
					],
					[
						-2.4205449,
						48.6335657,
						13.6
					],
					[
						-2.4211312,
						48.6336929,
						10.7
					],
					[
						-2.422316,
						48.6336546,
						9.3
					],
					[
						-2.4244318,
						48.6326458,
						38.1
					],
					[
						-2.4271098,
						48.6333812,
						24.7
					],
					[
						-2.4307963,
						48.6335195,
						39.1
					],
					[
						-2.4334818,
						48.6325012,
						42.4
					],
					[
						-2.4395698,
						48.6317443,
						51.6
					],
					[
						-2.4404854,
						48.6316261,
						51.6
					],
					[
						-2.4552784,
						48.6295026,
						36.2
					],
					[
						-2.4569319,
						48.6292676,
						27.5
					],
					[
						-2.4587859,
						48.6285449,
						30.9
					],
					[
						-2.4595276,
						48.627996,
						30.9
					],
					[
						-2.4631543,
						48.6267104,
						42.9
					],
					[
						-2.4645887,
						48.6253793,
						50.6
					],
					[
						-2.4656692,
						48.6241561,
						43.9
					],
					[
						-2.4681798,
						48.6225747,
						33.8
					],
					[
						-2.4688641,
						48.6216715,
						31.9
					],
					[
						-2.4680141,
						48.6221852,
						16
					],
					[
						-2.4690602,
						48.6200953,
						0.6
					],
					[
						-2.4696508,
						48.6200614,
						-0.3
					],
					[
						-2.4703257,
						48.6205352,
						11.7
					],
					[
						-2.4705015,
						48.6207883,
						13.1
					],
					[
						-2.4718147,
						48.6219823,
						10.7
					],
					[
						-2.4728533,
						48.620621,
						8.3
					],
					[
						-2.4766661,
						48.6180073,
						15.5
					],
					[
						-2.4801894,
						48.6157804,
						11.7
					],
					[
						-2.4802255,
						48.6141885,
						27.5
					],
					[
						-2.4809525,
						48.6134402,
						33.3
					],
					[
						-2.481958,
						48.6130237,
						38.1
					],
					[
						-2.4819721,
						48.6127066,
						41.5
					],
					[
						-2.4825181,
						48.6120391,
						42.9
					],
					[
						-2.48262,
						48.6119883,
						42
					],
					[
						-2.4805248,
						48.6084471,
						65
					],
					[
						-2.4796953,
						48.6074674,
						61.7
					],
					[
						-2.4801321,
						48.6058299,
						58.3
					],
					[
						-2.4803291,
						48.6056124,
						57.3
					],
					[
						-2.4841544,
						48.6035031,
						64.1
					],
					[
						-2.4855728,
						48.6027309,
						62.1
					],
					[
						-2.4901414,
						48.6009208,
						58.3
					],
					[
						-2.4937309,
						48.5987063,
						68.9
					],
					[
						-2.4954579,
						48.5981945,
						70.3
					],
					[
						-2.4973847,
						48.5972245,
						69.4
					],
					[
						-2.4993555,
						48.5960753,
						78
					],
					[
						-2.5005317,
						48.5947009,
						85.7
					],
					[
						-2.5006994,
						48.594566,
						85.2
					],
					[
						-2.5013827,
						48.5944009,
						86.7
					],
					[
						-2.5035892,
						48.5934604,
						83.3
					],
					[
						-2.5047927,
						48.5935104,
						81.9
					],
					[
						-2.5061833,
						48.5931117,
						81.9
					],
					[
						-2.5068966,
						48.5937323,
						80.9
					],
					[
						-2.5090319,
						48.5935553,
						79.9
					],
					[
						-2.5111503,
						48.5928308,
						73.2
					],
					[
						-2.5135824,
						48.5926494,
						68.4
					],
					[
						-2.5164209,
						48.5914079,
						51.6
					],
					[
						-2.5175924,
						48.5912309,
						57.3
					],
					[
						-2.5186306,
						48.5905389,
						63.6
					],
					[
						-2.5214819,
						48.5903254,
						67.9
					],
					[
						-2.523209,
						48.5897975,
						67.9
					],
					[
						-2.5243111,
						48.5892035,
						67.4
					],
					[
						-2.5264279,
						48.5886103,
						62.1
					],
					[
						-2.5296706,
						48.588468,
						55.4
					],
					[
						-2.5323179,
						48.5877954,
						51.1
					],
					[
						-2.5389236,
						48.5875085,
						56.9
					],
					[
						-2.541155,
						48.5873457,
						46.8
					],
					[
						-2.5423892,
						48.5861177,
						40
					],
					[
						-2.542989,
						48.5858718,
						41
					],
					[
						-2.5441176,
						48.5852722,
						34.3
					],
					[
						-2.5460835,
						48.583181,
						27.5
					],
					[
						-2.5551099,
						48.5810302,
						17
					],
					[
						-2.5557656,
						48.5810824,
						18.9
					],
					[
						-2.5588012,
						48.5799244,
						7.4
					],
					[
						-2.562587,
						48.5796048,
						5.9
					],
					[
						-2.5629914,
						48.5785879,
						4
					],
					[
						-2.5642226,
						48.5776049,
						6.9
					],
					[
						-2.5635637,
						48.5760893,
						4.5
					],
					[
						-2.5656032,
						48.575538,
						7.8
					],
					[
						-2.5668161,
						48.5756559,
						4
					],
					[
						-2.5680768,
						48.5739148,
						4
					],
					[
						-2.569447,
						48.5732057,
						4
					],
					[
						-2.57119,
						48.573569,
						15
					],
					[
						-2.5732268,
						48.5714608,
						12.6
					],
					[
						-2.5744387,
						48.5713305,
						15.5
					],
					[
						-2.5765899,
						48.5720146,
						25.6
					],
					[
						-2.5779648,
						48.5716038,
						19.4
					],
					[
						-2.5791302,
						48.5706483,
						8.8
					],
					[
						-2.5795218,
						48.5688689,
						29
					],
					[
						-2.5796785,
						48.5676904,
						33.8
					],
					[
						-2.580531,
						48.5667461,
						41.5
					],
					[
						-2.5808623,
						48.5659315,
						40
					],
					[
						-2.5836525,
						48.563711,
						49.7
					],
					[
						-2.583945,
						48.5634032,
						49.7
					],
					[
						-2.583908,
						48.5623904,
						53
					],
					[
						-2.5832641,
						48.5617716,
						60.2
					],
					[
						-2.5831203,
						48.5617127,
						60.7
					],
					[
						-2.5829045,
						48.5615602,
						60.2
					],
					[
						-2.5832689,
						48.5613319,
						62.6
					],
					[
						-2.5839899,
						48.5608786,
						63.1
					],
					[
						-2.5885319,
						48.5564612,
						71.8
					],
					[
						-2.5899125,
						48.5552321,
						65.5
					],
					[
						-2.5916516,
						48.554263,
						60.2
					],
					[
						-2.5949676,
						48.553265,
						58.8
					],
					[
						-2.5966894,
						48.5525711,
						56.4
					],
					[
						-2.597071,
						48.5510512,
						63.6
					],
					[
						-2.5968817,
						48.5497048,
						67.4
					],
					[
						-2.5970982,
						48.5483357,
						67.9
					],
					[
						-2.5968637,
						48.5471275,
						56.4
					],
					[
						-2.5967535,
						48.5467739,
						52.1
					],
					[
						-2.5952057,
						48.5445108,
						36.7
					],
					[
						-2.5926297,
						48.5424259,
						53.5
					],
					[
						-2.5956843,
						48.5414937,
						52.1
					],
					[
						-2.6022492,
						48.5377457,
						78.5
					],
					[
						-2.6073306,
						48.5357277,
						91.5
					],
					[
						-2.6094468,
						48.5345466,
						95.3
					],
					[
						-2.6045823,
						48.5318325,
						82.8
					],
					[
						-2.6045352,
						48.5315996,
						89.1
					],
					[
						-2.6053781,
						48.5299133,
						92.9
					],
					[
						-2.6060014,
						48.5280877,
						85.2
					],
					[
						-2.6089451,
						48.5251855,
						71.3
					],
					[
						-2.6091079,
						48.5249551,
						69.8
					],
					[
						-2.6090572,
						48.5228074,
						79.5
					],
					[
						-2.609767,
						48.5227944,
						61.7
					],
					[
						-2.6111167,
						48.5221757,
						59.7
					],
					[
						-2.6127279,
						48.5220301,
						54.5
					],
					[
						-2.6165406,
						48.5200266,
						34.7
					],
					[
						-2.6179649,
						48.5191296,
						15.5
					],
					[
						-2.6212842,
						48.5188928,
						9.3
					],
					[
						-2.6226859,
						48.5191687,
						19.4
					],
					[
						-2.623625,
						48.5197665,
						26.1
					],
					[
						-2.6256359,
						48.518773,
						45.8
					],
					[
						-2.6281378,
						48.5182801,
						46.8
					],
					[
						-2.6297224,
						48.5180537,
						42.4
					],
					[
						-2.6296647,
						48.5176654,
						46.3
					],
					[
						-2.6295536,
						48.5173947,
						46.3
					],
					[
						-2.6272557,
						48.5146306,
						55.4
					],
					[
						-2.6271985,
						48.5134568,
						54.5
					],
					[
						-2.627191,
						48.5134522,
						54.5
					],
					[
						-2.6293851,
						48.5140719,
						55.4
					],
					[
						-2.6304284,
						48.5142479,
						53.5
					],
					[
						-2.6374095,
						48.5143719,
						53.5
					],
					[
						-2.642861,
						48.5131916,
						70.3
					],
					[
						-2.6452997,
						48.5128704,
						67.4
					],
					[
						-2.647184,
						48.5118799,
						69.4
					],
					[
						-2.6471603,
						48.5112973,
						65.5
					],
					[
						-2.6476936,
						48.5113257,
						69.8
					],
					[
						-2.6521805,
						48.5116177,
						59.7
					],
					[
						-2.6555954,
						48.5119483,
						45.8
					],
					[
						-2.660168,
						48.5126617,
						31.9
					],
					[
						-2.6622056,
						48.513326,
						29.9
					],
					[
						-2.665531,
						48.5135628,
						27.1
					],
					[
						-2.665596,
						48.5135209,
						33.3
					],
					[
						-2.6657532,
						48.5132497,
						31.9
					],
					[
						-2.6662416,
						48.5128945,
						31.4
					],
					[
						-2.6664759,
						48.5125444,
						33.3
					],
					[
						-2.6680677,
						48.5124091,
						27.5
					],
					[
						-2.6680464,
						48.5137205,
						25.1
					],
					[
						-2.6691383,
						48.5137715,
						28
					],
					[
						-2.670081,
						48.5127437,
						26.1
					],
					[
						-2.6702372,
						48.5107283,
						29.5
					],
					[
						-2.6712099,
						48.5099514,
						25.1
					],
					[
						-2.672074,
						48.507974,
						28
					],
					[
						-2.6733457,
						48.504225,
						19.8
					],
					[
						-2.6733984,
						48.5039487,
						17
					],
					[
						-2.6721362,
						48.5030469,
						27.1
					],
					[
						-2.6716482,
						48.5026803,
						29.5
					],
					[
						-2.6716081,
						48.5025939,
						28.5
					],
					[
						-2.6736162,
						48.5017386,
						24.2
					],
					[
						-2.6747496,
						48.5003151,
						19.8
					],
					[
						-2.6748785,
						48.4995061,
						12.6
					],
					[
						-2.6757021,
						48.4989956,
						9.8
					],
					[
						-2.6778876,
						48.4986495,
						2.1
					],
					[
						-2.6791103,
						48.4981172,
						1.6
					],
					[
						-2.677645,
						48.4971245,
						5.9
					],
					[
						-2.6766626,
						48.4958197,
						9.3
					],
					[
						-2.6753561,
						48.4947163,
						5.9
					],
					[
						-2.6750842,
						48.4940716,
						4
					],
					[
						-2.6739572,
						48.4934342,
						6.4
					],
					[
						-2.6714221,
						48.4929411,
						4.9
					],
					[
						-2.6774971,
						48.4899055,
						2.5
					],
					[
						-2.6785624,
						48.4886293,
						3
					],
					[
						-2.6789676,
						48.4886972,
						6.4
					],
					[
						-2.6801039,
						48.4898206,
						6.9
					],
					[
						-2.6837318,
						48.4914039,
						5.9
					],
					[
						-2.6846663,
						48.4920484,
						8.8
					],
					[
						-2.686283,
						48.4929719,
						5.4
					],
					[
						-2.6872408,
						48.4950269,
						3
					],
					[
						-2.6886842,
						48.4969446,
						6.9
					],
					[
						-2.6900561,
						48.4985768,
						6.4
					],
					[
						-2.6924313,
						48.5005694,
						6.9
					],
					[
						-2.6973386,
						48.5042321,
						2.5
					],
					[
						-2.697829,
						48.5043223,
						2.5
					],
					[
						-2.6991134,
						48.5038116,
						4
					],
					[
						-2.6992666,
						48.50378,
						4
					],
					[
						-2.6997616,
						48.5039059,
						4.5
					],
					[
						-2.7018441,
						48.5069198,
						35.2
					],
					[
						-2.7046482,
						48.5085798,
						35.7
					],
					[
						-2.705798,
						48.5098669,
						42.9
					],
					[
						-2.7072477,
						48.5108491,
						42.9
					],
					[
						-2.7087955,
						48.5125193,
						43.4
					],
					[
						-2.7090785,
						48.5135348,
						45.8
					],
					[
						-2.7096837,
						48.5136899,
						44.4
					],
					[
						-2.7099593,
						48.5141349,
						42.4
					],
					[
						-2.7113274,
						48.5172365,
						10.7
					],
					[
						-2.7163114,
						48.5190498,
						5.4
					],
					[
						-2.7199147,
						48.5181051,
						11.7
					],
					[
						-2.7238061,
						48.5181635,
						24.7
					],
					[
						-2.7246232,
						48.5186062,
						28
					],
					[
						-2.7263101,
						48.5187227,
						39.1
					],
					[
						-2.7266437,
						48.5187473,
						40.5
					],
					[
						-2.7286096,
						48.518889,
						45.3
					],
					[
						-2.7287989,
						48.5189225,
						45.3
					],
					[
						-2.7289307,
						48.519095,
						54.9
					],
					[
						-2.7293027,
						48.5194332,
						56.9
					],
					[
						-2.7293028,
						48.5194854,
						58.8
					],
					[
						-2.7284547,
						48.5212351,
						59.3
					],
					[
						-2.7286879,
						48.5220205,
						67
					],
					[
						-2.7282636,
						48.5223816,
						61.7
					],
					[
						-2.7282495,
						48.5243446,
						56.9
					],
					[
						-2.7262505,
						48.5265112,
						51.6
					],
					[
						-2.724817,
						48.5273226,
						45.8
					],
					[
						-2.7251158,
						48.5273639,
						48.2
					],
					[
						-2.7255719,
						48.5274339,
						40
					],
					[
						-2.7281552,
						48.5272823,
						20.3
					],
					[
						-2.7311572,
						48.527763,
						5.9
					],
					[
						-2.7314804,
						48.5277884,
						-0.3
					],
					[
						-2.734973,
						48.5278073,
						-0.8
					],
					[
						-2.7363062,
						48.5271582,
						-2.3
					],
					[
						-2.7370355,
						48.5254484,
						0.1
					],
					[
						-2.7372237,
						48.5252551,
						0.1
					],
					[
						-2.7379475,
						48.5247681,
						-1.3
					],
					[
						-2.7394748,
						48.5241318,
						-0.3
					],
					[
						-2.74072,
						48.5241402,
						1.6
					],
					[
						-2.7410094,
						48.5241772,
						1.6
					],
					[
						-2.7415086,
						48.5241841,
						-1.3
					],
					[
						-2.7414787,
						48.5242294,
						16
					],
					[
						-2.7417755,
						48.5250635,
						6.4
					],
					[
						-2.7395371,
						48.5259528,
						8.3
					],
					[
						-2.7386806,
						48.5272575,
						10.2
					],
					[
						-2.7371833,
						48.528896,
						8.3
					],
					[
						-2.7338387,
						48.5295234,
						7.4
					],
					[
						-2.7316471,
						48.529408,
						10.2
					],
					[
						-2.7307111,
						48.529478,
						9.3
					],
					[
						-2.7269603,
						48.5302602,
						8.3
					],
					[
						-2.7219968,
						48.5336297,
						17
					],
					[
						-2.719634,
						48.5355718,
						29.5
					],
					[
						-2.7191649,
						48.5361721,
						33.8
					],
					[
						-2.7194274,
						48.5366508,
						37.2
					],
					[
						-2.7211962,
						48.5373277,
						44.8
					],
					[
						-2.7218826,
						48.5376038,
						42.4
					],
					[
						-2.7232824,
						48.5383514,
						41
					],
					[
						-2.7245942,
						48.5388189,
						42.9
					],
					[
						-2.7260969,
						48.5398203,
						50.6
					],
					[
						-2.7273549,
						48.541183,
						60.7
					],
					[
						-2.7277818,
						48.5416946,
						54.5
					],
					[
						-2.7283651,
						48.5419608,
						53.5
					],
					[
						-2.7296036,
						48.5420383,
						54
					],
					[
						-2.7320575,
						48.5428068,
						66
					],
					[
						-2.7348939,
						48.5424582,
						73.7
					],
					[
						-2.7382957,
						48.5420284,
						81.9
					],
					[
						-2.7418893,
						48.5422654,
						85.7
					],
					[
						-2.7441276,
						48.5419125,
						88.6
					],
					[
						-2.746886,
						48.5414222,
						91.5
					],
					[
						-2.7504702,
						48.5411391,
						93.4
					],
					[
						-2.7518789,
						48.540257,
						96.3
					],
					[
						-2.7570317,
						48.5388394,
						102
					],
					[
						-2.7581115,
						48.5395857,
						101.6
					],
					[
						-2.7596659,
						48.5398479,
						104.9
					],
					[
						-2.7609309,
						48.5400912,
						102
					],
					[
						-2.7620064,
						48.5394515,
						106.8
					],
					[
						-2.7624409,
						48.5393755,
						106.8
					],
					[
						-2.7627644,
						48.539659,
						107.8
					],
					[
						-2.7654831,
						48.5418627,
						108.3
					],
					[
						-2.7654424,
						48.5421689,
						107.8
					],
					[
						-2.7652426,
						48.543686,
						97.7
					],
					[
						-2.767235,
						48.5431798,
						102.5
					],
					[
						-2.7678552,
						48.5432199,
						102.5
					],
					[
						-2.7722074,
						48.54532,
						106.4
					],
					[
						-2.7727668,
						48.5463866,
						104.9
					],
					[
						-2.7729548,
						48.5481786,
						110.7
					],
					[
						-2.7729717,
						48.5488569,
						111.2
					],
					[
						-2.772956,
						48.5491083,
						110.7
					],
					[
						-2.7757242,
						48.5479299,
						111.2
					],
					[
						-2.7778563,
						48.5466908,
						113.1
					],
					[
						-2.779803,
						48.5481618,
						112.1
					],
					[
						-2.7817667,
						48.5474894,
						115
					],
					[
						-2.7843272,
						48.5469107,
						115
					],
					[
						-2.7857518,
						48.5477351,
						115
					],
					[
						-2.7900319,
						48.5509979,
						128.5
					],
					[
						-2.790224,
						48.5511686,
						129
					],
					[
						-2.7902631,
						48.5512022,
						129
					],
					[
						-2.7924868,
						48.5531841,
						127.5
					],
					[
						-2.7939884,
						48.5545861,
						115
					],
					[
						-2.7937701,
						48.5553076,
						111.7
					],
					[
						-2.7948211,
						48.5556472,
						114.5
					],
					[
						-2.7968739,
						48.5557154,
						111.7
					],
					[
						-2.7969077,
						48.557816,
						105.4
					],
					[
						-2.7982213,
						48.5582373,
						107.3
					],
					[
						-2.7980842,
						48.5590999,
						101.1
					],
					[
						-2.7996067,
						48.5593303,
						104.4
					],
					[
						-2.8003211,
						48.5595247,
						100.6
					],
					[
						-2.8011124,
						48.5603921,
						97.2
					],
					[
						-2.8030134,
						48.5606509,
						111.7
					],
					[
						-2.8038607,
						48.5605602,
						111.2
					],
					[
						-2.8052171,
						48.5616154,
						118.4
					],
					[
						-2.8061441,
						48.5618119,
						115.5
					],
					[
						-2.8066419,
						48.5625304,
						115.5
					],
					[
						-2.8082084,
						48.5623021,
						117.9
					],
					[
						-2.8101728,
						48.5617453,
						114.5
					],
					[
						-2.8110751,
						48.5628042,
						111.2
					],
					[
						-2.8120998,
						48.5644374,
						104
					],
					[
						-2.8137275,
						48.5656787,
						108.3
					],
					[
						-2.8149054,
						48.5672962,
						110.7
					],
					[
						-2.8179388,
						48.5699387,
						109.7
					],
					[
						-2.8182345,
						48.5702706,
						104
					],
					[
						-2.8179618,
						48.5705556,
						104
					],
					[
						-2.8173405,
						48.5707805,
						99.6
					],
					[
						-2.8177586,
						48.5709394,
						94.8
					],
					[
						-2.8175839,
						48.5710869,
						104
					],
					[
						-2.8172744,
						48.5713074,
						105.9
					],
					[
						-2.8168669,
						48.5715212,
						105.4
					],
					[
						-2.816552,
						48.5733906,
						103
					],
					[
						-2.8156049,
						48.5735359,
						101.6
					],
					[
						-2.8156143,
						48.575692,
						94.4
					],
					[
						-2.816624,
						48.577608,
						91
					],
					[
						-2.8167386,
						48.5786306,
						90.5
					],
					[
						-2.8128994,
						48.5795674,
						87.1
					],
					[
						-2.8124449,
						48.5851573,
						79.5
					],
					[
						-2.8113462,
						48.5876116,
						79.5
					],
					[
						-2.8110568,
						48.5894835,
						74.2
					],
					[
						-2.8127945,
						48.5902721,
						73.7
					],
					[
						-2.8136456,
						48.5902938,
						70.8
					],
					[
						-2.8150478,
						48.5900317,
						67.4
					],
					[
						-2.8150996,
						48.5895505,
						65.5
					],
					[
						-2.8157525,
						48.5892219,
						72.2
					],
					[
						-2.8177451,
						48.5892702,
						79.9
					],
					[
						-2.818237,
						48.5892469,
						79
					],
					[
						-2.818806,
						48.5896951,
						73.2
					],
					[
						-2.818764,
						48.5906432,
						66
					],
					[
						-2.8195499,
						48.5908519,
						73.2
					],
					[
						-2.8219171,
						48.5925512,
						72.7
					],
					[
						-2.8220741,
						48.5926024,
						72.2
					],
					[
						-2.8226328,
						48.5925873,
						67.9
					],
					[
						-2.8232573,
						48.5931486,
						62.6
					],
					[
						-2.8234116,
						48.5935139,
						55.9
					],
					[
						-2.8239332,
						48.5933376,
						53
					],
					[
						-2.8250375,
						48.5940948,
						41
					],
					[
						-2.8254403,
						48.5946656,
						28.5
					],
					[
						-2.8258577,
						48.5941204,
						19.4
					],
					[
						-2.8255046,
						48.5952284,
						15.5
					],
					[
						-2.8239254,
						48.5968353,
						7.8
					],
					[
						-2.8253827,
						48.6001538,
						12.6
					],
					[
						-2.8265671,
						48.6004131,
						13.6
					],
					[
						-2.8271065,
						48.600909,
						11.2
					],
					[
						-2.8268778,
						48.6012253,
						11.7
					],
					[
						-2.8262987,
						48.6011924,
						12.6
					],
					[
						-2.8243482,
						48.6013369,
						13.6
					],
					[
						-2.8248007,
						48.6019343,
						21.8
					],
					[
						-2.8253519,
						48.6023728,
						10.2
					],
					[
						-2.825853,
						48.6036089,
						33.8
					],
					[
						-2.8310888,
						48.6094538,
						62.1
					],
					[
						-2.8307966,
						48.6098834,
						66.5
					],
					[
						-2.8302297,
						48.6100954,
						68.9
					],
					[
						-2.8287438,
						48.6103399,
						71.8
					],
					[
						-2.8265626,
						48.6111432,
						72.7
					],
					[
						-2.8261175,
						48.611095,
						72.7
					],
					[
						-2.8252324,
						48.610953,
						70.8
					],
					[
						-2.8251705,
						48.612495,
						76.1
					],
					[
						-2.8254967,
						48.6137527,
						73.2
					],
					[
						-2.8278679,
						48.6139995,
						77.5
					],
					[
						-2.8267845,
						48.6149832,
						78.5
					],
					[
						-2.82914,
						48.6191453,
						70.3
					],
					[
						-2.8309542,
						48.6197351,
						71.8
					],
					[
						-2.8322986,
						48.6191594,
						72.7
					],
					[
						-2.8328385,
						48.619367,
						74.2
					],
					[
						-2.8331274,
						48.6196162,
						74.2
					],
					[
						-2.8332109,
						48.6215671,
						72.7
					],
					[
						-2.8336781,
						48.6223183,
						72.7
					],
					[
						-2.8326592,
						48.6233554,
						72.7
					],
					[
						-2.8343847,
						48.6256253,
						71.3
					],
					[
						-2.8349306,
						48.6274653,
						79.5
					],
					[
						-2.8344387,
						48.6284919,
						69.4
					],
					[
						-2.8345019,
						48.6296863,
						64.6
					],
					[
						-2.834479,
						48.6299712,
						61.7
					],
					[
						-2.8327208,
						48.6302847,
						58.8
					],
					[
						-2.8328105,
						48.6306596,
						58.3
					],
					[
						-2.8322455,
						48.630906,
						52.1
					],
					[
						-2.8327498,
						48.6320089,
						48.2
					],
					[
						-2.8330958,
						48.6326273,
						44.4
					],
					[
						-2.8329916,
						48.6329603,
						38.6
					],
					[
						-2.8317927,
						48.6335952,
						25.1
					],
					[
						-2.8306047,
						48.6348258,
						10.7
					],
					[
						-2.8291981,
						48.6357566,
						13.1
					],
					[
						-2.8289777,
						48.6358989,
						12.2
					],
					[
						-2.8277043,
						48.6362829,
						8.8
					],
					[
						-2.828107,
						48.6369604,
						9.3
					],
					[
						-2.8265528,
						48.6378187,
						26.1
					],
					[
						-2.8264428,
						48.6381828,
						29.9
					],
					[
						-2.8262844,
						48.6383909,
						31.9
					],
					[
						-2.8258184,
						48.6396507,
						35.2
					],
					[
						-2.8248965,
						48.639971,
						29.9
					],
					[
						-2.8241717,
						48.6409617,
						20.3
					],
					[
						-2.8242831,
						48.6416394,
						24.7
					],
					[
						-2.8248295,
						48.6424259,
						21.3
					],
					[
						-2.8257392,
						48.6427195,
						18.4
					],
					[
						-2.8267112,
						48.6422002,
						17.4
					],
					[
						-2.8271423,
						48.6424465,
						19.4
					],
					[
						-2.8273613,
						48.642849,
						20.3
					],
					[
						-2.8259092,
						48.6436059,
						4.9
					],
					[
						-2.8264667,
						48.6445942,
						11.7
					],
					[
						-2.8271955,
						48.6459271,
						12.2
					],
					[
						-2.8274847,
						48.6466859,
						12.2
					],
					[
						-2.8272415,
						48.6471333,
						11.7
					],
					[
						-2.8268383,
						48.6478624,
						10.2
					],
					[
						-2.8270537,
						48.6484716,
						15
					],
					[
						-2.8278194,
						48.6490091,
						22.7
					],
					[
						-2.8294742,
						48.6510055,
						29.5
					],
					[
						-2.8294105,
						48.6516805,
						33.8
					],
					[
						-2.8286306,
						48.6537723,
						31.9
					],
					[
						-2.8287062,
						48.6543347,
						30.4
					],
					[
						-2.8320245,
						48.6540786,
						27.5
					],
					[
						-2.8322318,
						48.6539281,
						26.6
					],
					[
						-2.8362175,
						48.6543366,
						11.7
					],
					[
						-2.8368623,
						48.6550078,
						12.2
					],
					[
						-2.8396457,
						48.6567073,
						19.4
					],
					[
						-2.8405795,
						48.6576507,
						27.5
					],
					[
						-2.8423184,
						48.6584788,
						28
					],
					[
						-2.8442142,
						48.6607857,
						30.9
					],
					[
						-2.8446728,
						48.6618764,
						30.4
					],
					[
						-2.8465055,
						48.6627261,
						38.1
					],
					[
						-2.8508527,
						48.6637347,
						44.4
					],
					[
						-2.8525559,
						48.6642871,
						41.5
					],
					[
						-2.8529057,
						48.6646411,
						39.1
					],
					[
						-2.8543335,
						48.6661791,
						21.8
					],
					[
						-2.8550246,
						48.6666961,
						9.8
					],
					[
						-2.8597506,
						48.6659621,
						11.2
					],
					[
						-2.8606944,
						48.6661601,
						10.7
					],
					[
						-2.8610637,
						48.6670827,
						20.3
					],
					[
						-2.8609279,
						48.6676978,
						26.1
					],
					[
						-2.8608719,
						48.6681645,
						29
					],
					[
						-2.862376,
						48.6696007,
						32.8
					],
					[
						-2.8642961,
						48.6685242,
						33.8
					],
					[
						-2.8662548,
						48.6696318,
						40.5
					],
					[
						-2.8671752,
						48.6699873,
						42.4
					],
					[
						-2.8689371,
						48.6701034,
						46.8
					],
					[
						-2.8700388,
						48.6685159,
						57.8
					],
					[
						-2.8716549,
						48.6646601,
						71.8
					],
					[
						-2.8722361,
						48.6637543,
						73.2
					],
					[
						-2.8791863,
						48.6634544,
						51.1
					],
					[
						-2.8826487,
						48.6624872,
						57.3
					],
					[
						-2.8832763,
						48.6626044,
						67
					],
					[
						-2.8838176,
						48.6627641,
						67
					],
					[
						-2.8860114,
						48.6638319,
						68.4
					],
					[
						-2.8863939,
						48.6652291,
						72.7
					],
					[
						-2.8866031,
						48.6674317,
						71.8
					],
					[
						-2.8870159,
						48.6679792,
						71.8
					],
					[
						-2.8879398,
						48.6690888,
						68.9
					],
					[
						-2.8896074,
						48.6701952,
						66.5
					],
					[
						-2.8911375,
						48.6703844,
						66
					],
					[
						-2.8921843,
						48.670444,
						62.6
					],
					[
						-2.8956238,
						48.6714554,
						48.2
					],
					[
						-2.8971519,
						48.6714473,
						42
					],
					[
						-2.8981849,
						48.6722696,
						32.8
					],
					[
						-2.8987168,
						48.6736036,
						25.1
					],
					[
						-2.8994617,
						48.6724119,
						27.5
					],
					[
						-2.9027816,
						48.6729303,
						28
					],
					[
						-2.9103405,
						48.67186,
						67
					],
					[
						-2.9109984,
						48.6717475,
						60.2
					],
					[
						-2.9120269,
						48.67355,
						65
					],
					[
						-2.9103591,
						48.6737599,
						64.6
					],
					[
						-2.9092014,
						48.6761571,
						85.2
					],
					[
						-2.9082234,
						48.6768365,
						78
					],
					[
						-2.907839,
						48.6776924,
						77
					],
					[
						-2.9083394,
						48.6792333,
						70.8
					],
					[
						-2.9081399,
						48.6803904,
						84.3
					],
					[
						-2.9075162,
						48.6809835,
						87.1
					],
					[
						-2.9066943,
						48.6813301,
						91.5
					],
					[
						-2.9058813,
						48.6817904,
						94.8
					],
					[
						-2.9050427,
						48.6823174,
						93.9
					],
					[
						-2.9066398,
						48.6843944,
						105.4
					],
					[
						-2.9070284,
						48.6852516,
						108.8
					],
					[
						-2.906703,
						48.6855213,
						110.2
					],
					[
						-2.9052697,
						48.6867219,
						108.3
					],
					[
						-2.9054117,
						48.6867816,
						108.8
					],
					[
						-2.9071438,
						48.6871711,
						103
					],
					[
						-2.9081893,
						48.6877106,
						104.9
					],
					[
						-2.9087874,
						48.6880817,
						103
					],
					[
						-2.9101182,
						48.6887224,
						92.9
					],
					[
						-2.9103391,
						48.6886571,
						98.7
					],
					[
						-2.9112875,
						48.6889838,
						99.2
					],
					[
						-2.9120438,
						48.6889356,
						99.2
					],
					[
						-2.9129164,
						48.6890297,
						94.8
					],
					[
						-2.9129336,
						48.6890673,
						98.2
					],
					[
						-2.9129835,
						48.6898191,
						89.1
					],
					[
						-2.9131972,
						48.6902678,
						86.7
					],
					[
						-2.9156439,
						48.692317,
						97.2
					],
					[
						-2.9160448,
						48.6926636,
						94.4
					],
					[
						-2.9243408,
						48.6959503,
						89.1
					],
					[
						-2.9258326,
						48.6963197,
						82.8
					],
					[
						-2.9282852,
						48.6978816,
						79.9
					],
					[
						-2.9306176,
						48.6997911,
						87.1
					],
					[
						-2.931525,
						48.7008808,
						81.9
					],
					[
						-2.9329795,
						48.7017688,
						79
					],
					[
						-2.9335144,
						48.7028122,
						78.5
					],
					[
						-2.9349357,
						48.7040602,
						80.4
					],
					[
						-2.9351353,
						48.7042646,
						73.7
					],
					[
						-2.9379001,
						48.7079081,
						84.7
					],
					[
						-2.9402748,
						48.7083255,
						96.3
					],
					[
						-2.9438287,
						48.7082948,
						102.5
					],
					[
						-2.9465518,
						48.7083549,
						97.7
					],
					[
						-2.9485965,
						48.709161,
						95.8
					],
					[
						-2.9516451,
						48.7090314,
						76.1
					],
					[
						-2.9522784,
						48.709605,
						81.9
					],
					[
						-2.9542122,
						48.709626,
						82.3
					],
					[
						-2.954548,
						48.7101175,
						85.7
					],
					[
						-2.9551998,
						48.7122036,
						85.7
					],
					[
						-2.9562377,
						48.7130192,
						85.2
					],
					[
						-2.9579721,
						48.7135123,
						84.3
					],
					[
						-2.9589251,
						48.7139339,
						78.5
					],
					[
						-2.9603442,
						48.7142122,
						73.7
					],
					[
						-2.96125,
						48.7140131,
						71.3
					],
					[
						-2.9633401,
						48.7137004,
						61.2
					],
					[
						-2.964357,
						48.7139082,
						61.2
					],
					[
						-2.9644972,
						48.7147362,
						56.4
					],
					[
						-2.9655385,
						48.71597,
						43.4
					],
					[
						-2.9645235,
						48.719032,
						41.5
					],
					[
						-2.9622144,
						48.7213608,
						28.5
					],
					[
						-2.9595151,
						48.72323,
						-5.6
					],
					[
						-2.9587037,
						48.7247833,
						-5.6
					],
					[
						-2.9578492,
						48.7256343,
						-11.9
					],
					[
						-2.9565816,
						48.7263346,
						-6.1
					],
					[
						-2.9539174,
						48.7267118,
						7.8
					],
					[
						-2.9502885,
						48.7276563,
						8.3
					],
					[
						-2.9500662,
						48.7291816,
						17.9
					],
					[
						-2.9492583,
						48.7294725,
						29
					],
					[
						-2.9477155,
						48.7294629,
						50.1
					],
					[
						-2.9476392,
						48.7294906,
						51.1
					],
					[
						-2.9465003,
						48.7298086,
						57.8
					],
					[
						-2.9462398,
						48.7302233,
						65
					],
					[
						-2.9461247,
						48.7304129,
						64.6
					],
					[
						-2.9451423,
						48.7289147,
						73.7
					],
					[
						-2.9438365,
						48.729451,
						68.4
					],
					[
						-2.9435858,
						48.7308322,
						64.1
					],
					[
						-2.942257,
						48.7310705,
						73.2
					],
					[
						-2.9408813,
						48.7314856,
						73.7
					],
					[
						-2.9400716,
						48.7317683,
						72.2
					],
					[
						-2.9365553,
						48.7370552,
						76.1
					],
					[
						-2.9367364,
						48.7377394,
						74.2
					],
					[
						-2.9385451,
						48.7386278,
						75.1
					],
					[
						-2.9392418,
						48.7388296,
						74.6
					],
					[
						-2.9396668,
						48.7387869,
						70.8
					],
					[
						-2.9444049,
						48.7354342,
						73.2
					],
					[
						-2.9477184,
						48.7349225,
						75.6
					],
					[
						-2.9495542,
						48.7382655,
						75.1
					],
					[
						-2.9514342,
						48.7391362,
						79.5
					],
					[
						-2.9514935,
						48.7395315,
						81.4
					],
					[
						-2.9515673,
						48.7398489,
						81.9
					],
					[
						-2.9520511,
						48.7405797,
						82.3
					],
					[
						-2.9533061,
						48.7413456,
						82.3
					],
					[
						-2.9544048,
						48.7425302,
						82.3
					],
					[
						-2.9550473,
						48.7440567,
						80.4
					],
					[
						-2.9563544,
						48.745377,
						80.9
					],
					[
						-2.9566444,
						48.7457092,
						79.9
					],
					[
						-2.9570403,
						48.7469423,
						80.9
					],
					[
						-2.9600622,
						48.7468582,
						75.1
					],
					[
						-2.9626186,
						48.7460107,
						76.6
					],
					[
						-2.9628734,
						48.7461372,
						75.6
					],
					[
						-2.9633482,
						48.7471663,
						72.7
					],
					[
						-2.963,
						48.7483465,
						64.1
					],
					[
						-2.962322,
						48.7494243,
						42
					],
					[
						-2.9638542,
						48.7496008,
						30.9
					],
					[
						-2.9642735,
						48.7500208,
						55.9
					],
					[
						-2.9632862,
						48.7514987,
						68.4
					],
					[
						-2.9614547,
						48.7523574,
						67.4
					],
					[
						-2.9614869,
						48.7536799,
						74.2
					],
					[
						-2.9616115,
						48.7541514,
						73.2
					],
					[
						-2.966548,
						48.7529486,
						74.5
					],
					[
						-2.9675565,
						48.7537338,
						74.5
					],
					[
						-2.967932,
						48.7542997,
						74.5
					],
					[
						-2.9671486,
						48.7564149,
						71
					],
					[
						-2.9672993,
						48.7569309,
						71.8
					],
					[
						-2.9681304,
						48.7573135,
						70.3
					],
					[
						-2.9745165,
						48.7575378,
						70.3
					],
					[
						-2.976254,
						48.7570603,
						73.2
					],
					[
						-2.9768913,
						48.7565222,
						75.6
					],
					[
						-2.9774727,
						48.756337,
						76.6
					],
					[
						-2.9798284,
						48.7564873,
						81.9
					],
					[
						-2.9842152,
						48.7571209,
						74.6
					],
					[
						-2.9879116,
						48.7572297,
						76.1
					],
					[
						-2.9883206,
						48.7572452,
						74.2
					],
					[
						-2.9888602,
						48.7570961,
						69.8
					],
					[
						-2.9894069,
						48.7564631,
						72.2
					],
					[
						-2.9895826,
						48.7569671,
						76.6
					],
					[
						-2.9904308,
						48.7571012,
						79
					],
					[
						-2.9938205,
						48.7574379,
						79
					],
					[
						-2.9959224,
						48.758167,
						75.1
					],
					[
						-2.9974392,
						48.7590127,
						73.7
					],
					[
						-2.9979442,
						48.7596491,
						73.7
					],
					[
						-2.9998697,
						48.7603477,
						76.6
					],
					[
						-3.0003952,
						48.7608336,
						76.6
					],
					[
						-3.0013822,
						48.761286,
						76.1
					],
					[
						-3.0043256,
						48.7623593,
						68.9
					],
					[
						-3.0059998,
						48.7623217,
						69.4
					],
					[
						-3.0082242,
						48.762572,
						56.4
					],
					[
						-3.0098168,
						48.7634264,
						45.8
					],
					[
						-3.0126251,
						48.763895,
						32.3
					],
					[
						-3.0150361,
						48.7635528,
						22.3
					],
					[
						-3.017122,
						48.7641142,
						9.3
					],
					[
						-3.0174243,
						48.7651996,
						14.6
					],
					[
						-3.0170562,
						48.7654813,
						11.7
					],
					[
						-3.017336,
						48.765431,
						16
					],
					[
						-3.017343,
						48.7654542,
						15.5
					],
					[
						-3.0160684,
						48.7662338,
						5.4
					],
					[
						-3.0170833,
						48.7673475,
						4.5
					],
					[
						-3.0172243,
						48.7685083,
						4.5
					],
					[
						-3.0216206,
						48.7709478,
						6.9
					],
					[
						-3.0267815,
						48.7726306,
						12.6
					],
					[
						-3.0270579,
						48.772781,
						12.2
					],
					[
						-3.0287461,
						48.7743874,
						4.9
					],
					[
						-3.0300214,
						48.7751221,
						4
					],
					[
						-3.0336026,
						48.7787759,
						10.7
					],
					[
						-3.0381234,
						48.7813725,
						14.1
					],
					[
						-3.0383575,
						48.7814429,
						14.1
					],
					[
						-3.0396704,
						48.7816725,
						10.2
					],
					[
						-3.0408291,
						48.782311,
						5.9
					],
					[
						-3.0420011,
						48.7821721,
						4.9
					],
					[
						-3.042836,
						48.7794617,
						7.8
					],
					[
						-3.0434323,
						48.7787815,
						11.2
					],
					[
						-3.0436131,
						48.778621,
						10.2
					],
					[
						-3.0598729,
						48.7716744,
						15.5
					],
					[
						-3.0672213,
						48.7696746,
						20.3
					],
					[
						-3.0703138,
						48.7702852,
						27.5
					],
					[
						-3.0722292,
						48.7711094,
						37.2
					],
					[
						-3.0727039,
						48.7714758,
						36.7
					],
					[
						-3.073905,
						48.7713412,
						38.1
					],
					[
						-3.0734147,
						48.770886,
						37.6
					],
					[
						-3.0753552,
						48.7702706,
						35.7
					],
					[
						-3.0784766,
						48.7683126,
						32.3
					],
					[
						-3.0797963,
						48.7672236,
						32.3
					],
					[
						-3.0824134,
						48.7664347,
						31.9
					],
					[
						-3.0856324,
						48.7661941,
						28.5
					],
					[
						-3.08748,
						48.7666063,
						28
					],
					[
						-3.0890254,
						48.7678055,
						27.5
					],
					[
						-3.0894693,
						48.767909,
						28
					],
					[
						-3.0907085,
						48.7677601,
						24.7
					],
					[
						-3.0924878,
						48.7690917,
						26.1
					],
					[
						-3.0934751,
						48.7694898,
						27.1
					],
					[
						-3.0942081,
						48.7696877,
						27.5
					],
					[
						-3.0963179,
						48.7704594,
						23.7
					],
					[
						-3.0981822,
						48.7732286,
						17
					],
					[
						-3.1007911,
						48.7754769,
						7.4
					],
					[
						-3.1010213,
						48.7761931,
						5.4
					],
					[
						-3.1002408,
						48.7763478,
						10.7
					],
					[
						-3.1002819,
						48.7766237,
						14.1
					],
					[
						-3.1010957,
						48.7780033,
						15.5
					],
					[
						-3.1034223,
						48.7795674,
						16.5
					],
					[
						-3.1058585,
						48.7805013,
						24.7
					],
					[
						-3.1062529,
						48.7807257,
						25.6
					],
					[
						-3.1064551,
						48.7808374,
						25.6
					],
					[
						-3.1077752,
						48.7816437,
						21.8
					],
					[
						-3.1078736,
						48.7824134,
						21.8
					],
					[
						-3.1064078,
						48.7837166,
						25.6
					],
					[
						-3.1062632,
						48.7839512,
						25.1
					],
					[
						-3.1064455,
						48.7847384,
						27.1
					],
					[
						-3.1069155,
						48.7857706,
						25.1
					],
					[
						-3.1052406,
						48.7863544,
						27.5
					],
					[
						-3.1053019,
						48.7863902,
						27.1
					],
					[
						-3.107623,
						48.7855997,
						31.4
					],
					[
						-3.1123195,
						48.7859171,
						19.8
					],
					[
						-3.1138546,
						48.7855218,
						34.3
					],
					[
						-3.115332,
						48.785541,
						39.6
					],
					[
						-3.1162014,
						48.785552,
						39.1
					],
					[
						-3.1198345,
						48.7858129,
						43.4
					],
					[
						-3.1235669,
						48.786763,
						55.9
					],
					[
						-3.1248366,
						48.7872362,
						54.5
					],
					[
						-3.1280668,
						48.7877667,
						59.7
					],
					[
						-3.1295899,
						48.7887307,
						62.6
					],
					[
						-3.1312517,
						48.7905254,
						66.5
					],
					[
						-3.1321912,
						48.7911981,
						69.4
					],
					[
						-3.1332096,
						48.7919123,
						70.3
					],
					[
						-3.1334237,
						48.7924289,
						70.8
					],
					[
						-3.134757,
						48.7940248,
						70.8
					],
					[
						-3.1363116,
						48.7948083,
						72.7
					],
					[
						-3.1382016,
						48.7950962,
						74.2
					],
					[
						-3.1433515,
						48.795136,
						75.1
					],
					[
						-3.1471472,
						48.7958739,
						78.5
					],
					[
						-3.1485617,
						48.7953426,
						80.4
					],
					[
						-3.1494369,
						48.7949285,
						81.4
					],
					[
						-3.1506791,
						48.7944672,
						81.9
					],
					[
						-3.1565068,
						48.7933792,
						79.9
					],
					[
						-3.1583924,
						48.7933757,
						77
					],
					[
						-3.1603823,
						48.7896145,
						65.5
					],
					[
						-3.1615201,
						48.7888171,
						66
					],
					[
						-3.1676756,
						48.7911807,
						69.4
					],
					[
						-3.1720261,
						48.7924698,
						78.5
					],
					[
						-3.1727694,
						48.7931832,
						79
					],
					[
						-3.1734744,
						48.7934957,
						79.5
					],
					[
						-3.173785,
						48.7936324,
						79
					],
					[
						-3.1764211,
						48.7921894,
						83.8
					],
					[
						-3.178181,
						48.7918557,
						81.4
					],
					[
						-3.1804706,
						48.7900258,
						77
					],
					[
						-3.1808035,
						48.7898691,
						76.1
					],
					[
						-3.1851069,
						48.7908315,
						74.6
					],
					[
						-3.1880327,
						48.7911149,
						71.3
					],
					[
						-3.1904724,
						48.7910417,
						70.8
					],
					[
						-3.190955,
						48.7910869,
						69.8
					],
					[
						-3.1969166,
						48.7901498,
						69.8
					],
					[
						-3.1997526,
						48.7897774,
						66
					],
					[
						-3.2005644,
						48.7905747,
						66.5
					],
					[
						-3.2005022,
						48.7923348,
						72.2
					],
					[
						-3.2005318,
						48.7925623,
						72.7
					],
					[
						-3.2009175,
						48.794468,
						71.8
					],
					[
						-3.2010795,
						48.7946378,
						71.3
					],
					[
						-3.2038048,
						48.794251,
						67
					],
					[
						-3.2059851,
						48.793375,
						65.5
					],
					[
						-3.2086928,
						48.7936155,
						59.7
					],
					[
						-3.2143937,
						48.7918589,
						54.5
					],
					[
						-3.2124333,
						48.7908768,
						56.9
					],
					[
						-3.212089,
						48.7899551,
						56.9
					],
					[
						-3.2127464,
						48.7896318,
						57.3
					],
					[
						-3.2127604,
						48.7892384,
						57.3
					],
					[
						-3.2131656,
						48.7877569,
						51.1
					],
					[
						-3.2124167,
						48.7864674,
						54
					],
					[
						-3.2145659,
						48.7854748,
						52.1
					],
					[
						-3.2164473,
						48.7846923,
						34.3
					],
					[
						-3.2190713,
						48.7849913,
						6.4
					],
					[
						-3.2192064,
						48.7837552,
						7.4
					],
					[
						-3.2220902,
						48.7847601,
						7.4
					],
					[
						-3.2242951,
						48.7874749,
						7.8
					],
					[
						-3.2255111,
						48.7885937,
						7.8
					],
					[
						-3.2272225,
						48.7885086,
						15.5
					],
					[
						-3.2283592,
						48.7885841,
						14.6
					],
					[
						-3.2290704,
						48.7880988,
						29
					],
					[
						-3.2297609,
						48.7880301,
						31.9
					],
					[
						-3.2300852,
						48.7879588,
						26.6
					],
					[
						-3.2301856,
						48.7873344,
						34.3
					],
					[
						-3.2306754,
						48.7872376,
						37.6
					],
					[
						-3.2315727,
						48.7869523,
						37.2
					],
					[
						-3.2308256,
						48.7858908,
						46.3
					],
					[
						-3.2311815,
						48.7856737,
						48.7
					],
					[
						-3.23303,
						48.7851452,
						51.6
					],
					[
						-3.2332827,
						48.7854618,
						54.5
					],
					[
						-3.2341806,
						48.786776,
						47.2
					],
					[
						-3.232745,
						48.7873315,
						46.3
					],
					[
						-3.2329442,
						48.7876115,
						47.7
					],
					[
						-3.2331279,
						48.7879156,
						47.2
					],
					[
						-3.2333912,
						48.7882084,
						39.1
					],
					[
						-3.2356135,
						48.7879446,
						27.1
					],
					[
						-3.2366139,
						48.7883106,
						22.7
					],
					[
						-3.2375613,
						48.789098,
						12.2
					],
					[
						-3.2373063,
						48.7897645,
						16.5
					],
					[
						-3.2362826,
						48.7895886,
						16.5
					],
					[
						-3.2345154,
						48.7901721,
						16
					],
					[
						-3.2355305,
						48.7904493,
						17.4
					],
					[
						-3.2379111,
						48.7923849,
						9.3
					],
					[
						-3.2388893,
						48.7936425,
						26.6
					],
					[
						-3.2401822,
						48.7931707,
						34.7
					],
					[
						-3.241231,
						48.791994,
						36.2
					],
					[
						-3.242562,
						48.7915543,
						35.2
					],
					[
						-3.2456379,
						48.7911069,
						46.8
					],
					[
						-3.2472096,
						48.7913363,
						60.7
					],
					[
						-3.2476121,
						48.7915144,
						62.6
					],
					[
						-3.2514321,
						48.7932892,
						60.7
					],
					[
						-3.2566058,
						48.7950267,
						66.5
					],
					[
						-3.2619068,
						48.7968512,
						65.5
					],
					[
						-3.2652057,
						48.7974932,
						58.8
					],
					[
						-3.267128,
						48.7987643,
						60.2
					],
					[
						-3.2697115,
						48.800752,
						51.1
					],
					[
						-3.2712903,
						48.8013428,
						45.3
					],
					[
						-3.2730193,
						48.801469,
						48.7
					],
					[
						-3.2777328,
						48.8007875,
						65.5
					],
					[
						-3.2784015,
						48.8007134,
						62.6
					],
					[
						-3.2891669,
						48.8018013,
						68.4
					],
					[
						-3.2913249,
						48.802398,
						68.4
					],
					[
						-3.2954227,
						48.8044553,
						69.8
					],
					[
						-3.2963821,
						48.8046436,
						71.3
					],
					[
						-3.2965911,
						48.8046619,
						67.9
					],
					[
						-3.298505,
						48.8043942,
						71.1289063
					],
					[
						-3.299982,
						48.8048173,
						76
					],
					[
						-3.3004546,
						48.8049253,
						75.1
					],
					[
						-3.3008477,
						48.8054755,
						74.2
					],
					[
						-3.3014929,
						48.8055022,
						75.1
					],
					[
						-3.3016866,
						48.8056374,
						74.6
					],
					[
						-3.3019569,
						48.8063653,
						73.2
					],
					[
						-3.3033231,
						48.8075398,
						76.6
					],
					[
						-3.3056943,
						48.8068397,
						76.6
					],
					[
						-3.3064108,
						48.8071584,
						74.6
					],
					[
						-3.3071453,
						48.8079685,
						74.6
					],
					[
						-3.3082515,
						48.8080516,
						75.6
					],
					[
						-3.3086181,
						48.8080182,
						75.1
					],
					[
						-3.3098759,
						48.8077667,
						75.1
					],
					[
						-3.3104994,
						48.8070247,
						76.6
					],
					[
						-3.3116718,
						48.8066663,
						79.5
					],
					[
						-3.3119104,
						48.8065907,
						79.9
					],
					[
						-3.3124507,
						48.8074279,
						75.6
					],
					[
						-3.3147017,
						48.8078702,
						76.1
					],
					[
						-3.3161466,
						48.80835,
						73.7
					],
					[
						-3.3173243,
						48.8102934,
						74.2
					],
					[
						-3.3191873,
						48.810667,
						77
					],
					[
						-3.3202298,
						48.8112133,
						74.6
					],
					[
						-3.3208117,
						48.8122762,
						72.7
					],
					[
						-3.3260355,
						48.8129261,
						75.1
					],
					[
						-3.3315417,
						48.8126325,
						75.1
					],
					[
						-3.3333257,
						48.8127195,
						74.2
					],
					[
						-3.3344005,
						48.8129392,
						69.8
					],
					[
						-3.3354369,
						48.8126421,
						65
					],
					[
						-3.3369615,
						48.8092167,
						64.1
					],
					[
						-3.3365206,
						48.8081307,
						67.4
					],
					[
						-3.3362248,
						48.8079135,
						57.8
					],
					[
						-3.3372451,
						48.8076564,
						58.3
					],
					[
						-3.3375847,
						48.807104,
						54.5
					],
					[
						-3.3377763,
						48.8069252,
						40.5
					],
					[
						-3.3393643,
						48.8061894,
						52.5
					],
					[
						-3.3374138,
						48.8035456,
						49.7
					],
					[
						-3.336895,
						48.8032393,
						44.4
					],
					[
						-3.3403426,
						48.8021956,
						56.9
					],
					[
						-3.3409191,
						48.8017398,
						63.1
					],
					[
						-3.3407388,
						48.8015573,
						67.9
					],
					[
						-3.3397774,
						48.8005411,
						71.8
					],
					[
						-3.3399235,
						48.7994963,
						79
					],
					[
						-3.3394814,
						48.797721,
						87.6
					],
					[
						-3.339678,
						48.7965103,
						88.1
					],
					[
						-3.3363696,
						48.7931973,
						74.6
					],
					[
						-3.3366795,
						48.7923447,
						82.3
					],
					[
						-3.3364237,
						48.7920213,
						84.3
					],
					[
						-3.3356886,
						48.7906162,
						88.1
					],
					[
						-3.3382488,
						48.7893868,
						91.9
					],
					[
						-3.3361304,
						48.7889626,
						95.8
					],
					[
						-3.3335159,
						48.7878051,
						97.2
					],
					[
						-3.332524,
						48.786699,
						100.1
					],
					[
						-3.3335207,
						48.7865155,
						101.1
					],
					[
						-3.3458247,
						48.7863497,
						98.2
					],
					[
						-3.3499741,
						48.7856285,
						91
					],
					[
						-3.3566071,
						48.7874681,
						83.8
					],
					[
						-3.3595827,
						48.7911077,
						83.8
					],
					[
						-3.3608172,
						48.7921276,
						84.3
					],
					[
						-3.3618634,
						48.7929224,
						81.4
					],
					[
						-3.3633688,
						48.7936039,
						80.9
					],
					[
						-3.3633021,
						48.7956456,
						81.9
					],
					[
						-3.3668868,
						48.7943841,
						85.2
					],
					[
						-3.3685183,
						48.793533,
						82.8
					],
					[
						-3.3693103,
						48.7926741,
						80.4
					],
					[
						-3.3716766,
						48.7916367,
						84.7
					],
					[
						-3.3738399,
						48.7899874,
						71.3
					],
					[
						-3.3746543,
						48.7870301,
						69.4
					],
					[
						-3.3744662,
						48.7851749,
						70.3
					],
					[
						-3.3750373,
						48.7851869,
						65.5
					],
					[
						-3.3775972,
						48.7860662,
						65.5
					],
					[
						-3.379292,
						48.7863143,
						59.7
					],
					[
						-3.3802008,
						48.787783,
						71.8
					],
					[
						-3.3808342,
						48.7896189,
						67.9
					],
					[
						-3.3815979,
						48.7900722,
						64.1
					],
					[
						-3.385879,
						48.790283,
						75.6
					],
					[
						-3.3894426,
						48.7907216,
						81.4
					],
					[
						-3.3918235,
						48.7920353,
						79.9
					],
					[
						-3.3956459,
						48.792522,
						75.6
					],
					[
						-3.3978102,
						48.7931045,
						76.1
					],
					[
						-3.4062454,
						48.7938309,
						68.9
					],
					[
						-3.4086583,
						48.7936386,
						59.3
					],
					[
						-3.4120769,
						48.7945648,
						57.3
					],
					[
						-3.4139994,
						48.7949325,
						48.7
					],
					[
						-3.4169614,
						48.7947478,
						39.6
					],
					[
						-3.4212366,
						48.795856,
						20.8
					],
					[
						-3.4255703,
						48.796194,
						8.3
					],
					[
						-3.4314899,
						48.7972499,
						3.5
					],
					[
						-3.4343959,
						48.797285,
						3
					],
					[
						-3.4385343,
						48.797902,
						5.9
					],
					[
						-3.4417213,
						48.7981649,
						4
					],
					[
						-3.4435467,
						48.8017152,
						7.8
					],
					[
						-3.4433158,
						48.803533,
						16.5
					],
					[
						-3.4435515,
						48.8021531,
						6.9
					],
					[
						-3.4444911,
						48.8015954,
						9.3
					],
					[
						-3.4457614,
						48.8013517,
						14.1
					],
					[
						-3.4459073,
						48.8012987,
						14.1
					],
					[
						-3.4474194,
						48.8002562,
						20.3
					],
					[
						-3.4474842,
						48.8000892,
						22.7
					],
					[
						-3.4469926,
						48.7999721,
						20.3
					],
					[
						-3.4473166,
						48.799471,
						29
					],
					[
						-3.4509011,
						48.798482,
						46.3
					],
					[
						-3.4543497,
						48.7970172,
						53
					],
					[
						-3.4551284,
						48.797262,
						57.3
					],
					[
						-3.4569042,
						48.7976164,
						56.4
					],
					[
						-3.4568276,
						48.797911,
						56.4
					],
					[
						-3.4587131,
						48.7988188,
						66
					],
					[
						-3.4590062,
						48.7990665,
						65
					],
					[
						-3.4602994,
						48.7991887,
						71.3
					],
					[
						-3.4613116,
						48.7989898,
						71.3
					],
					[
						-3.4615,
						48.7995914,
						74.2
					],
					[
						-3.4616096,
						48.8010278,
						74.2
					],
					[
						-3.4632769,
						48.8027864,
						74.6
					],
					[
						-3.4644678,
						48.8037066,
						75.1
					],
					[
						-3.4649296,
						48.8041428,
						74.2
					],
					[
						-3.4655085,
						48.8052753,
						75.1
					],
					[
						-3.4652142,
						48.8079742,
						75.6
					],
					[
						-3.4647936,
						48.8100244,
						75
					],
					[
						-3.4656207,
						48.8107007,
						74
					],
					[
						-3.4658984,
						48.8116143,
						76
					],
					[
						-3.4665436,
						48.81231,
						76
					],
					[
						-3.4674473,
						48.8130977,
						69
					],
					[
						-3.4687106,
						48.8134228,
						58.8
					],
					[
						-3.4688207,
						48.8145245,
						66
					],
					[
						-3.4712343,
						48.8155466,
						69.4
					],
					[
						-3.4721931,
						48.816663,
						71.8
					],
					[
						-3.4725,
						48.8167272,
						71.8
					],
					[
						-3.475566,
						48.8162864,
						60.2
					],
					[
						-3.4754535,
						48.8156895,
						60.2
					],
					[
						-3.4805278,
						48.8162576,
						38.1
					],
					[
						-3.4817229,
						48.8158903,
						30.4
					],
					[
						-3.4853144,
						48.8140344,
						31.9
					],
					[
						-3.487002,
						48.8135065,
						39.6
					],
					[
						-3.4880112,
						48.8135956,
						47.2
					],
					[
						-3.4887159,
						48.8140227,
						50.6
					],
					[
						-3.4889853,
						48.8193751,
						35.2
					],
					[
						-3.4894383,
						48.8213726,
						22.7
					],
					[
						-3.4886489,
						48.8224298,
						16
					],
					[
						-3.4886287,
						48.8239333,
						10.2
					],
					[
						-3.4878326,
						48.8248259,
						12.2
					],
					[
						-3.4877844,
						48.8248699,
						11.7
					],
					[
						-3.4911508,
						48.8256787,
						5.9
					],
					[
						-3.491435,
						48.8262997,
						5.4
					],
					[
						-3.4926717,
						48.8273221,
						5.9
					],
					[
						-3.4939359,
						48.8269026,
						8.3
					],
					[
						-3.4945837,
						48.8269162,
						6.4
					],
					[
						-3.4954669,
						48.8284367,
						6.4
					],
					[
						-3.4963821,
						48.8288262,
						6.4
					],
					[
						-3.496605,
						48.829272,
						8.3
					],
					[
						-3.4976249,
						48.829224,
						9.8
					],
					[
						-3.4986576,
						48.8293409,
						3.5
					],
					[
						-3.4990834,
						48.8277969,
						4.9
					],
					[
						-3.4988521,
						48.8262101,
						5.4
					],
					[
						-3.5003304,
						48.825786,
						6.4
					],
					[
						-3.5006864,
						48.8244269,
						6.4
					],
					[
						-3.5002684,
						48.8236582,
						5.4
					],
					[
						-3.5011075,
						48.8213941,
						8.3
					],
					[
						-3.5005174,
						48.8192638,
						16.5
					],
					[
						-3.5009085,
						48.8188693,
						16.5
					],
					[
						-3.5022993,
						48.8183958,
						23.7
					],
					[
						-3.5032451,
						48.8177074,
						19.8
					],
					[
						-3.5047728,
						48.8177979,
						17.4
					],
					[
						-3.5057939,
						48.8183052,
						14.6
					],
					[
						-3.5099642,
						48.8178886,
						11.2
					],
					[
						-3.5115609,
						48.8174593,
						9.8
					],
					[
						-3.5149083,
						48.8172566,
						9.8
					],
					[
						-3.5160887,
						48.8156456,
						11.2
					],
					[
						-3.5183598,
						48.8139223,
						17
					],
					[
						-3.5200506,
						48.8108795,
						33.3
					],
					[
						-3.5252343,
						48.8104583,
						17.4
					],
					[
						-3.5257857,
						48.8088003,
						20.8
					],
					[
						-3.5272458,
						48.8079391,
						35.2
					],
					[
						-3.525959,
						48.8061955,
						39.1
					],
					[
						-3.5258792,
						48.8058388,
						37.6
					],
					[
						-3.5274188,
						48.8050424,
						29
					],
					[
						-3.5272893,
						48.8035669,
						29.5
					],
					[
						-3.5280502,
						48.8026106,
						28
					],
					[
						-3.5279617,
						48.8018984,
						26.6
					],
					[
						-3.5312457,
						48.8000318,
						25.1
					],
					[
						-3.5322753,
						48.8006243,
						21.8
					],
					[
						-3.5324205,
						48.8007868,
						20.8
					],
					[
						-3.533105,
						48.8000626,
						17.9
					],
					[
						-3.5327064,
						48.7988578,
						21.8
					],
					[
						-3.533151,
						48.7985888,
						22.3
					],
					[
						-3.5345926,
						48.7985646,
						22.7
					],
					[
						-3.5358387,
						48.7990772,
						25.6
					],
					[
						-3.5369908,
						48.7993908,
						24.2
					],
					[
						-3.5365927,
						48.7977153,
						29.9
					],
					[
						-3.5365329,
						48.796392,
						28
					],
					[
						-3.5371077,
						48.7951507,
						28.5
					],
					[
						-3.539202,
						48.794398,
						36.7
					],
					[
						-3.5395008,
						48.7939919,
						38.1
					],
					[
						-3.5397235,
						48.7935889,
						38.1
					],
					[
						-3.5400164,
						48.7934799,
						37.6
					],
					[
						-3.5421351,
						48.7934207,
						38.1
					],
					[
						-3.5443294,
						48.7925913,
						51.6
					],
					[
						-3.5470256,
						48.791662,
						42
					],
					[
						-3.5462348,
						48.7907771,
						48.7
					],
					[
						-3.5463557,
						48.79054,
						49.7
					],
					[
						-3.5463349,
						48.7902439,
						50.1
					],
					[
						-3.5456988,
						48.7893071,
						43.9
					],
					[
						-3.5447343,
						48.7886606,
						34.3
					],
					[
						-3.5414013,
						48.7879094,
						31.9
					],
					[
						-3.5403742,
						48.7871535,
						36.2
					],
					[
						-3.5383035,
						48.7863823,
						29.9
					],
					[
						-3.5361351,
						48.7860084,
						24.2
					],
					[
						-3.5330533,
						48.7848175,
						28
					],
					[
						-3.5322484,
						48.7847493,
						27.5
					],
					[
						-3.5316074,
						48.7845883,
						24.7
					],
					[
						-3.531227,
						48.784107,
						21.3
					],
					[
						-3.5315322,
						48.7836153,
						21.3
					],
					[
						-3.5324145,
						48.7832263,
						23.7
					],
					[
						-3.5362623,
						48.7837201,
						18.9
					],
					[
						-3.538477,
						48.7834893,
						21.3
					],
					[
						-3.5401677,
						48.7836595,
						26.1
					],
					[
						-3.5446312,
						48.7840655,
						30.9
					],
					[
						-3.5451342,
						48.783438,
						37.6
					],
					[
						-3.5453214,
						48.7822118,
						45.8
					],
					[
						-3.5452818,
						48.7813815,
						46.3
					],
					[
						-3.5458879,
						48.7812113,
						52.1
					],
					[
						-3.5468963,
						48.7811896,
						50.1
					],
					[
						-3.5475477,
						48.7801332,
						56.4
					],
					[
						-3.5483107,
						48.7797177,
						60.7
					],
					[
						-3.5484999,
						48.7796016,
						61.7
					],
					[
						-3.5491437,
						48.7791779,
						63.6
					],
					[
						-3.5504692,
						48.7785472,
						59.7
					],
					[
						-3.5546571,
						48.7750374,
						63.6
					],
					[
						-3.5559851,
						48.7745865,
						67.4
					],
					[
						-3.5574945,
						48.7741858,
						65.5
					],
					[
						-3.5584289,
						48.7737933,
						58.3
					],
					[
						-3.5598903,
						48.7744114,
						52.5
					],
					[
						-3.5609048,
						48.7750352,
						42
					],
					[
						-3.5630941,
						48.7753578,
						54.9
					],
					[
						-3.5636808,
						48.7752296,
						54
					],
					[
						-3.5644156,
						48.7750818,
						51.6
					],
					[
						-3.5658764,
						48.7761303,
						48.2
					],
					[
						-3.5667342,
						48.7761314,
						43.4
					],
					[
						-3.5690225,
						48.7755705,
						35.2
					],
					[
						-3.5698238,
						48.7740305,
						35.2
					],
					[
						-3.5704841,
						48.7737729,
						34.3
					],
					[
						-3.5710326,
						48.7735016,
						32.8
					],
					[
						-3.5738413,
						48.7734067,
						19.8
					],
					[
						-3.5759913,
						48.7741221,
						23.2
					],
					[
						-3.5761628,
						48.7741396,
						29.5
					],
					[
						-3.5763815,
						48.7741578,
						29.9
					],
					[
						-3.5766126,
						48.7741534,
						30.9
					],
					[
						-3.5768522,
						48.7740786,
						31.9
					],
					[
						-3.5773218,
						48.7728213,
						35.2
					],
					[
						-3.5780755,
						48.7722814,
						35.2
					],
					[
						-3.577613,
						48.770142,
						46.8
					],
					[
						-3.5781579,
						48.7682829,
						56.4
					],
					[
						-3.5771043,
						48.7670814,
						63.6
					],
					[
						-3.5759703,
						48.7664069,
						61.7
					],
					[
						-3.5755533,
						48.7651594,
						67.4
					],
					[
						-3.5755664,
						48.7642617,
						68.4
					],
					[
						-3.5748797,
						48.7623185,
						63.6
					],
					[
						-3.5714483,
						48.7642851,
						75.1
					],
					[
						-3.5697448,
						48.7645425,
						82.8
					],
					[
						-3.568363,
						48.7653989,
						79
					],
					[
						-3.5667236,
						48.765517,
						74.6
					],
					[
						-3.5653843,
						48.7661038,
						75.1
					],
					[
						-3.5626369,
						48.7666065,
						75.1
					],
					[
						-3.5590873,
						48.766626,
						78
					],
					[
						-3.5578664,
						48.7664807,
						79.5
					],
					[
						-3.5568856,
						48.7659717,
						85.7
					],
					[
						-3.5555588,
						48.7649571,
						85.2
					],
					[
						-3.5539067,
						48.764351,
						85.7
					],
					[
						-3.5518469,
						48.7629797,
						93.9
					],
					[
						-3.550781,
						48.7589869,
						93.4
					],
					[
						-3.547557,
						48.7587243,
						96.3
					],
					[
						-3.5464852,
						48.7582519,
						96.3
					],
					[
						-3.5461611,
						48.7568578,
						94.4
					],
					[
						-3.5453654,
						48.7562489,
						94.8
					],
					[
						-3.5453435,
						48.7562303,
						94.4
					],
					[
						-3.5466961,
						48.7550946,
						93.9
					],
					[
						-3.5493228,
						48.7539637,
						95.3
					],
					[
						-3.5483526,
						48.7534115,
						93.9
					],
					[
						-3.5457494,
						48.7531064,
						91.5
					],
					[
						-3.5432225,
						48.7533615,
						79.5
					],
					[
						-3.5412192,
						48.7528857,
						72.2
					],
					[
						-3.5394059,
						48.7537571,
						74.6
					],
					[
						-3.5378582,
						48.7550779,
						79
					],
					[
						-3.5375386,
						48.7552593,
						79.5
					],
					[
						-3.5368567,
						48.755764,
						78
					],
					[
						-3.5330925,
						48.7572504,
						80.9
					],
					[
						-3.5321101,
						48.7580771,
						90
					],
					[
						-3.5306211,
						48.7576666,
						95.3
					],
					[
						-3.5310722,
						48.7566804,
						95.8
					],
					[
						-3.5302108,
						48.7563357,
						97.7
					],
					[
						-3.5300181,
						48.7558627,
						99.2
					],
					[
						-3.5299025,
						48.7555262,
						100.1
					],
					[
						-3.5295923,
						48.7546414,
						100.6
					],
					[
						-3.526844,
						48.7547089,
						104
					],
					[
						-3.5262538,
						48.7543308,
						105.4
					],
					[
						-3.5244057,
						48.7515104,
						100.1
					],
					[
						-3.5249733,
						48.7507212,
						97.2
					],
					[
						-3.5243687,
						48.7501116,
						101.6
					],
					[
						-3.5244273,
						48.7500412,
						100.6
					],
					[
						-3.5227644,
						48.750362,
						104
					],
					[
						-3.520309,
						48.7500123,
						107.3
					],
					[
						-3.5168763,
						48.7492099,
						105.4
					],
					[
						-3.5127569,
						48.748542,
						101.1
					],
					[
						-3.5094814,
						48.7484807,
						99.2
					],
					[
						-3.5078839,
						48.7479706,
						102
					],
					[
						-3.506123,
						48.7478825,
						105.4
					],
					[
						-3.5053737,
						48.7475118,
						105.9
					],
					[
						-3.5006446,
						48.7444926,
						92.9
					],
					[
						-3.4967606,
						48.7451684,
						85.2
					],
					[
						-3.4950787,
						48.7451409,
						90
					],
					[
						-3.4931153,
						48.7457932,
						101.1
					],
					[
						-3.4900334,
						48.7459526,
						98.2
					],
					[
						-3.4884928,
						48.7456872,
						98.2
					],
					[
						-3.4876313,
						48.7460625,
						99.2
					],
					[
						-3.4829637,
						48.745996,
						73.7
					],
					[
						-3.4826419,
						48.7451088,
						73.7
					],
					[
						-3.4827278,
						48.7442716,
						65.5
					],
					[
						-3.482189,
						48.7438154,
						60.7
					],
					[
						-3.4820324,
						48.7430286,
						67.9
					],
					[
						-3.4812288,
						48.7427514,
						64.6
					],
					[
						-3.4790543,
						48.7432129,
						71.3
					],
					[
						-3.4767266,
						48.7420648,
						67.9
					],
					[
						-3.4763446,
						48.7422246,
						69.4
					],
					[
						-3.4746243,
						48.7419397,
						70.8
					],
					[
						-3.4731507,
						48.7426109,
						70.8
					],
					[
						-3.4707967,
						48.7452081,
						76.6
					],
					[
						-3.4697549,
						48.7459399,
						81.4
					],
					[
						-3.4693853,
						48.7460838,
						80.9
					],
					[
						-3.4668553,
						48.7463977,
						69.8
					],
					[
						-3.4666208,
						48.7462651,
						76.1
					],
					[
						-3.4656948,
						48.7449273,
						66
					],
					[
						-3.4649277,
						48.7428258,
						64.1
					],
					[
						-3.4640682,
						48.739578,
						45.8
					],
					[
						-3.4633383,
						48.7392966,
						48.2
					],
					[
						-3.4630678,
						48.7392462,
						44.4
					],
					[
						-3.4614207,
						48.7366524,
						48.7
					],
					[
						-3.4610403,
						48.7368413,
						51.1
					],
					[
						-3.4596496,
						48.7372194,
						50.6
					],
					[
						-3.4593005,
						48.7365183,
						49.2
					],
					[
						-3.4585285,
						48.7363959,
						49.2
					],
					[
						-3.4569271,
						48.7370777,
						42
					],
					[
						-3.4560541,
						48.7372728,
						32.8
					],
					[
						-3.4553395,
						48.7370536,
						23.2
					],
					[
						-3.4550618,
						48.7361062,
						16.5
					],
					[
						-3.4553078,
						48.7350794,
						12.6
					],
					[
						-3.4570678,
						48.7345795,
						13.1
					],
					[
						-3.458971,
						48.7344318,
						9.8
					],
					[
						-3.459894,
						48.7329411,
						18.9
					],
					[
						-3.4598993,
						48.7329303,
						18.4
					],
					[
						-3.4618715,
						48.7323362,
						11.2
					],
					[
						-3.4626608,
						48.7325703,
						9.8
					],
					[
						-3.4638402,
						48.7321914,
						9.3
					],
					[
						-3.46317,
						48.731715,
						9.8
					],
					[
						-3.4620219,
						48.7317319,
						8.8
					],
					[
						-3.4599186,
						48.7308608,
						7.8
					],
					[
						-3.4603702,
						48.7304086,
						8.3
					],
					[
						-3.458531,
						48.7275961,
						10.7
					],
					[
						-3.4584513,
						48.727456,
						9.3
					],
					[
						-3.456646,
						48.7259943,
						12.2
					],
					[
						-3.4554422,
						48.7254834,
						20.3
					],
					[
						-3.4544385,
						48.7249071,
						15
					],
					[
						-3.44957,
						48.7229974,
						1.6
					],
					[
						-3.4478571,
						48.7226175,
						0.1
					],
					[
						-3.4472513,
						48.721439,
						19.8
					],
					[
						-3.4453398,
						48.7211322,
						19.8
					],
					[
						-3.4445747,
						48.7202703,
						34.3
					],
					[
						-3.4481658,
						48.7202322,
						53
					],
					[
						-3.4482223,
						48.7192393,
						56.9
					],
					[
						-3.4485896,
						48.7181079,
						57.8
					],
					[
						-3.451372,
						48.7181704,
						62.1
					],
					[
						-3.4531424,
						48.7178001,
						59.7
					],
					[
						-3.4524933,
						48.7158372,
						59.3
					],
					[
						-3.4538085,
						48.7161121,
						55.9
					],
					[
						-3.4534567,
						48.7145394,
						55.9
					],
					[
						-3.4544824,
						48.7090746,
						57.8
					],
					[
						-3.4551044,
						48.7087197,
						60.7
					],
					[
						-3.4565279,
						48.7082178,
						53
					],
					[
						-3.4575398,
						48.7074055,
						54.5
					],
					[
						-3.4568697,
						48.7062094,
						65.5
					],
					[
						-3.4578485,
						48.7058738,
						71.3
					],
					[
						-3.4592418,
						48.7068537,
						66.5
					],
					[
						-3.462235,
						48.7066352,
						68.9
					],
					[
						-3.4642715,
						48.7071551,
						61.7
					],
					[
						-3.4658598,
						48.7079634,
						49.7
					],
					[
						-3.4672471,
						48.7100843,
						31.9
					],
					[
						-3.4689873,
						48.710571,
						24.2
					],
					[
						-3.4696649,
						48.7103281,
						20.3
					],
					[
						-3.4703315,
						48.7094307,
						27.1
					],
					[
						-3.4760741,
						48.7084576,
						54.9
					],
					[
						-3.4787918,
						48.7079235,
						60.2
					],
					[
						-3.4797401,
						48.7075151,
						68.9
					],
					[
						-3.4808742,
						48.707045,
						69.8
					],
					[
						-3.4814224,
						48.7067464,
						68.4
					],
					[
						-3.4872481,
						48.7030532,
						74.2
					],
					[
						-3.496289,
						48.6997728,
						86.7
					],
					[
						-3.4990131,
						48.6991501,
						86.7
					],
					[
						-3.5001851,
						48.6989841,
						81.4
					],
					[
						-3.5038427,
						48.6973465,
						89.5
					],
					[
						-3.5050726,
						48.6971116,
						91
					],
					[
						-3.5070101,
						48.696648,
						90.5
					],
					[
						-3.5133548,
						48.69173,
						99.2
					],
					[
						-3.5142781,
						48.6899347,
						106.4
					],
					[
						-3.5171806,
						48.6891047,
						113.6
					],
					[
						-3.5174834,
						48.6890749,
						113.6
					],
					[
						-3.5185781,
						48.688706,
						113.1
					],
					[
						-3.520471,
						48.6849902,
						113.1
					],
					[
						-3.5221949,
						48.6829053,
						112.6
					],
					[
						-3.5226424,
						48.6823719,
						111.2
					],
					[
						-3.525677,
						48.6818264,
						109.7
					],
					[
						-3.5318281,
						48.6803559,
						96.8
					],
					[
						-3.5325507,
						48.6798833,
						92.9
					],
					[
						-3.5339959,
						48.6783387,
						86.7
					],
					[
						-3.5343757,
						48.6779257,
						83.8
					],
					[
						-3.5351251,
						48.6774518,
						86.2
					],
					[
						-3.5364109,
						48.6771911,
						83.3
					],
					[
						-3.5440435,
						48.6771822,
						71.3
					],
					[
						-3.5447895,
						48.6774086,
						69.8
					],
					[
						-3.545211,
						48.6781945,
						67
					],
					[
						-3.5439724,
						48.6794829,
						65.5
					],
					[
						-3.5442173,
						48.6804158,
						64.1
					],
					[
						-3.5455309,
						48.6816314,
						61.2
					],
					[
						-3.547417,
						48.682582,
						54.9
					],
					[
						-3.5501649,
						48.6829435,
						46.3
					],
					[
						-3.5522272,
						48.6823681,
						41
					],
					[
						-3.5531529,
						48.6827788,
						39.1
					],
					[
						-3.554871,
						48.6833377,
						32.8
					],
					[
						-3.5586912,
						48.6826575,
						23.7
					],
					[
						-3.5616893,
						48.6841906,
						24.7
					],
					[
						-3.5617041,
						48.6840995,
						30.4
					],
					[
						-3.5618825,
						48.6840492,
						31.9
					],
					[
						-3.5623114,
						48.6841686,
						32.3
					],
					[
						-3.5635676,
						48.6844284,
						29
					],
					[
						-3.5658252,
						48.6841688,
						28.5
					],
					[
						-3.5665537,
						48.6836948,
						28
					],
					[
						-3.5669282,
						48.682384,
						27.5
					],
					[
						-3.5687587,
						48.6796394,
						25.1
					],
					[
						-3.5694568,
						48.6783267,
						18.9
					],
					[
						-3.5706342,
						48.6771361,
						15
					],
					[
						-3.5711238,
						48.6764846,
						12.2
					],
					[
						-3.5714882,
						48.6754513,
						7.4
					],
					[
						-3.5722657,
						48.6751083,
						4.9
					],
					[
						-3.5727194,
						48.6752361,
						5.4
					],
					[
						-3.5797398,
						48.670911,
						4.5
					],
					[
						-3.5820362,
						48.6702525,
						5.4
					],
					[
						-3.5829319,
						48.6702497,
						4.5
					],
					[
						-3.5868857,
						48.670873,
						5.9
					],
					[
						-3.5885708,
						48.6715304,
						5.9
					],
					[
						-3.5895414,
						48.671412,
						6.4
					],
					[
						-3.5940308,
						48.6691065,
						4.5
					],
					[
						-3.5955174,
						48.6686258,
						6.4
					],
					[
						-3.5959079,
						48.6685599,
						5.9
					],
					[
						-3.598209,
						48.6686592,
						7.8
					],
					[
						-3.6033587,
						48.6681631,
						12.6
					],
					[
						-3.6048423,
						48.6684381,
						18.9
					],
					[
						-3.6060952,
						48.6687579,
						15.5
					],
					[
						-3.609473,
						48.6690137,
						28.5
					],
					[
						-3.6119777,
						48.6688964,
						32.8
					],
					[
						-3.613,
						48.6690885,
						37.2
					],
					[
						-3.6148219,
						48.6691601,
						38.6
					],
					[
						-3.6164953,
						48.6688156,
						42.4
					],
					[
						-3.6167528,
						48.6687742,
						40.5
					],
					[
						-3.6173093,
						48.6716327,
						47.7
					],
					[
						-3.617249,
						48.6736361,
						43.4
					],
					[
						-3.6204078,
						48.6775653,
						50.1
					],
					[
						-3.619328,
						48.6807787,
						63.6
					],
					[
						-3.6234649,
						48.6813527,
						55.4
					],
					[
						-3.624698,
						48.6812683,
						54
					],
					[
						-3.6291793,
						48.6806218,
						38.6
					],
					[
						-3.6326925,
						48.6805204,
						36.2
					],
					[
						-3.6355885,
						48.6806098,
						27.5
					],
					[
						-3.6361771,
						48.6800608,
						23.2
					],
					[
						-3.6370042,
						48.6769521,
						13.6
					],
					[
						-3.6365147,
						48.6756261,
						16
					],
					[
						-3.6348672,
						48.6735688,
						18.9
					],
					[
						-3.6345006,
						48.672186,
						12.6
					],
					[
						-3.6348992,
						48.6709588,
						4
					],
					[
						-3.6404389,
						48.6697612,
						5.9
					],
					[
						-3.6424769,
						48.6696605,
						6.4
					],
					[
						-3.6434295,
						48.6699635,
						6.4
					],
					[
						-3.8286511,
						48.5778405,
						20.3
					],
					[
						-3.8308467,
						48.580475,
						9.3
					],
					[
						-3.8326417,
						48.5816483,
						20.5
					],
					[
						-3.8340998,
						48.5832934,
						20.1
					],
					[
						-3.8349733,
						48.5841316,
						6.7
					],
					[
						-3.836185,
						48.584375,
						8.3
					],
					[
						-3.83798,
						48.5869066,
						5.1
					],
					[
						-3.8427133,
						48.5858583,
						36
					],
					[
						-3.84316,
						48.585745,
						31.6
					],
					[
						-3.8466483,
						48.582205,
						52.1
					],
					[
						-3.848285,
						48.5838633,
						53.4
					],
					[
						-3.8490284,
						48.5854517,
						64.8
					],
					[
						-3.849115,
						48.5855234,
						64.6
					],
					[
						-3.84992,
						48.5859583,
						68.8
					],
					[
						-3.8508383,
						48.5855167,
						76.7
					],
					[
						-3.8510417,
						48.5853983,
						78
					],
					[
						-3.85191,
						48.5844466,
						82.1
					],
					[
						-3.8518533,
						48.5837566,
						79.3
					],
					[
						-3.85302,
						48.5826516,
						87.8
					],
					[
						-3.8558967,
						48.5815834,
						85.1
					],
					[
						-3.8563733,
						48.5834917,
						87.8
					],
					[
						-3.8575483,
						48.5847666,
						89.1
					],
					[
						-3.859625,
						48.5857117,
						87.1
					],
					[
						-3.8617284,
						48.587135,
						95
					],
					[
						-3.86211,
						48.58729,
						93.5
					],
					[
						-3.8625733,
						48.5869467,
						94.8
					],
					[
						-3.8637984,
						48.5855517,
						84
					],
					[
						-3.8661267,
						48.5841616,
						74.35
					],
					[
						-3.868125,
						48.5823967,
						47.1
					],
					[
						-3.8713516,
						48.5831784,
						41
					],
					[
						-3.8721834,
						48.5829034,
						43.2
					],
					[
						-3.872675,
						48.5826216,
						37.9
					],
					[
						-3.8733867,
						48.5818783,
						35.8
					],
					[
						-3.87443,
						48.582605,
						40.8
					],
					[
						-3.875665,
						48.58283,
						44
					],
					[
						-3.87689,
						48.5827884,
						49.6
					],
					[
						-3.8777634,
						48.5823817,
						55
					],
					[
						-3.8788417,
						48.58209,
						60.3
					],
					[
						-3.879115,
						48.5821333,
						60.3
					],
					[
						-3.87986,
						48.582545,
						62.5
					],
					[
						-3.880015,
						48.58324,
						67.1
					],
					[
						-3.88004,
						48.5849417,
						74.6
					],
					[
						-3.8820934,
						48.5849966,
						84.2
					],
					[
						-3.882245,
						48.5850283,
						84.6
					],
					[
						-3.885975,
						48.586165,
						81.9
					],
					[
						-3.8882433,
						48.586735,
						70.7
					],
					[
						-3.89012,
						48.588065,
						76.1
					],
					[
						-3.8916283,
						48.5886267,
						83.1
					],
					[
						-3.893705,
						48.5908233,
						97.7
					],
					[
						-3.8953167,
						48.5925033,
						87.1
					],
					[
						-3.901245,
						48.594475,
						91.2
					],
					[
						-3.9013567,
						48.59449,
						91.1
					],
					[
						-3.9024866,
						48.5946891,
						87.05
					],
					[
						-3.9078917,
						48.5945267,
						75.1
					],
					[
						-3.910885,
						48.5952216,
						66.3
					],
					[
						-3.9143193,
						48.5950099,
						66
					],
					[
						-3.9176238,
						48.595166,
						57.2
					],
					[
						-3.9181066,
						48.595166,
						48.7
					],
					[
						-3.9251769,
						48.5960743,
						48.1
					],
					[
						-3.9266253,
						48.5959111,
						48.2
					],
					[
						-3.9296132,
						48.5949745,
						25.7
					],
					[
						-3.9311796,
						48.5947829,
						18
					],
					[
						-3.9329175,
						48.5962917,
						17.7
					],
					[
						-3.933845,
						48.59759,
						5.7
					],
					[
						-3.9352766,
						48.5982883,
						10.7
					],
					[
						-3.9354336,
						48.5983271,
						4.9
					],
					[
						-3.9358717,
						48.5989817,
						6.1
					],
					[
						-3.9372033,
						48.5999167,
						9.9
					],
					[
						-3.937355,
						48.5999867,
						10
					],
					[
						-3.9402484,
						48.6017333,
						8.5
					],
					[
						-3.94171,
						48.6039434,
						16
					],
					[
						-3.94148,
						48.6078134,
						7.8
					],
					[
						-3.9427917,
						48.60987,
						9.4
					],
					[
						-3.947635,
						48.6150133,
						16.3
					],
					[
						-3.9487784,
						48.6157266,
						12.2
					],
					[
						-3.9502933,
						48.6173567,
						12.8
					],
					[
						-3.95095,
						48.61762,
						12
					],
					[
						-3.9536467,
						48.6188633,
						-3.5
					],
					[
						-3.953605,
						48.6201883,
						12.9
					],
					[
						-3.9535266,
						48.621715,
						14.1
					],
					[
						-3.9547083,
						48.6263116,
						11
					],
					[
						-3.9552766,
						48.6265728,
						13.9
					],
					[
						-3.9588616,
						48.6265967,
						10.7
					],
					[
						-3.9612184,
						48.627095,
						6.8
					],
					[
						-3.9626567,
						48.6284367,
						11.4
					],
					[
						-3.96283,
						48.62861,
						4.2
					],
					[
						-3.9636334,
						48.629625,
						11.7
					],
					[
						-3.9642133,
						48.6306667,
						16
					],
					[
						-3.9654817,
						48.6319283,
						15
					],
					[
						-3.9694683,
						48.6380166,
						32.2
					],
					[
						-3.96896,
						48.639205,
						36.7
					],
					[
						-3.9639966,
						48.64251,
						55
					],
					[
						-3.962142,
						48.6437185,
						46.55
					],
					[
						-3.9602183,
						48.64349,
						33.6
					],
					[
						-3.9582517,
						48.64434,
						31.3
					],
					[
						-3.9563657,
						48.645751,
						13.72
					],
					[
						-3.9550433,
						48.6450383,
						15.9
					],
					[
						-3.953467,
						48.6447752,
						16.61
					],
					[
						-3.955245,
						48.6458317,
						14.2
					],
					[
						-3.956105,
						48.646475,
						7.1
					],
					[
						-3.9565417,
						48.6474933,
						13.2
					],
					[
						-3.9565877,
						48.6475501,
						12.7
					],
					[
						-3.9577447,
						48.6479084,
						13.26
					],
					[
						-3.957912,
						48.6481817,
						14.33
					],
					[
						-3.9562304,
						48.6488071,
						7.22
					],
					[
						-3.9568483,
						48.6493267,
						12.6
					],
					[
						-3.957505,
						48.6496006,
						14.27
					],
					[
						-3.9577883,
						48.64999,
						11.5
					],
					[
						-3.9575867,
						48.651445,
						15.2
					],
					[
						-3.958595,
						48.6516583,
						20.3
					],
					[
						-3.9586766,
						48.6517059,
						16.15
					],
					[
						-3.957075,
						48.6538961,
						24.2
					],
					[
						-3.9549167,
						48.6579,
						19.9
					],
					[
						-3.9543217,
						48.65846,
						18
					],
					[
						-3.9542933,
						48.65936,
						22.8
					],
					[
						-3.95518,
						48.660725,
						22.9
					],
					[
						-3.9564417,
						48.6611016,
						27.7
					],
					[
						-3.9577333,
						48.662595,
						23
					],
					[
						-3.9614167,
						48.664115,
						32.2
					],
					[
						-3.9624166,
						48.6648583,
						33.5
					],
					[
						-3.96329,
						48.6659766,
						32.9
					],
					[
						-3.9649016,
						48.6671116,
						29.9
					],
					[
						-3.9653517,
						48.6679433,
						22.2
					],
					[
						-3.9671883,
						48.6688433,
						19.2
					],
					[
						-3.9681083,
						48.6702016,
						15.5
					],
					[
						-3.973775,
						48.6723233,
						11.3
					],
					[
						-3.9764734,
						48.675,
						18.1
					],
					[
						-3.9771234,
						48.675395,
						16
					],
					[
						-3.9792566,
						48.676285,
						11.2
					],
					[
						-3.9807066,
						48.6764684,
						14.5
					],
					[
						-3.9811983,
						48.67839,
						15.2
					],
					[
						-3.9836716,
						48.6812367,
						30.3
					],
					[
						-3.9837217,
						48.6817017,
						32.5
					],
					[
						-3.98374,
						48.6818883,
						32.5
					],
					[
						-3.9869512,
						48.6830445,
						57.61
					],
					[
						-3.9865667,
						48.684465,
						43.5
					],
					[
						-3.986945,
						48.6848172,
						46.33
					],
					[
						-3.98751,
						48.684985,
						22.77
					],
					[
						-3.9876361,
						48.6854377,
						18.83
					],
					[
						-3.9866233,
						48.6856983,
						44
					],
					[
						-3.9868377,
						48.6871954,
						47.51
					],
					[
						-3.986105,
						48.6873789,
						60.27
					],
					[
						-3.9847367,
						48.6895166,
						46.6
					],
					[
						-3.9844188,
						48.6915234,
						51.4
					],
					[
						-3.9828273,
						48.6937534,
						45.93
					],
					[
						-3.9826843,
						48.697202,
						16.72
					],
					[
						-3.98153,
						48.6988983,
						18.3
					],
					[
						-3.9819022,
						48.700645,
						40.93
					],
					[
						-3.9821255,
						48.7026328,
						36.3
					],
					[
						-3.97997,
						48.7030766,
						36.8
					],
					[
						-3.9791205,
						48.7041105,
						35.3
					],
					[
						-3.98009,
						48.7051356,
						26.8
					],
					[
						-3.9803367,
						48.7056911,
						18.73
					],
					[
						-3.9801982,
						48.7064002,
						25.94
					],
					[
						-3.9797477,
						48.7066405,
						24.63
					],
					[
						-3.9799067,
						48.707605,
						27.4
					],
					[
						-3.9786917,
						48.7084384,
						23
					],
					[
						-3.9762734,
						48.7083378,
						17
					],
					[
						-3.97675,
						48.7098366,
						20.8
					],
					[
						-3.9760817,
						48.7105428,
						24.63
					],
					[
						-3.9759928,
						48.7106084,
						24.73
					],
					[
						-3.97374,
						48.7114616,
						19.7
					],
					[
						-3.974025,
						48.71239,
						28.9
					],
					[
						-3.9748044,
						48.7127477,
						31.1
					],
					[
						-3.9749634,
						48.7134217,
						32
					],
					[
						-3.9750784,
						48.7140905,
						28.83
					],
					[
						-3.9732845,
						48.7142634,
						16.9
					],
					[
						-3.9722533,
						48.7154733,
						15.9
					],
					[
						-3.9721533,
						48.7161133,
						18.4
					],
					[
						-3.9726894,
						48.7169578,
						18.13
					],
					[
						-3.9721894,
						48.7173011,
						20.5
					],
					[
						-3.9723406,
						48.7178605,
						25.93
					],
					[
						-3.9723339,
						48.7179216,
						26.34
					],
					[
						-3.9724317,
						48.7186433,
						23.77
					],
					[
						-3.97278,
						48.7194067,
						14.37
					],
					[
						-3.9723833,
						48.719875,
						18.9
					],
					[
						-3.9716316,
						48.7204383,
						17.2
					],
					[
						-3.9711627,
						48.7217922,
						17.03
					],
					[
						-3.9710545,
						48.7224467,
						14.43
					],
					[
						-3.971665,
						48.724725,
						11.8
					],
					[
						-3.974055,
						48.72452,
						3.3
					],
					[
						-3.974135,
						48.723555,
						3.6
					],
					[
						-3.9752817,
						48.7231978,
						5.73
					],
					[
						-3.97613,
						48.7225694,
						9.47
					],
					[
						-3.9762533,
						48.7222022,
						9.47
					],
					[
						-3.9781673,
						48.7219883,
						9.37
					],
					[
						-3.9799984,
						48.7223783,
						7.7
					],
					[
						-3.9821033,
						48.723855,
						8.3
					]
				]
			}
		}
	]
};

/***/ }),

/***/ "./src/Trip/Map/bike_roads/veloscenie.json":
/* no static exports found */
/* exports used: default */
/*!*************************************************!*\
  !*** ./src/Trip/Map/bike_roads/veloscenie.json ***!
  \*************************************************/
/***/ (function(module, exports) {

module.exports = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[
						2.3458507005125284,
						48.85533104650676,
						0
					],
					[
						2.3441145569086075,
						48.853585766628385,
						0
					],
					[
						2.3431058786809444,
						48.851439747959375,
						0
					],
					[
						2.3359160497784615,
						48.85312685742974,
						0
					],
					[
						2.3344758711755276,
						48.852777080610394,
						0
					],
					[
						2.3320676665753126,
						48.852466866374016,
						0
					],
					[
						2.3239608574658632,
						48.84390441700816,
						0
					],
					[
						2.3245632648468018,
						48.84368296712637,
						0
					],
					[
						2.324361763894558,
						48.84346595965326,
						0
					],
					[
						2.3213251680135727,
						48.84121835231781,
						0
					],
					[
						2.321760607883334,
						48.840213529765606,
						0
					],
					[
						2.321275882422924,
						48.83977012708783,
						0
					],
					[
						2.318606832996011,
						48.83757842704654,
						0
					],
					[
						2.318298378959298,
						48.83719897828996,
						0
					],
					[
						2.316976133733988,
						48.837254382669926,
						0
					],
					[
						2.316002994775772,
						48.836655244231224,
						0
					],
					[
						2.3153711669147015,
						48.83601302281022,
						0
					],
					[
						2.3154467716813087,
						48.83543785661459,
						0
					],
					[
						2.3139063455164433,
						48.83447569794953,
						0
					],
					[
						2.3115063551813364,
						48.83258222602308,
						0
					],
					[
						2.308084610849619,
						48.83070979267359,
						0
					],
					[
						2.3057798389345407,
						48.8288526982069,
						0
					],
					[
						2.305318918079138,
						48.8276628870517,
						0
					],
					[
						2.3047668021172285,
						48.8271829392761,
						0
					],
					[
						2.3026295844465494,
						48.826064290478826,
						0
					],
					[
						2.302016783505678,
						48.82503541186452,
						0
					],
					[
						2.301442874595523,
						48.82516700774431,
						0
					],
					[
						2.299637496471405,
						48.823690451681614,
						0
					],
					[
						2.299022264778614,
						48.82285041734576,
						0
					],
					[
						2.2981685679405928,
						48.82252159528434,
						0
					],
					[
						2.2976697608828545,
						48.82214097306132,
						0
					],
					[
						2.2973351553082466,
						48.8216982409358,
						0
					],
					[
						2.2956673242151737,
						48.820141553878784,
						0
					],
					[
						2.2953381668776274,
						48.819303112104535,
						0
					],
					[
						2.294764844700694,
						48.81939866580069,
						0
					],
					[
						2.2945249546319246,
						48.81800324656069,
						0
					],
					[
						2.295283768326044,
						48.81627188064158,
						0
					],
					[
						2.296816734597087,
						48.81469801068306,
						0
					],
					[
						2.300237137824297,
						48.81148925051093,
						0
					],
					[
						2.299618972465396,
						48.81087401881814,
						0
					],
					[
						2.3008530400693417,
						48.81024269387126,
						0
					],
					[
						2.301109777763486,
						48.80937181413174,
						0
					],
					[
						2.2995598800480366,
						48.80817546509206,
						0
					],
					[
						2.29825590737164,
						48.80692672915757,
						0
					],
					[
						2.296005031093955,
						48.80521363578737,
						0
					],
					[
						2.295005489140749,
						48.80462313070893,
						0
					],
					[
						2.2949720453470945,
						48.80407428368926,
						0
					],
					[
						2.2942661214619875,
						48.80290986970067,
						0
					],
					[
						2.2958326153457165,
						48.80084146745503,
						0
					],
					[
						2.296004109084606,
						48.80023989826441,
						0
					],
					[
						2.2957757860422134,
						48.7979900278151,
						0
					],
					[
						2.2967868112027645,
						48.79772616550326,
						0
					],
					[
						2.2948807664215565,
						48.79571828059852,
						0
					],
					[
						2.2943005710840225,
						48.79533707164228,
						0
					],
					[
						2.2944154031574726,
						48.794897105544806,
						0
					],
					[
						2.2929384279996157,
						48.79338635131717,
						0
					],
					[
						2.292457977309823,
						48.791674599051476,
						0
					],
					[
						2.2918806318193674,
						48.79108660854399,
						0
					],
					[
						2.291603358462453,
						48.78944803029299,
						0
					],
					[
						2.2913336288183928,
						48.789266562089324,
						0
					],
					[
						2.2913649771362543,
						48.78896095789969,
						0
					],
					[
						2.290917383506894,
						48.78884134814143,
						0
					],
					[
						2.29078427888453,
						48.78862467594445,
						0
					],
					[
						2.2909526713192463,
						48.78824790939689,
						0
					],
					[
						2.2905197460204363,
						48.78805646672845,
						0
					],
					[
						2.290306007489562,
						48.78775840625167,
						0
					],
					[
						2.2905531898140907,
						48.787597976624966,
						0
					],
					[
						2.2900679614394903,
						48.78724434413016,
						0
					],
					[
						2.289605950936675,
						48.78618931397796,
						0
					],
					[
						2.28841345757246,
						48.78480604849756,
						0
					],
					[
						2.287790095433593,
						48.78360617905855,
						0
					],
					[
						2.2871962375938892,
						48.783242823556066,
						0
					],
					[
						2.286659460514784,
						48.78268199041486,
						0
					],
					[
						2.2866222448647022,
						48.782420977950096,
						0
					],
					[
						2.2870933916419744,
						48.78180314786732,
						0
					],
					[
						2.2867702692747116,
						48.78154942765832,
						0
					],
					[
						2.2866964247077703,
						48.78097333945334,
						0
					],
					[
						2.2868788987398148,
						48.7805696669966,
						0
					],
					[
						2.2866928204894066,
						48.78024478442967,
						0
					],
					[
						2.2869773861020803,
						48.77933803014457,
						0
					],
					[
						2.286909492686391,
						48.77833027392626,
						0
					],
					[
						2.2862015571445227,
						48.77735470421612,
						0
					],
					[
						2.286063339561224,
						48.775519067421556,
						0
					],
					[
						2.2854760196059942,
						48.772700317204,
						0
					],
					[
						2.2854995727539062,
						48.77197192981839,
						0
					],
					[
						2.2859291452914476,
						48.77140791155398,
						0
					],
					[
						2.2858780156821012,
						48.77116475254297,
						0
					],
					[
						2.2850521467626095,
						48.7708630040288,
						0
					],
					[
						2.2850274201482534,
						48.76869519241154,
						0
					],
					[
						2.2846631426364183,
						48.76846821047366,
						0
					],
					[
						2.2846846003085375,
						48.76590494066477,
						0
					],
					[
						2.2848819941282272,
						48.765402445569634,
						0
					],
					[
						2.284776633605361,
						48.76217281445861,
						0
					],
					[
						2.2850901167839766,
						48.76212973147631,
						0
					],
					[
						2.2848827484995127,
						48.76137301325798,
						0
					],
					[
						2.285069916397333,
						48.75962915830314,
						0
					],
					[
						2.284613521769643,
						48.75719798728824,
						0
					],
					[
						2.2850012686103582,
						48.75669666565955,
						0
					],
					[
						2.2847687546163797,
						48.75579577870667,
						0
					],
					[
						2.282340517267585,
						48.751346999779344,
						0
					],
					[
						2.2817536164075136,
						48.75149636529386,
						0
					],
					[
						2.28158094920218,
						48.75118950381875,
						0
					],
					[
						2.281323205679655,
						48.75114298425615,
						0
					],
					[
						2.2798976954072714,
						48.748975759372115,
						0
					],
					[
						2.2788730915635824,
						48.74831300228834,
						0
					],
					[
						2.278838139027357,
						48.747890051454306,
						0
					],
					[
						2.27850210852921,
						48.7476001214236,
						0
					],
					[
						2.277947897091508,
						48.747353944927454,
						0
					],
					[
						2.278320975601673,
						48.74693350866437,
						0
					],
					[
						2.2782555129379034,
						48.746744161471725,
						0
					],
					[
						2.278108326718211,
						48.74657241627574,
						0
					],
					[
						2.277309028431773,
						48.74634275212884,
						0
					],
					[
						2.278016796335578,
						48.74532166868448,
						0
					],
					[
						2.277764920145273,
						48.74485236592591,
						0
					],
					[
						2.2774412110447884,
						48.7446525413543,
						0
					],
					[
						2.2769514564424753,
						48.744667544960976,
						0
					],
					[
						2.2769175097346306,
						48.74417267739773,
						0
					],
					[
						2.2749190125614405,
						48.74118335545063,
						0
					],
					[
						2.274486254900694,
						48.74100985005498,
						0
					],
					[
						2.2745581716299057,
						48.74072243459523,
						0
					],
					[
						2.2735092602670193,
						48.738899203017354,
						0
					],
					[
						2.2726250533014536,
						48.73794039711356,
						0
					],
					[
						2.2711110301315784,
						48.7353497184813,
						0
					],
					[
						2.270401669666171,
						48.73453591950238,
						0
					],
					[
						2.269674874842167,
						48.734000734984875,
						0
					],
					[
						2.2662009950727224,
						48.73253130353987,
						0
					],
					[
						2.2663133963942528,
						48.73227121308446,
						0
					],
					[
						2.2693097591400146,
						48.72996895574033,
						0
					],
					[
						2.2655787225812674,
						48.72843498364091,
						0
					],
					[
						2.259687166661024,
						48.72395519167185,
						0
					],
					[
						2.258816370740533,
						48.72305036522448,
						0
					],
					[
						2.2582571301609278,
						48.72318179346621,
						0
					],
					[
						2.2572179418057203,
						48.722644597291946,
						0
					],
					[
						2.2554725781083107,
						48.72110467404127,
						0
					],
					[
						2.2547539975494146,
						48.72002081014216,
						0
					],
					[
						2.2545110899955034,
						48.71989340521395,
						0
					],
					[
						2.2541715390980244,
						48.71987328864634,
						0
					],
					[
						2.252417793497443,
						48.720833687111735,
						0
					],
					[
						2.251353459432721,
						48.72111489996314,
						0
					],
					[
						2.2508026845753193,
						48.71970824897289,
						0
					],
					[
						2.2483517322689295,
						48.718100767582655,
						0
					],
					[
						2.247748151421547,
						48.71753926388919,
						0
					],
					[
						2.2475245222449303,
						48.71701623313129,
						0
					],
					[
						2.246133964508772,
						48.71541537344456,
						0
					],
					[
						2.244659084826708,
						48.71401182375848,
						0
					],
					[
						2.243087897077203,
						48.71175315231085,
						0
					],
					[
						2.2422819770872593,
						48.71109148487449,
						0
					],
					[
						2.2407837118953466,
						48.70944485999644,
						0
					],
					[
						2.240562429651618,
						48.70876885950565,
						0
					],
					[
						2.2395240794867277,
						48.707278138026595,
						0
					],
					[
						2.2389601450413465,
						48.70680682361126,
						0
					],
					[
						2.234090259298682,
						48.70432904921472,
						0
					],
					[
						2.231922699138522,
						48.70386536233127,
						0
					],
					[
						2.230250174179673,
						48.70393551886082,
						0
					],
					[
						2.2244798205792904,
						48.70358331128955,
						0
					],
					[
						2.2222064808011055,
						48.702929858118296,
						0
					],
					[
						2.221410283818841,
						48.70255594141781,
						0
					],
					[
						2.220798907801509,
						48.701634434983134,
						0
					],
					[
						2.2201944049447775,
						48.70116278529167,
						0
					],
					[
						2.217465341091156,
						48.70010146871209,
						0
					],
					[
						2.2154427878558636,
						48.69995327666402,
						0
					],
					[
						2.2125180065631866,
						48.70016785338521,
						0
					],
					[
						2.2118404135107994,
						48.700046483427286,
						0
					],
					[
						2.209948617964983,
						48.699341313913465,
						0
					],
					[
						2.20616796053946,
						48.69865064509213,
						0
					],
					[
						2.198470188304782,
						48.6964313685894,
						0
					],
					[
						2.1937847044318914,
						48.6962828412652,
						0
					],
					[
						2.190875932574272,
						48.696344112977386,
						0
					],
					[
						2.1892386116087437,
						48.69678273797035,
						0
					],
					[
						2.1887774392962456,
						48.69760709814727,
						0
					],
					[
						2.1878638956695795,
						48.6978077609092,
						0
					],
					[
						2.1874915715306997,
						48.69728355668485,
						0
					],
					[
						2.186900060623884,
						48.696874771267176,
						0
					],
					[
						2.181555423885584,
						48.69629851542413,
						0
					],
					[
						2.178864497691393,
						48.695470467209816,
						0
					],
					[
						2.170839076861739,
						48.695163102820516,
						0
					],
					[
						2.169801564887166,
						48.69547071866691,
						0
					],
					[
						2.169086840003729,
						48.6951329279691,
						0
					],
					[
						2.1676733158528805,
						48.69515899568796,
						0
					],
					[
						2.1656414587050676,
						48.69476705789566,
						0
					],
					[
						2.1650434099137783,
						48.693926353007555,
						0
					],
					[
						2.166664134711027,
						48.69283125735819,
						0
					],
					[
						2.1666832454502583,
						48.69163507595658,
						0
					],
					[
						2.167347092181444,
						48.69090207852423,
						0
					],
					[
						2.1670952159911394,
						48.69050460867584,
						0
					],
					[
						2.1664859354496,
						48.69037435390055,
						0
					],
					[
						2.165838936343789,
						48.690055003389716,
						0
					],
					[
						2.165464097633958,
						48.689701622352004,
						0
					],
					[
						2.1648533921688795,
						48.68966138921678,
						0
					],
					[
						2.1654155664145947,
						48.68934145197272,
						0
					],
					[
						2.1657678578048944,
						48.6893979460001,
						0
					],
					[
						2.1659602224826813,
						48.689264338463545,
						0
					],
					[
						2.16633103787899,
						48.688160525634885,
						0
					],
					[
						2.165946224704385,
						48.68843670934439,
						0
					],
					[
						2.165621090680361,
						48.688380466774106,
						0
					],
					[
						2.1646069642156363,
						48.688076538965106,
						0
					],
					[
						2.1640190575271845,
						48.68746072053909,
						0
					],
					[
						2.163515305146575,
						48.68752911686897,
						0
					],
					[
						2.162321638315916,
						48.68656729348004,
						0
					],
					[
						2.161552933976054,
						48.685365580022335,
						0
					],
					[
						2.160854386165738,
						48.68487490341067,
						0
					],
					[
						2.1599850989878178,
						48.6857143510133,
						0
					],
					[
						2.1593175642192364,
						48.68667206726968,
						0
					],
					[
						2.1592592261731625,
						48.68692352436483,
						0
					],
					[
						2.159832715988159,
						48.68758418597281,
						0
					],
					[
						2.1598815824836493,
						48.68792633526027,
						0
					],
					[
						2.157056797295809,
						48.68533389642835,
						0
					],
					[
						2.1564579103142023,
						48.68456502445042,
						0
					],
					[
						2.156411809846759,
						48.68405196815729,
						0
					],
					[
						2.1561017632484436,
						48.68390587158501,
						0
					],
					[
						2.1551225893199444,
						48.68397091515362,
						0
					],
					[
						2.154773399233818,
						48.68372557684779,
						0
					],
					[
						2.1547238621860743,
						48.68342835456133,
						0
					],
					[
						2.154945395886898,
						48.68316910229623,
						0
					],
					[
						2.1540906094014645,
						48.68142700754106,
						0
					],
					[
						2.152650011703372,
						48.6789520829916,
						0
					],
					[
						2.151930173859,
						48.678110456094146,
						0
					],
					[
						2.1503052581101656,
						48.67696548812091,
						0
					],
					[
						2.1486769896000624,
						48.676027385517955,
						0
					],
					[
						2.145160613581538,
						48.67510269396007,
						0
					],
					[
						2.1444746386259794,
						48.674692986533046,
						0
					],
					[
						2.1408930514007807,
						48.67361482232809,
						0
					],
					[
						2.1407735254615545,
						48.6734520457685,
						0
					],
					[
						2.1386427618563175,
						48.6725281085819,
						0
					],
					[
						2.138371020555496,
						48.672535149380565,
						0
					],
					[
						2.1376216784119606,
						48.673501247540116,
						0
					],
					[
						2.1373236179351807,
						48.67345405742526,
						0
					],
					[
						2.1370300836861134,
						48.673137137666345,
						0
					],
					[
						2.13670352473855,
						48.67317074909806,
						0
					],
					[
						2.136082174256444,
						48.67296832613647,
						0
					],
					[
						2.135898694396019,
						48.67256222292781,
						0
					],
					[
						2.13553617708385,
						48.67230774834752,
						0
					],
					[
						2.1283997409045696,
						48.67023188620806,
						0
					],
					[
						2.125746365636587,
						48.66971765644848,
						0
					],
					[
						2.1255739498883486,
						48.66947357542813,
						0
					],
					[
						2.124173752963543,
						48.66874367929995,
						0
					],
					[
						2.1239600982517004,
						48.66852616891265,
						0
					],
					[
						2.122000325471163,
						48.667963072657585,
						0
					],
					[
						2.121192142367363,
						48.66757029667497,
						0
					],
					[
						2.1204061713069677,
						48.667465606704354,
						0
					],
					[
						2.1178398840129375,
						48.66663705557585,
						0
					],
					[
						2.1174832340329885,
						48.66685029119253,
						0
					],
					[
						2.11399644613266,
						48.66585292853415,
						0
					],
					[
						2.07961262203753,
						48.65576949901879,
						0
					],
					[
						2.075428878888488,
						48.65434281527996,
						0
					],
					[
						2.072401586920023,
						48.65279006771743,
						0
					],
					[
						2.073986940085888,
						48.65219973027706,
						0
					],
					[
						2.073762221261859,
						48.65185615606606,
						0
					],
					[
						2.0720751117914915,
						48.65052963607013,
						0
					],
					[
						2.0717022009193897,
						48.65012194029987,
						0
					],
					[
						2.0711421221494675,
						48.648786284029484,
						0
					],
					[
						2.0703334361314774,
						48.64845612086356,
						0
					],
					[
						2.069978965446353,
						48.64777869544923,
						0
					],
					[
						2.069323416799307,
						48.64723387174308,
						0
					],
					[
						2.0686132181435823,
						48.64595093764365,
						0
					],
					[
						2.0675917994230986,
						48.6446116771549,
						0
					],
					[
						2.0634319446980953,
						48.64494787529111,
						0
					],
					[
						2.0624252781271935,
						48.64431026391685,
						0
					],
					[
						2.0600189175456762,
						48.64376057870686,
						0
					],
					[
						2.0571709144860506,
						48.64436776377261,
						0
					],
					[
						2.0546129252761602,
						48.64469826221466,
						0
					],
					[
						2.05128681845963,
						48.64471678622067,
						0
					],
					[
						2.048403527587652,
						48.64651093259454,
						0
					],
					[
						2.0467008277773857,
						48.64683011546731,
						0
					],
					[
						2.045800779014826,
						48.64556360989809,
						0
					],
					[
						2.0435861963778734,
						48.64120996557176,
						0
					],
					[
						2.0427008159458637,
						48.64063614048064,
						0
					],
					[
						2.0424411445856094,
						48.63999534398317,
						0
					],
					[
						2.0408926717936993,
						48.638570588082075,
						0
					],
					[
						2.0365106128156185,
						48.63256218843162,
						0
					],
					[
						2.0346002094447613,
						48.63165610469878,
						0
					],
					[
						2.0331538282334805,
						48.630609875544906,
						0
					],
					[
						2.031135968863964,
						48.62964897416532,
						0
					],
					[
						2.0310633815824986,
						48.6291716247797,
						0
					],
					[
						2.030193507671356,
						48.627779223024845,
						0
					],
					[
						2.0275389589369297,
						48.62749666906893,
						0
					],
					[
						2.0275280624628067,
						48.627352667972445,
						0
					],
					[
						2.026935964822769,
						48.62708696164191,
						0
					],
					[
						2.0248575042933226,
						48.62647625617683,
						0
					],
					[
						2.022301107645035,
						48.625303795561194,
						0
					],
					[
						2.0219957549124956,
						48.62494152970612,
						0
					],
					[
						2.0221547596156597,
						48.62442101351917,
						0
					],
					[
						2.018877686932683,
						48.622612953186035,
						0
					],
					[
						2.0188434049487114,
						48.62227080389857,
						0
					],
					[
						2.0173075050115585,
						48.622411116957664,
						0
					],
					[
						2.015530038625002,
						48.61735884100199,
						0
					],
					[
						2.015155702829361,
						48.61561951227486,
						0
					],
					[
						2.015302637591958,
						48.61285901628435,
						0
					],
					[
						2.013732623308897,
						48.61049816943705,
						0
					],
					[
						2.01299786567688,
						48.609898276627064,
						0
					],
					[
						2.0114786457270384,
						48.60773574560881,
						0
					],
					[
						2.011095006018877,
						48.60650008544326,
						0
					],
					[
						2.0101728290319443,
						48.605053117498755,
						0
					],
					[
						2.009303541854024,
						48.60439815558493,
						0
					],
					[
						2.009160127490759,
						48.60409112647176,
						0
					],
					[
						2.0086378511041403,
						48.60373590141535,
						0
					],
					[
						2.0043571293354034,
						48.60201794654131,
						0
					],
					[
						2.0033419970422983,
						48.60119082033634,
						0
					],
					[
						2.001484567299485,
						48.59901630319655,
						0
					],
					[
						1.9917415268719196,
						48.591521456837654,
						0
					],
					[
						1.991227800026536,
						48.59073447994888,
						0
					],
					[
						1.9902342930436134,
						48.591625643894076,
						0
					],
					[
						1.9894256070256233,
						48.59206854365766,
						0
					],
					[
						1.9878632202744484,
						48.59081385657191,
						0
					],
					[
						1.9857223983854055,
						48.588618552312255,
						0
					],
					[
						1.9835737813264132,
						48.586837062612176,
						0
					],
					[
						1.9834047183394432,
						48.58646675013006,
						0
					],
					[
						1.9836482964456081,
						48.58509245328605,
						0
					],
					[
						1.9844490196555853,
						48.582958253100514,
						0
					],
					[
						1.9811328034847975,
						48.58196726068854,
						0
					],
					[
						1.9808518420904875,
						48.58177598565817,
						0
					],
					[
						1.981457769870758,
						48.579199304804206,
						0
					],
					[
						1.9823795277625322,
						48.57781277038157,
						0
					],
					[
						1.9805256184190512,
						48.5776349902153,
						0
					],
					[
						1.9771842565387487,
						48.577957190573215,
						0
					],
					[
						1.9752063788473606,
						48.57787714339793,
						0
					],
					[
						1.9723943341523409,
						48.57747506350279,
						0
					],
					[
						1.9676978699862957,
						48.576381895691156,
						0
					],
					[
						1.9655610714107752,
						48.576120380312204,
						0
					],
					[
						1.9597524963319302,
						48.5757458768785,
						0
					],
					[
						1.957686860114336,
						48.575997753068805,
						0
					],
					[
						1.944251088425517,
						48.57334236614406,
						0
					],
					[
						1.9439974520355463,
						48.57449160888791,
						0
					],
					[
						1.9434092938899994,
						48.57542200013995,
						0
					],
					[
						1.9430416636168957,
						48.57549970038235,
						0
					],
					[
						1.9428430125117302,
						48.57593874447048,
						0
					],
					[
						1.9408431742340326,
						48.574940375983715,
						0
					],
					[
						1.9392428174614906,
						48.57430536299944,
						0
					],
					[
						1.9374434743076563,
						48.57479310594499,
						0
					],
					[
						1.9353656005114317,
						48.57497247867286,
						0
					],
					[
						1.934230187907815,
						48.57547505758703,
						0
					],
					[
						1.933005340397358,
						48.57637267559767,
						0
					],
					[
						1.930316174402833,
						48.57926334254444,
						0
					],
					[
						1.9288625847548246,
						48.58205703087151,
						0
					],
					[
						1.9284356106072664,
						48.582386104390025,
						0
					],
					[
						1.927136667072773,
						48.58291416428983,
						0
					],
					[
						1.9266192521899939,
						48.58368312008679,
						0
					],
					[
						1.925852308049798,
						48.58405401930213,
						0
					],
					[
						1.9247981999069452,
						48.585205022245646,
						0
					],
					[
						1.918723750859499,
						48.5878218524158,
						0
					],
					[
						1.91572654992342,
						48.58849626034498,
						0
					],
					[
						1.9117367640137672,
						48.590600956231356,
						0
					],
					[
						1.9081546738743782,
						48.59199855476618,
						0
					],
					[
						1.899224342778325,
						48.6000756919384,
						0
					],
					[
						1.8959328532218933,
						48.60243821516633,
						0
					],
					[
						1.8927726242691278,
						48.604351971298456,
						0
					],
					[
						1.8876035045832396,
						48.60695765353739,
						0
					],
					[
						1.883181044831872,
						48.6082386597991,
						0
					],
					[
						1.879717307165265,
						48.6109859123826,
						0
					],
					[
						1.8779636453837156,
						48.61178806051612,
						0
					],
					[
						1.8759963288903236,
						48.61242617480457,
						0
					],
					[
						1.87530767172575,
						48.61290545202792,
						0
					],
					[
						1.8748761713504791,
						48.6134141497314,
						0
					],
					[
						1.875143051147461,
						48.613623613491654,
						0
					],
					[
						1.8683839682489634,
						48.616258380934596,
						0
					],
					[
						1.8439028598368168,
						48.62631456926465,
						0
					],
					[
						1.844402588903904,
						48.62765089608729,
						0
					],
					[
						1.8449790962040424,
						48.62797133624554,
						0
					],
					[
						1.8463306780904531,
						48.62821826711297,
						0
					],
					[
						1.8479616288095713,
						48.62934060394764,
						0
					],
					[
						1.8498628959059715,
						48.62989875487983,
						0
					],
					[
						1.8503857590258121,
						48.630191618576646,
						0
					],
					[
						1.850702092051506,
						48.63061750307679,
						0
					],
					[
						1.8413001950830221,
						48.63721934147179,
						0
					],
					[
						1.8404521141201258,
						48.63751698285341,
						0
					],
					[
						1.8384381104260683,
						48.637749245390296,
						0
					],
					[
						1.836310112848878,
						48.638834953308105,
						0
					],
					[
						1.8348368257284164,
						48.63977414555848,
						0
					],
					[
						1.8342731427401304,
						48.63826632499695,
						0
					],
					[
						1.8336501996964216,
						48.63759451545775,
						0
					],
					[
						1.8324307166039944,
						48.63688984885812,
						0
					],
					[
						1.8304038047790527,
						48.636483158916235,
						0
					],
					[
						1.828444954007864,
						48.63667979836464,
						0
					],
					[
						1.8279832787811756,
						48.63608158193529,
						0
					],
					[
						1.827356731519103,
						48.63738882355392,
						0
					],
					[
						1.8267483729869127,
						48.639703737571836,
						0
					],
					[
						1.825513131916523,
						48.64151774905622,
						0
					],
					[
						1.8239230010658503,
						48.64099832251668,
						0
					],
					[
						1.8200878612697124,
						48.6407174449414,
						0
					],
					[
						1.8187913484871387,
						48.63982301205397,
						0
					],
					[
						1.8181002605706453,
						48.639771211892366,
						0
					],
					[
						1.814328571781516,
						48.64148790948093,
						0
					],
					[
						1.8135557603091002,
						48.641444239765406,
						0
					],
					[
						1.8132111802697182,
						48.64167474210262,
						0
					],
					[
						1.8131339829415083,
						48.642087718471885,
						0
					],
					[
						1.8074547406286001,
						48.64469381980598,
						0
					],
					[
						1.8064702861011028,
						48.64440506324172,
						0
					],
					[
						1.8004193902015686,
						48.64187942817807,
						0
					],
					[
						1.7950308322906494,
						48.63891039043665,
						0
					],
					[
						1.7942196317017078,
						48.63818250596523,
						0
					],
					[
						1.7923466116189957,
						48.63758780993521,
						0
					],
					[
						1.7900601960718632,
						48.636089293286204,
						0
					],
					[
						1.7896234150975943,
						48.635608004406095,
						0
					],
					[
						1.7894934955984354,
						48.634770065546036,
						0
					],
					[
						1.789197027683258,
						48.63467711023986,
						0
					],
					[
						1.7882880941033363,
						48.63465883769095,
						0
					],
					[
						1.7857775464653969,
						48.63522704690695,
						0
					],
					[
						1.7831742949783802,
						48.635110538452864,
						0
					],
					[
						1.7792966589331627,
						48.63551161251962,
						0
					],
					[
						1.776189487427473,
						48.63547079265118,
						0
					],
					[
						1.775343418121338,
						48.635084219276905,
						0
					],
					[
						1.7745846882462502,
						48.63444669172168,
						0
					],
					[
						1.7736466694623232,
						48.63393330015242,
						0
					],
					[
						1.7719876393675804,
						48.63406917080283,
						0
					],
					[
						1.7715713940560818,
						48.63387596793473,
						0
					],
					[
						1.7698406986892223,
						48.63359718583524,
						0
					],
					[
						1.7669470142573118,
						48.63255967386067,
						0
					],
					[
						1.766344103962183,
						48.632229594513774,
						0
					],
					[
						1.7677132040262222,
						48.629419058561325,
						0
					],
					[
						1.7667031846940517,
						48.62735744565725,
						0
					],
					[
						1.7637598793953657,
						48.62671522423625,
						0
					],
					[
						1.7631397023797035,
						48.62597107887268,
						0
					],
					[
						1.7631485871970654,
						48.62559330649674,
						0
					],
					[
						1.7621979117393494,
						48.625052673742175,
						0
					],
					[
						1.7603180184960365,
						48.625357020646334,
						0
					],
					[
						1.760262195020914,
						48.62599513493478,
						0
					],
					[
						1.75776950083673,
						48.62695871852338,
						0
					],
					[
						1.754961060360074,
						48.626929465681314,
						0
					],
					[
						1.7519672960042953,
						48.62613343633711,
						0
					],
					[
						1.7502522747963667,
						48.62634935416281,
						0
					],
					[
						1.7489446140825748,
						48.62541804090142,
						0
					],
					[
						1.7473337799310684,
						48.625248139724135,
						0
					],
					[
						1.7449210491031408,
						48.623999236151576,
						0
					],
					[
						1.7418375983834267,
						48.623561868444085,
						0
					],
					[
						1.7414076067507267,
						48.623386435210705,
						0
					],
					[
						1.7410497833043337,
						48.62303179688752,
						0
					],
					[
						1.74021209590137,
						48.62118769437075,
						0
					],
					[
						1.739573059603572,
						48.62067715264857,
						0
					],
					[
						1.7392042558640242,
						48.6202144715935,
						0
					],
					[
						1.7387007549405098,
						48.619147622957826,
						0
					],
					[
						1.7376025579869747,
						48.61855116672814,
						0
					],
					[
						1.736819352954626,
						48.617832167074084,
						0
					],
					[
						1.7357402667403221,
						48.617568807676435,
						0
					],
					[
						1.734991678968072,
						48.61710210330784,
						0
					],
					[
						1.7345854081213474,
						48.61707075498998,
						0
					],
					[
						1.7332303896546364,
						48.616435658186674,
						0
					],
					[
						1.7315605469048023,
						48.61591405235231,
						0
					],
					[
						1.7281571589410305,
						48.61526604741812,
						0
					],
					[
						1.7272203974425793,
						48.61473421566188,
						0
					],
					[
						1.7258014250546694,
						48.614503126591444,
						0
					],
					[
						1.7225926648825407,
						48.613668121397495,
						0
					],
					[
						1.7178593203425407,
						48.613599222153425,
						0
					],
					[
						1.716480664908886,
						48.61338648945093,
						0
					],
					[
						1.7155660316348076,
						48.613061690703034,
						0
					],
					[
						1.7164810001850128,
						48.61341901123524,
						0
					],
					[
						1.7156019899994135,
						48.612922970205545,
						0
					],
					[
						1.707555027678609,
						48.6110379640013,
						0
					],
					[
						1.704723034054041,
						48.60966098494828,
						0
					],
					[
						1.7019330337643623,
						48.610256016254425,
						0
					],
					[
						1.6996369790285826,
						48.61151900142431,
						0
					],
					[
						1.697190972045064,
						48.61197296530008,
						0
					],
					[
						1.6940370295196772,
						48.61248400993645,
						0
					],
					[
						1.6907540056854486,
						48.61194597557187,
						0
					],
					[
						1.6895740013569593,
						48.61144599504769,
						0
					],
					[
						1.6894659586250782,
						48.611221024766564,
						0
					],
					[
						1.6886939853429794,
						48.6107979901135,
						0
					],
					[
						1.68822200037539,
						48.61028702929616,
						0
					],
					[
						1.6872129868716002,
						48.609675988554955,
						0
					],
					[
						1.6870409902185202,
						48.60848533920944,
						0
					],
					[
						1.6857497580349445,
						48.606139831244946,
						0
					],
					[
						1.6847222205251455,
						48.60649832524359,
						0
					],
					[
						1.6841493174433708,
						48.606963604688644,
						0
					],
					[
						1.6833218559622765,
						48.60727172344923,
						0
					],
					[
						1.682558013126254,
						48.60752326436341,
						0
					],
					[
						1.6815400309860706,
						48.60743802040815,
						0
					],
					[
						1.6800099983811378,
						48.60829297453165,
						0
					],
					[
						1.679610013961792,
						48.60856697894633,
						0
					],
					[
						1.678563030436635,
						48.60863998532295,
						0
					],
					[
						1.6768829617649317,
						48.60902303829789,
						0
					],
					[
						1.6761900298297405,
						48.609096966683865,
						0
					],
					[
						1.675898004323244,
						48.6093179974705,
						0
					],
					[
						1.67580496519804,
						48.60947297886014,
						0
					],
					[
						1.6752429585903883,
						48.60979299992323,
						0
					],
					[
						1.6751159727573395,
						48.609935995191336,
						0
					],
					[
						1.6727619990706444,
						48.609846979379654,
						0
					],
					[
						1.6723099630326033,
						48.60984303988516,
						0
					],
					[
						1.6713779792189598,
						48.60829196870327,
						0
					],
					[
						1.6710749734193087,
						48.60781503841281,
						0
					],
					[
						1.6709970217198133,
						48.60781998373568,
						0
					],
					[
						1.6709130350500345,
						48.60781302675605,
						0
					],
					[
						1.6707769967615604,
						48.60781202092767,
						0
					],
					[
						1.670497041195631,
						48.60782501287758,
						0
					],
					[
						1.6701450012624264,
						48.60777296125889,
						0
					],
					[
						1.669753985479474,
						48.60733701847494,
						0
					],
					[
						1.669222991913557,
						48.60656596720219,
						0
					],
					[
						1.6688680183142424,
						48.60623396001756,
						0
					],
					[
						1.6675699967890978,
						48.60562300309539,
						0
					],
					[
						1.667514005675912,
						48.605612022802234,
						0
					],
					[
						1.6633030213415623,
						48.6046829726547,
						0
					],
					[
						1.6586730256676674,
						48.60431500710547,
						0
					],
					[
						1.6564700100570917,
						48.60397696495056,
						0
					],
					[
						1.65629499591887,
						48.60393698327243,
						0
					],
					[
						1.65526301600039,
						48.6025520414114,
						0
					],
					[
						1.6545430105179548,
						48.601788030937314,
						0
					],
					[
						1.653210036456585,
						48.6026019975543,
						0
					],
					[
						1.6531129740178585,
						48.603208009153605,
						0
					],
					[
						1.653190003708005,
						48.60351302661002,
						0
					],
					[
						1.6513449791818857,
						48.6029770039022,
						0
					],
					[
						1.6506320144981146,
						48.60199799761176,
						0
					],
					[
						1.6506210342049599,
						48.6012049857527,
						0
					],
					[
						1.6506054438650608,
						48.60139307565987,
						0
					],
					[
						1.6503976564854383,
						48.60087205655873,
						0
					],
					[
						1.649150513112545,
						48.59972222708166,
						0
					],
					[
						1.6481632087379694,
						48.59963237307966,
						0
					],
					[
						1.647735983133316,
						48.59937999397516,
						0
					],
					[
						1.646937020123005,
						48.598716985434294,
						0
					],
					[
						1.6465159971266985,
						48.59819898381829,
						0
					],
					[
						1.6463030129671097,
						48.59828003682196,
						0
					],
					[
						1.6455020383000374,
						48.59872796572745,
						0
					],
					[
						1.6430619824677706,
						48.6004520393908,
						0
					],
					[
						1.6431219968944788,
						48.60074699856341,
						0
					],
					[
						1.644980013370514,
						48.601834969595075,
						0
					],
					[
						1.6460249852389097,
						48.60276703722775,
						0
					],
					[
						1.6461969818919897,
						48.602928975597024,
						0
					],
					[
						1.6457020305097103,
						48.603702960535884,
						0
					],
					[
						1.6448049992322922,
						48.60431802459061,
						0
					],
					[
						1.6442119795829058,
						48.60457099042833,
						0
					],
					[
						1.642744978889823,
						48.60514699481428,
						0
					],
					[
						1.6409130301326513,
						48.606091970577836,
						0
					],
					[
						1.6408349946141243,
						48.606132036074996,
						0
					],
					[
						1.6395470313727856,
						48.607182959094644,
						0
					],
					[
						1.6382220201194286,
						48.6076530162245,
						0
					],
					[
						1.637045033276081,
						48.6084580142051,
						0
					],
					[
						1.6357249673455954,
						48.60919796861708,
						0
					],
					[
						1.635680040344596,
						48.609226970002055,
						0
					],
					[
						1.6337729897350073,
						48.61206499859691,
						0
					],
					[
						1.6300599742680788,
						48.61409802921116,
						0
					],
					[
						1.6289350390434265,
						48.61493797972798,
						0
					],
					[
						1.6279899794608355,
						48.61585495993495,
						0
					],
					[
						1.6275169886648655,
						48.61611697822809,
						0
					],
					[
						1.6254179924726486,
						48.61660296097398,
						0
					],
					[
						1.6235520131886005,
						48.61690797843039,
						0
					],
					[
						1.6213029809296131,
						48.61804498359561,
						0
					],
					[
						1.6174349840730429,
						48.61759998835623,
						0
					],
					[
						1.6163279861211777,
						48.61692700535059,
						0
					],
					[
						1.6155349742621183,
						48.616098035126925,
						0
					],
					[
						1.6149899829179049,
						48.615347016602755,
						0
					],
					[
						1.6135919652879238,
						48.61477696336806,
						0
					],
					[
						1.6117829829454422,
						48.614361975342035,
						0
					],
					[
						1.6106779966503382,
						48.614319982007146,
						0
					],
					[
						1.6100320033729076,
						48.61411303281784,
						0
					],
					[
						1.609942987561226,
						48.6140769906342,
						0
					],
					[
						1.609391961246729,
						48.61283001489937,
						0
					],
					[
						1.6088459640741348,
						48.61211000941694,
						0
					],
					[
						1.604144973680377,
						48.6126249935478,
						0
					],
					[
						1.6006399970501661,
						48.61324802041054,
						0
					],
					[
						1.5987799689173698,
						48.613714976236224,
						0
					],
					[
						1.5977970231324434,
						48.61411202698946,
						0
					],
					[
						1.5958230011165142,
						48.61455702222884,
						0
					],
					[
						1.593983005732298,
						48.61463698558509,
						0
					],
					[
						1.5917970053851604,
						48.614362981170416,
						0
					],
					[
						1.5912589710205793,
						48.61417698673904,
						0
					],
					[
						1.5911120362579823,
						48.61419500783086,
						0
					],
					[
						1.5910680312663317,
						48.6141929961741,
						0
					],
					[
						1.5891830250620842,
						48.614852987229824,
						0
					],
					[
						1.5871149580925703,
						48.61653699539602,
						0
					],
					[
						1.585330031812191,
						48.617324978113174,
						0
					],
					[
						1.583246961236,
						48.61782495863736,
						0
					],
					[
						1.578913014382124,
						48.618163000792265,
						0
					],
					[
						1.5779179986566305,
						48.618268026039004,
						0
					],
					[
						1.574634974822402,
						48.619236974045634,
						0
					],
					[
						1.5736070182174444,
						48.61981297843158,
						0
					],
					[
						1.5719619859009981,
						48.61971700564027,
						0
					],
					[
						1.5702079888433218,
						48.61915801651776,
						0
					],
					[
						1.5694019850343466,
						48.619066989049315,
						0
					],
					[
						1.567408014088869,
						48.619258012622595,
						0
					],
					[
						1.5651370212435722,
						48.619901994243264,
						0
					],
					[
						1.5644770301878452,
						48.6197429895401,
						0
					],
					[
						1.5643069613724947,
						48.619690015912056,
						0
					],
					[
						1.5642030257731676,
						48.619109988212585,
						0
					],
					[
						1.5644770301878452,
						48.617797968909144,
						0
					],
					[
						1.5648370329290628,
						48.6164499912411,
						0
					],
					[
						1.5646579954773188,
						48.61416198313236,
						0
					],
					[
						1.5661750361323357,
						48.61015702597797,
						0
					],
					[
						1.566477958112955,
						48.60889999195933,
						0
					],
					[
						1.5666500385850668,
						48.608647026121616,
						0
					],
					[
						1.5675279591232538,
						48.60801000148058,
						0
					],
					[
						1.5677629876881838,
						48.607786037027836,
						0
					],
					[
						1.568075967952609,
						48.60735101625323,
						0
					],
					[
						1.5682509820908308,
						48.607033006846905,
						0
					],
					[
						1.5696120355278254,
						48.60419196076691,
						0
					],
					[
						1.570068011060357,
						48.60201803036034,
						0
					],
					[
						1.5707269962877035,
						48.60025799833238,
						0
					],
					[
						1.5708020143210888,
						48.600158002227545,
						0
					],
					[
						1.5713119693100452,
						48.59934797510505,
						0
					],
					[
						1.5718729700893164,
						48.598763002082705,
						0
					],
					[
						1.574432970955968,
						48.597533041611314,
						0
					],
					[
						1.5750450175255537,
						48.597213020548224,
						0
					],
					[
						1.575092962011695,
						48.59718603082001,
						0
					],
					[
						1.5779380314052105,
						48.595172027125955,
						0
					],
					[
						1.57798295840621,
						48.59514000825584,
						0
					],
					[
						1.5800650231540203,
						48.59322499483824,
						0
					],
					[
						1.5815720055252314,
						48.59208203852177,
						0
					],
					[
						1.5822749957442284,
						48.591650035232306,
						0
					],
					[
						1.5827370062470436,
						48.591391034424305,
						0
					],
					[
						1.5804220084100962,
						48.59039702452719,
						0
					],
					[
						1.5796320140361786,
						48.58976796269417,
						0
					],
					[
						1.5794900245964527,
						48.589479960501194,
						0
					],
					[
						1.579954968765378,
						48.589307963848114,
						0
					],
					[
						1.5801080223172903,
						48.5891979932785,
						0
					],
					[
						1.5802970342338085,
						48.589159017428756,
						0
					],
					[
						1.5807179734110832,
						48.588918037712574,
						0
					],
					[
						1.5864520333707333,
						48.58648703433573,
						0
					],
					[
						1.5869850385934114,
						48.58623197302222,
						0
					],
					[
						1.5876980032771826,
						48.58613700605929,
						0
					],
					[
						1.5892810095101595,
						48.584128031507134,
						0
					],
					[
						1.590179968625307,
						48.5829450096935,
						0
					],
					[
						1.5921050403267145,
						48.57926300726831,
						0
					],
					[
						1.5934130363166332,
						48.57604301534593,
						0
					],
					[
						1.5934250224381685,
						48.57599699869752,
						0
					],
					[
						1.5932550374418497,
						48.57172298245132,
						0
					],
					[
						1.5928480122238398,
						48.56921503320336,
						0
					],
					[
						1.5930100344121456,
						48.56736497953534,
						0
					],
					[
						1.5925249736756086,
						48.56596503406763,
						0
					],
					[
						1.588663011789322,
						48.55621000751853,
						0
					],
					[
						1.5881669707596302,
						48.55315203778446,
						0
					],
					[
						1.5883279871195555,
						48.55118497274816,
						0
					],
					[
						1.588164959102869,
						48.55023304000497,
						0
					],
					[
						1.5870120283216238,
						48.54807000607252,
						0
					],
					[
						1.5855570137500763,
						48.54782701469958,
						0
					],
					[
						1.5854099951684475,
						48.547458965331316,
						0
					],
					[
						1.5860630292445421,
						48.545481003820896,
						0
					],
					[
						1.5858849976211786,
						48.54460903443396,
						0
					],
					[
						1.5845100302249193,
						48.54051196016371,
						0
					],
					[
						1.58303196541965,
						48.53820702061057,
						0
					],
					[
						1.581808039918542,
						48.53678997606039,
						0
					],
					[
						1.5816930402070284,
						48.53664304129779,
						0
					],
					[
						1.5813270024955273,
						48.53601003997028,
						0
					],
					[
						1.5811130125075579,
						48.53402202017605,
						0
					],
					[
						1.5805530175566673,
						48.53300001472235,
						0
					],
					[
						1.5803869720548391,
						48.53157198987901,
						0
					],
					[
						1.5799819584935904,
						48.530655009672046,
						0
					],
					[
						1.5792699996381998,
						48.529772982001305,
						0
					],
					[
						1.5782950166612864,
						48.528849966824055,
						0
					],
					[
						1.578075997531414,
						48.528506979346275,
						0
					],
					[
						1.5779409650713205,
						48.528203973546624,
						0
					],
					[
						1.5761869680136442,
						48.52642701007426,
						0
					],
					[
						1.5750300139188766,
						48.524935031309724,
						0
					],
					[
						1.574849970638752,
						48.52385502308607,
						0
					],
					[
						1.5747519861906767,
						48.52370297536254,
						0
					],
					[
						1.5743680112063885,
						48.523367028683424,
						0
					],
					[
						1.5732050221413374,
						48.52255800738931,
						0
					],
					[
						1.570627000182867,
						48.52105203084648,
						0
					],
					[
						1.5692539606243372,
						48.51988200098276,
						0
					],
					[
						1.5684929676353931,
						48.51908203214407,
						0
					],
					[
						1.5670520346611738,
						48.51801300421357,
						0
					],
					[
						1.5658400114625692,
						48.51734303869307,
						0
					],
					[
						1.5642850007861853,
						48.51633695885539,
						0
					],
					[
						1.5632830280810595,
						48.51510800421238,
						0
					],
					[
						1.5574679989367723,
						48.51031397469342,
						0
					],
					[
						1.556652020663023,
						48.50964702665806,
						0
					],
					[
						1.555850962176919,
						48.50946698337793,
						0
					],
					[
						1.5522680338472128,
						48.507558004930615,
						0
					],
					[
						1.55118802562356,
						48.50711996667087,
						0
					],
					[
						1.550444969907403,
						48.506631972268224,
						0
					],
					[
						1.5479179937392473,
						48.505405029281974,
						0
					],
					[
						1.5465700160712004,
						48.50442996248603,
						0
					],
					[
						1.5463570319116116,
						48.504247991368175,
						0
					],
					[
						1.5451669692993164,
						48.50307201035321,
						0
					],
					[
						1.544707976281643,
						48.50254001095891,
						0
					],
					[
						1.5436950232833624,
						48.50163199938834,
						0
					],
					[
						1.5424550045281649,
						48.50044000893831,
						0
					],
					[
						1.5413500182330608,
						48.49806499667466,
						0
					],
					[
						1.5405679866671562,
						48.49673202261329,
						0
					],
					[
						1.5403629653155804,
						48.49595803767443,
						0
					],
					[
						1.5389180090278387,
						48.49211300723255,
						0
					],
					[
						1.5379450377076864,
						48.490562019869685,
						0
					],
					[
						1.5372469928115606,
						48.48991300910711,
						0
					],
					[
						1.5365399792790413,
						48.48859202116728,
						0
					],
					[
						1.5364600159227848,
						48.48853200674057,
						0
					],
					[
						1.5350340027362108,
						48.488048035651445,
						0
					],
					[
						1.5342000033706427,
						48.48771996796131,
						0
					],
					[
						1.5332929976284504,
						48.48763296380639,
						0
					],
					[
						1.5321249794214964,
						48.48709300160408,
						0
					],
					[
						1.5297079738229513,
						48.48685001023114,
						0
					],
					[
						1.5275320317596197,
						48.48571300506592,
						0
					],
					[
						1.5268629882484674,
						48.48552600480616,
						0
					],
					[
						1.5247599687427282,
						48.484396962448955,
						0
					],
					[
						1.5238490235060453,
						48.483777958899736,
						0
					],
					[
						1.5210969932377338,
						48.48371299915016,
						0
					],
					[
						1.5178343374282122,
						48.48359112627804,
						0
					],
					[
						1.5194971393793821,
						48.483663043007255,
						0
					],
					[
						1.5178550407290459,
						48.483600011095405,
						0
					],
					[
						1.517620012164116,
						48.483624989166856,
						0
					],
					[
						1.511907996609807,
						48.48417199216783,
						0
					],
					[
						1.5113050024956465,
						48.484050035476685,
						0
					],
					[
						1.510107982903719,
						48.483364982530475,
						0
					],
					[
						1.508373012766242,
						48.482269970700145,
						0
					],
					[
						1.5065900143235922,
						48.48093196749687,
						0
					],
					[
						1.5060099866241217,
						48.48056500777602,
						0
					],
					[
						1.5043050236999989,
						48.479151986539364,
						0
					],
					[
						1.503477981314063,
						48.47834598273039,
						0
					],
					[
						1.5030800085514784,
						48.47824196331203,
						0
					],
					[
						1.501806965097785,
						48.47695802338421,
						0
					],
					[
						1.5016730222851038,
						48.47682701423764,
						0
					],
					[
						1.5002449974417686,
						48.47608798183501,
						0
					],
					[
						1.4999030157923698,
						48.475754968822,
						0
					],
					[
						1.4996969886124134,
						48.47551801241934,
						0
					],
					[
						1.4993519894778728,
						48.475243002176285,
						0
					],
					[
						1.49792798794806,
						48.47432501614094,
						0
					],
					[
						1.4977290015667677,
						48.47417699173093,
						0
					],
					[
						1.496598031371832,
						48.473544996231794,
						0
					],
					[
						1.4952199626713991,
						48.47235501743853,
						0
					],
					[
						1.4951420109719038,
						48.47227497026324,
						0
					],
					[
						1.494742026552558,
						48.47201697528362,
						0
					],
					[
						1.4945820160210133,
						48.47192200832069,
						0
					],
					[
						1.4942179899662733,
						48.47175797447562,
						0
					],
					[
						1.4940279722213745,
						48.47166996449232,
						0
					],
					[
						1.4928619656711817,
						48.471332006156445,
						0
					],
					[
						1.4917019940912724,
						48.47078500315547,
						0
					],
					[
						1.489644991233945,
						48.470385018736124,
						0
					],
					[
						1.4893500320613384,
						48.47085499204695,
						0
					],
					[
						1.4864779729396105,
						48.47046196460724,
						0
					],
					[
						1.4861739613115788,
						48.47026398405433,
						0
					],
					[
						1.486125010997057,
						48.46994999796152,
						0
					],
					[
						1.4860980212688446,
						48.46990498714149,
						0
					],
					[
						1.4858680218458176,
						48.4696230199188,
						0
					],
					[
						1.48497199639678,
						48.469096971675754,
						0
					],
					[
						1.484403032809496,
						48.46857796423137,
						0
					],
					[
						1.4838869590312243,
						48.46831804141402,
						0
					],
					[
						1.4830910135060549,
						48.468304965645075,
						0
					],
					[
						1.4824300166219473,
						48.46708104014397,
						0
					],
					[
						1.483259992673993,
						48.466866966336966,
						0
					],
					[
						1.4828249718993902,
						48.4647979773581,
						0
					],
					[
						1.4828040171414614,
						48.464650036767125,
						0
					],
					[
						1.4829220343381166,
						48.46407797187567,
						0
					],
					[
						1.4830320049077272,
						48.463834980502725,
						0
					],
					[
						1.485072998329997,
						48.46216899342835,
						0
					],
					[
						1.4851559791713953,
						48.46192700788379,
						0
					],
					[
						1.4857120346277952,
						48.461646968498826,
						0
					],
					[
						1.487467959523201,
						48.46015197224915,
						0
					],
					[
						1.4876279700547457,
						48.45954897813499,
						0
					],
					[
						1.487510958686471,
						48.459257958456874,
						0
					],
					[
						1.487753028050065,
						48.45856796018779,
						0
					],
					[
						1.4899889845401049,
						48.459347980096936,
						0
					],
					[
						1.4902779925614595,
						48.4593550208956,
						0
					],
					[
						1.4910610299557447,
						48.45865102484822,
						0
					],
					[
						1.4914369583129883,
						48.45742701552808,
						0
					],
					[
						1.4907990116626024,
						48.45647701062262,
						0
					],
					[
						1.4911040291190147,
						48.45589002594352,
						0
					],
					[
						1.491581965237856,
						48.455819031223655,
						0
					],
					[
						1.4913350343704224,
						48.45460197888315,
						0
					],
					[
						1.4910130016505718,
						48.454082971438766,
						0
					],
					[
						1.4911900274455547,
						48.45379798673093,
						0
					],
					[
						1.4913399796932936,
						48.453691033646464,
						0
					],
					[
						1.4906809944659472,
						48.45291595906019,
						0
					],
					[
						1.4909969922155142,
						48.45262401737273,
						0
					],
					[
						1.4909760374575853,
						48.4525459818542,
						0
					],
					[
						1.4910130016505718,
						48.45243500545621,
						0
					],
					[
						1.491323970258236,
						48.45216100104153,
						0
					],
					[
						1.4914160035550594,
						48.45138601027429,
						0
					],
					[
						1.491366969421506,
						48.450517980381846,
						0
					],
					[
						1.4916030038148165,
						48.44986301846802,
						0
					],
					[
						1.4924670103937387,
						48.448862973600626,
						0
					],
					[
						1.4928850159049034,
						48.44792000949383,
						0
					],
					[
						1.4932929631322622,
						48.44732598401606,
						0
					],
					[
						1.4938399661332369,
						48.44693102873862,
						0
					],
					[
						1.494441032409668,
						48.44605604186654,
						0
					],
					[
						1.4948649890720844,
						48.44582403078675,
						0
					],
					[
						1.4956529717892408,
						48.44498801976442,
						0
					],
					[
						1.4951219782233238,
						48.444775035604835,
						0
					],
					[
						1.4948590379208326,
						48.44423700124025,
						0
					],
					[
						1.4940780121833086,
						48.44347299076617,
						0
					],
					[
						1.4942240249365568,
						48.443511966615915,
						0
					],
					[
						1.4946850296109915,
						48.44362998381257,
						0
					],
					[
						1.4954079687595367,
						48.443550020456314,
						0
					],
					[
						1.4961729850620031,
						48.44349696300924,
						0
					],
					[
						1.4971939846873283,
						48.44315104186535,
						0
					],
					[
						1.4972980041056871,
						48.44296001829207,
						0
					],
					[
						1.499058036133647,
						48.44169703312218,
						0
					],
					[
						1.4996519777923822,
						48.44035802409053,
						0
					],
					[
						1.4997379761189222,
						48.43967699445784,
						0
					],
					[
						1.5001220349222422,
						48.43840998597443,
						0
					],
					[
						1.5001470129936934,
						48.43776499852538,
						0
					],
					[
						1.4998969808220863,
						48.43741999939084,
						0
					],
					[
						1.499182004481554,
						48.43705697916448,
						0
					],
					[
						1.499053006991744,
						48.43700501136482,
						0
					],
					[
						1.4970749616622925,
						48.43629699200392,
						0
					],
					[
						1.4947779849171638,
						48.43504800461233,
						0
					],
					[
						1.4944380149245262,
						48.434767965227365,
						0
					],
					[
						1.494800029322505,
						48.434358006343246,
						0
					],
					[
						1.4932200405746698,
						48.43324203975499,
						0
					],
					[
						1.4927870314568281,
						48.433329965919256,
						0
					],
					[
						1.492736991494894,
						48.433843022212386,
						0
					],
					[
						1.4921800140291452,
						48.43355502001941,
						0
					],
					[
						1.4921540301293135,
						48.43347396701574,
						0
					],
					[
						1.4922070037573576,
						48.433240028098226,
						0
					],
					[
						1.4921599812805653,
						48.43312704004347,
						0
					],
					[
						1.4918330032378435,
						48.43301698565483,
						0
					],
					[
						1.491136969998479,
						48.43309703283012,
						0
					],
					[
						1.4911349583417177,
						48.43262001872063,
						0
					],
					[
						1.4904000330716372,
						48.43127799220383,
						0
					],
					[
						1.4893750101327896,
						48.43055999837816,
						0
					],
					[
						1.4884319622069597,
						48.43014299869537,
						0
					],
					[
						1.487166965380311,
						48.429159969091415,
						0
					],
					[
						1.48628200404346,
						48.42867700383067,
						0
					],
					[
						1.4859919901937246,
						48.42837098054588,
						0
					],
					[
						1.4852139819413424,
						48.42861296609044,
						0
					],
					[
						1.4854400418698788,
						48.428961988538504,
						0
					],
					[
						1.482177972793579,
						48.42981996014714,
						0
					],
					[
						1.4806440006941557,
						48.4282679669559,
						0
					],
					[
						1.4804290048778057,
						48.427805034443736,
						0
					],
					[
						1.4803760312497616,
						48.4263960365206,
						0
					],
					[
						1.4802580140531063,
						48.42608196660876,
						0
					],
					[
						1.4806010015308857,
						48.42537000775337,
						0
					],
					[
						1.4804720040410757,
						48.42515702359378,
						0
					],
					[
						1.4801610354334116,
						48.42517797835171,
						0
					],
					[
						1.4798280224204063,
						48.4242029953748,
						0
					],
					[
						1.4798069838434458,
						48.423961009830236,
						0
					],
					[
						1.4803430065512657,
						48.42373302206397,
						0
					],
					[
						1.4804079663008451,
						48.4235330298543,
						0
					],
					[
						1.4802580140531063,
						48.42213802970946,
						0
					],
					[
						1.480418024584651,
						48.420200971886516,
						0
					],
					[
						1.4796349871903658,
						48.41803701594472,
						0
					],
					[
						1.4790240302681923,
						48.416976034641266,
						0
					],
					[
						1.4785839803516865,
						48.414846025407314,
						0
					],
					[
						1.4784440025687218,
						48.41293101198971,
						0
					],
					[
						1.4780900347977877,
						48.41224696487188,
						0
					],
					[
						1.478992011398077,
						48.410252993926406,
						0
					],
					[
						1.479753004387021,
						48.41004000976682,
						0
					],
					[
						1.4805360417813063,
						48.409135015681386,
						0
					],
					[
						1.4806539751589298,
						48.40843697078526,
						0
					],
					[
						1.4815879706293344,
						48.40724799782038,
						0
					],
					[
						1.4816309697926044,
						48.406963013112545,
						0
					],
					[
						1.4813520200550556,
						48.40643595904112,
						0
					],
					[
						1.4814159739762545,
						48.405759036540985,
						0
					],
					[
						1.4809330087155104,
						48.404940040782094,
						0
					],
					[
						1.4791200030595064,
						48.40369398705661,
						0
					],
					[
						1.4783480297774076,
						48.40302402153611,
						0
					],
					[
						1.4764060266315937,
						48.40256796218455,
						0
					],
					[
						1.4753329753875732,
						48.402539966627955,
						0
					],
					[
						1.4747749920934439,
						48.40263996273279,
						0
					],
					[
						1.4743569865822792,
						48.402796033769846,
						0
					],
					[
						1.4720610156655312,
						48.404754968360066,
						0
					],
					[
						1.4691529981791973,
						48.405225025489926,
						0
					],
					[
						1.4687879662960768,
						48.405074989423156,
						0
					],
					[
						1.4681979641318321,
						48.40570203959942,
						0
					],
					[
						1.466739010065794,
						48.40805299580097,
						0
					],
					[
						1.4657740015536547,
						48.40865096077323,
						0
					],
					[
						1.4616749994456768,
						48.40967598371208,
						0
					],
					[
						1.4609669800847769,
						48.409476997330785,
						0
					],
					[
						1.460645031183958,
						48.40959099121392,
						0
					],
					[
						1.460559032857418,
						48.40983297675848,
						0
					],
					[
						1.4587779622524977,
						48.41034603305161,
						0
					],
					[
						1.4569330215454102,
						48.410531021654606,
						0
					],
					[
						1.4553879853338003,
						48.41075900942087,
						0
					],
					[
						1.453327964991331,
						48.41117198579013,
						0
					],
					[
						1.4514830242842436,
						48.411927027627826,
						0
					],
					[
						1.4477059710770845,
						48.41338003054261,
						0
					],
					[
						1.4474059827625751,
						48.41335102915764,
						0
					],
					[
						1.4471909869462252,
						48.4136070124805,
						0
					],
					[
						1.4445729833096266,
						48.41469003818929,
						0
					],
					[
						1.4434789773076773,
						48.414932023733854,
						0
					],
					[
						1.4411400072276592,
						48.413750007748604,
						0
					],
					[
						1.43895098939538,
						48.41338003054261,
						0
					],
					[
						1.4359689597040415,
						48.41346502304077,
						0
					],
					[
						1.4344670064747334,
						48.413493018597364,
						0
					],
					[
						1.4335439912974834,
						48.413622016087174,
						0
					],
					[
						1.4328789710998535,
						48.4136070124805,
						0
					],
					[
						1.4285659790039062,
						48.41172703541815,
						0
					],
					[
						1.4274500124156475,
						48.41228300705552,
						0
					],
					[
						1.4257980231195688,
						48.4115709643811,
						0
					],
					[
						1.417622985318303,
						48.407952999696136,
						0
					],
					[
						1.4165279734879732,
						48.405459970235825,
						0
					],
					[
						1.4157560002058744,
						48.404748011380434,
						0
					],
					[
						1.4108420256525278,
						48.40085201896727,
						0
					],
					[
						1.4106810092926025,
						48.40061699040234,
						0
					],
					[
						1.410616971552372,
						48.400024976581335,
						0
					],
					[
						1.4105950109660625,
						48.39973303489387,
						0
					],
					[
						1.4110570214688778,
						48.39959096163511,
						0
					],
					[
						1.411635959520936,
						48.39941301383078,
						0
					],
					[
						1.411410989239812,
						48.399077989161015,
						0
					],
					[
						1.4114959817379713,
						48.39881395921111,
						0
					],
					[
						1.4112499728798866,
						48.39857197366655,
						0
					],
					[
						1.4112499728798866,
						48.39835898950696,
						0
					],
					[
						1.412151027470827,
						48.39794500730932,
						0
					],
					[
						1.4118930324912071,
						48.39743999764323,
						0
					],
					[
						1.4129339810460806,
						48.39687002822757,
						0
					],
					[
						1.4123160671442747,
						48.39602471329272,
						0
					],
					[
						1.4130071550607681,
						48.39572916738689,
						0
					],
					[
						1.412561573088169,
						48.395169507712126,
						0
					],
					[
						1.4125979505479336,
						48.39464136399329,
						0
					],
					[
						1.4122524484992027,
						48.394358390942216,
						0
					],
					[
						1.4134891144931316,
						48.39389302767813,
						0
					],
					[
						1.4136089757084846,
						48.39356303215027,
						0
					],
					[
						1.4127270318567753,
						48.39284596033394,
						0
					],
					[
						1.412508012726903,
						48.39264496229589,
						0
					],
					[
						1.412250017747283,
						48.3924560341984,
						0
					],
					[
						1.4117509592324495,
						48.39197399094701,
						0
					],
					[
						1.4114119950681925,
						48.39173703454435,
						0
					],
					[
						1.4112420100718737,
						48.39160703122616,
						0
					],
					[
						1.410050019621849,
						48.39058401994407,
						0
					],
					[
						1.4099510293453932,
						48.39049198664725,
						0
					],
					[
						1.4081749878823757,
						48.3890750259161,
						0
					],
					[
						1.406545965000987,
						48.38754599913955,
						0
					],
					[
						1.4060039911419153,
						48.38246396742761,
						0
					],
					[
						1.4057129714637995,
						48.38179299607873,
						0
					],
					[
						1.405195975676179,
						48.38133802637458,
						0
					],
					[
						1.404365999624133,
						48.380793035030365,
						0
					],
					[
						1.4019990339875221,
						48.37952200323343,
						0
					],
					[
						1.3989060278981924,
						48.37823303416371,
						0
					],
					[
						1.3974879775196314,
						48.37714799679816,
						0
					],
					[
						1.3964949734508991,
						48.376304022967815,
						0
					],
					[
						1.3944819755852222,
						48.37521202862263,
						0
					],
					[
						1.3918710127472878,
						48.3737369813025,
						0
					],
					[
						1.3906070217490196,
						48.37284296751022,
						0
					],
					[
						1.390082985162735,
						48.37244398891926,
						0
					],
					[
						1.3879490364342928,
						48.37095896713436,
						0
					],
					[
						1.386949997395277,
						48.37024197913706,
						0
					],
					[
						1.3860229589045048,
						48.36922198534012,
						0
					],
					[
						1.3854420091956854,
						48.36866098456085,
						0
					],
					[
						1.3833829946815968,
						48.36804097518325,
						0
					],
					[
						1.3822719734162092,
						48.36789303459227,
						0
					],
					[
						1.3814720045775175,
						48.367323987185955,
						0
					],
					[
						1.3806939963251352,
						48.36727201938629,
						0
					],
					[
						1.3797230366617441,
						48.36666600778699,
						0
					],
					[
						1.3761779945343733,
						48.3666049875319,
						0
					],
					[
						1.3752450048923492,
						48.36632997728884,
						0
					],
					[
						1.3742860313504934,
						48.36461001075804,
						0
					],
					[
						1.3738390244543552,
						48.364292001351714,
						0
					],
					[
						1.372352996841073,
						48.36241403594613,
						0
					],
					[
						1.369270971044898,
						48.359397975727916,
						0
					],
					[
						1.3612309657037258,
						48.35585603490472,
						0
					],
					[
						1.3598490413278341,
						48.356062984094024,
						0
					],
					[
						1.358924014493823,
						48.35598503239453,
						0
					],
					[
						1.3572769705206156,
						48.3560729585588,
						0
					],
					[
						1.3567550294101238,
						48.356000036001205,
						0
					],
					[
						1.3560249656438828,
						48.35408401675522,
						0
					],
					[
						1.3552629668265581,
						48.352885991334915,
						0
					],
					[
						1.3519159890711308,
						48.348821019753814,
						0
					],
					[
						1.3507769722491503,
						48.34656695835292,
						0
					],
					[
						1.3493419904261827,
						48.344743978232145,
						0
					],
					[
						1.3492569979280233,
						48.344678012654185,
						0
					],
					[
						1.3479029852896929,
						48.34372700192034,
						0
					],
					[
						1.3470720034092665,
						48.34326800890267,
						0
					],
					[
						1.3458230160176754,
						48.3425360172987,
						0
					],
					[
						1.3446929678320885,
						48.34170000627637,
						0
					],
					[
						1.3404669798910618,
						48.33940596319735,
						0
					],
					[
						1.3378270156681538,
						48.33832696080208,
						0
					],
					[
						1.3323719892650843,
						48.33432502113283,
						0
					],
					[
						1.3297460228204727,
						48.33259700797498,
						0
					],
					[
						1.3280719891190529,
						48.33210096694529,
						0
					],
					[
						1.3267860375344753,
						48.33149202167988,
						0
					],
					[
						1.3255409896373749,
						48.33070303313434,
						0
					],
					[
						1.324187982827425,
						48.32956803962588,
						0
					],
					[
						1.3221660163253546,
						48.32889296114445,
						0
					],
					[
						1.3200800120830536,
						48.327638022601604,
						0
					],
					[
						1.3189659733325243,
						48.32696797326207,
						0
					],
					[
						1.318862959742546,
						48.32690502516925,
						0
					],
					[
						1.313317995518446,
						48.32357497885823,
						0
					],
					[
						1.3117430359125137,
						48.32262597978115,
						0
					],
					[
						1.310534030199051,
						48.321922989562154,
						0
					],
					[
						1.3094609789550304,
						48.321300968527794,
						0
					],
					[
						1.3031970150768757,
						48.317521987482905,
						0
					],
					[
						1.3007070031017065,
						48.31525401212275,
						0
					],
					[
						1.295926971361041,
						48.31318703480065,
						0
					],
					[
						1.2926889583468437,
						48.311244025826454,
						0
					],
					[
						1.2917159870266914,
						48.3101259637624,
						0
					],
					[
						1.2903730385005474,
						48.309185011312366,
						0
					],
					[
						1.2880319729447365,
						48.30887798219919,
						0
					],
					[
						1.2863329611718655,
						48.30798899754882,
						0
					],
					[
						1.2836629897356033,
						48.30736697651446,
						0
					],
					[
						1.28165896050632,
						48.306934973225,
						0
					],
					[
						1.2780180294066668,
						48.306240029633045,
						0
					],
					[
						1.2736880220472813,
						48.30515700392425,
						0
					],
					[
						1.2726869713515043,
						48.30486196093261,
						0
					],
					[
						1.2715529836714268,
						48.30446801148355,
						0
					],
					[
						1.269375029951334,
						48.30339998938143,
						0
					],
					[
						1.2675369624048471,
						48.30281501635909,
						0
					],
					[
						1.2673359643667936,
						48.302741004154086,
						0
					],
					[
						1.266924999654293,
						48.302591973915696,
						0
					],
					[
						1.2631180230528116,
						48.301919996738434,
						0
					],
					[
						1.2609209585934877,
						48.30130401067436,
						0
					],
					[
						1.2575739808380604,
						48.30086496658623,
						0
					],
					[
						1.255668019875884,
						48.3005799818784,
						0
					],
					[
						1.253518983721733,
						48.2999739702791,
						0
					],
					[
						1.252103028818965,
						48.29972301609814,
						0
					],
					[
						1.2499229796230793,
						48.29959996975958,
						0
					],
					[
						1.2499229796230793,
						48.29959795810282,
						0
					],
					[
						1.2498740293085575,
						48.29948295839131,
						0
					],
					[
						1.2498310301452875,
						48.29924399033189,
						0
					],
					[
						1.2496120110154152,
						48.29871702007949,
						0
					],
					[
						1.249134996905923,
						48.29808896407485,
						0
					],
					[
						1.2481300067156553,
						48.2974439766258,
						0
					],
					[
						1.2476980034261942,
						48.29694600775838,
						0
					],
					[
						1.2473509926348925,
						48.29697500914335,
						0
					],
					[
						1.2465060129761696,
						48.29707198776305,
						0
					],
					[
						1.2463299930095673,
						48.29731296747923,
						0
					],
					[
						1.2462159991264343,
						48.297343980520964,
						0
					],
					[
						1.2434689980000257,
						48.29714801162481,
						0
					],
					[
						1.2426199950277805,
						48.2964079733938,
						0
					],
					[
						1.24221196398139,
						48.29628702253103,
						0
					],
					[
						1.2418780289590359,
						48.29587999731302,
						0
					],
					[
						1.2413829937577248,
						48.295712023973465,
						0
					],
					[
						1.2411710154265165,
						48.29563901759684,
						0
					],
					[
						1.2406629882752895,
						48.29489101655781,
						0
					],
					[
						1.2353180162608624,
						48.29593699425459,
						0
					],
					[
						1.2340759858489037,
						48.29607303254306,
						0
					],
					[
						1.2324980087578297,
						48.29690099693835,
						0
					],
					[
						1.2324020359665155,
						48.296916000545025,
						0
					],
					[
						1.2300469726324081,
						48.29700903967023,
						0
					],
					[
						1.2232270371168852,
						48.29664903692901,
						0
					],
					[
						1.2228060141205788,
						48.29664400778711,
						0
					],
					[
						1.2158780358731747,
						48.29572702758014,
						0
					],
					[
						1.215768987312913,
						48.2957290392369,
						0
					],
					[
						1.2127120234072208,
						48.29643404111266,
						0
					],
					[
						1.210908992215991,
						48.297197967767715,
						0
					],
					[
						1.2107899691909552,
						48.29828300513327,
						0
					],
					[
						1.2096569873392582,
						48.297860976308584,
						0
					],
					[
						1.2089710123836994,
						48.29782501794398,
						0
					],
					[
						1.2071910314261913,
						48.298160964623094,
						0
					],
					[
						1.2054689694195986,
						48.298763958737254,
						0
					],
					[
						1.2045170366764069,
						48.29894903115928,
						0
					],
					[
						1.2044069822877645,
						48.29896101728082,
						0
					],
					[
						1.203394029289484,
						48.298979038372636,
						0
					],
					[
						1.2018729653209448,
						48.29867100343108,
						0
					],
					[
						1.2016309797763824,
						48.29862297512591,
						0
					],
					[
						1.2002420146018267,
						48.29837202094495,
						0
					],
					[
						1.199113978073001,
						48.297861982136965,
						0
					],
					[
						1.192150041460991,
						48.29258498735726,
						0
					],
					[
						1.1893029604107141,
						48.291112035512924,
						0
					],
					[
						1.186920991167426,
						48.28987997956574,
						0
					],
					[
						1.185995964333415,
						48.289715023711324,
						0
					],
					[
						1.181204030290246,
						48.289527017623186,
						0
					],
					[
						1.1771229654550552,
						48.288067979738116,
						0
					],
					[
						1.1685529723763466,
						48.28502803109586,
						0
					],
					[
						1.1623230390250683,
						48.28429796732962,
						0
					],
					[
						1.1574130039662123,
						48.28487497754395,
						0
					],
					[
						1.1556799616664648,
						48.284602984786034,
						0
					],
					[
						1.155352983623743,
						48.28452796675265,
						0
					],
					[
						1.1541599873453379,
						48.284224960953,
						0
					],
					[
						1.1516780219972134,
						48.28305199742317,
						0
					],
					[
						1.1499230191111565,
						48.282670034095645,
						0
					],
					[
						1.1485929787158966,
						48.282112972810864,
						0
					],
					[
						1.147793009877205,
						48.28153998591006,
						0
					],
					[
						1.1471170093864202,
						48.28107504174113,
						0
					],
					[
						1.1457970272749662,
						48.28012998215854,
						0
					],
					[
						1.145522017031908,
						48.27995304018259,
						0
					],
					[
						1.144088041037321,
						48.27896003611386,
						0
					],
					[
						1.1385880038142204,
						48.27512296847999,
						0
					],
					[
						1.1361900251358747,
						48.27342798002064,
						0
					],
					[
						1.134078036993742,
						48.27193499542773,
						0
					],
					[
						1.1320030130445957,
						48.27088197693229,
						0
					],
					[
						1.1319320183247328,
						48.27082397416234,
						0
					],
					[
						1.1290069855749607,
						48.2697019726038,
						0
					],
					[
						1.1238879896700382,
						48.269026977941394,
						0
					],
					[
						1.1230770405381918,
						48.26860997825861,
						0
					],
					[
						1.121784970164299,
						48.2673429697752,
						0
					],
					[
						1.1209399905055761,
						48.26677802950144,
						0
					],
					[
						1.119862999767065,
						48.26641199178994,
						0
					],
					[
						1.1184529960155487,
						48.26603204011917,
						0
					],
					[
						1.115582026541233,
						48.2654520124197,
						0
					],
					[
						1.1114019714295864,
						48.26489302329719,
						0
					],
					[
						1.1112579703330994,
						48.26489302329719,
						0
					],
					[
						1.1095100082457066,
						48.26487701386213,
						0
					],
					[
						1.1083369608968496,
						48.26468196697533,
						0
					],
					[
						1.1068179924041033,
						48.264341996982694,
						0
					],
					[
						1.1048449762165546,
						48.26417704112828,
						0
					],
					[
						1.1031530052423477,
						48.26407503336668,
						0
					],
					[
						1.099642999470234,
						48.264021975919604,
						0
					],
					[
						1.099364971742034,
						48.2638980075717,
						0
					],
					[
						1.0991430189460516,
						48.26355502009392,
						0
					],
					[
						1.0987000353634357,
						48.262067986652255,
						0
					],
					[
						1.0977600049227476,
						48.26226596720517,
						0
					],
					[
						1.0975780338048935,
						48.26235397718847,
						0
					],
					[
						1.09722800552845,
						48.263075994327664,
						0
					],
					[
						1.0970870219171047,
						48.26329601928592,
						0
					],
					[
						1.09651998616755,
						48.263803040608764,
						0
					],
					[
						1.0955050215125084,
						48.264217022806406,
						0
					],
					[
						1.0948229860514402,
						48.26447803527117,
						0
					],
					[
						1.0936279781162739,
						48.26515302993357,
						0
					],
					[
						1.0872500203549862,
						48.26851702295244,
						0
					],
					[
						1.086717015132308,
						48.26878197491169,
						0
					],
					[
						1.0863949824124575,
						48.268918013200164,
						0
					],
					[
						1.085382029414177,
						48.26933300122619,
						0
					],
					[
						1.084754979237914,
						48.26956199482083,
						0
					],
					[
						1.0786930192261934,
						48.2703320402652,
						0
					],
					[
						1.0711400024592876,
						48.271474996581674,
						0
					],
					[
						1.0696070361882448,
						48.27164196409285,
						0
					],
					[
						1.067482978105545,
						48.2718950137496,
						0
					],
					[
						1.0633620154112577,
						48.272230038419366,
						0
					],
					[
						1.060805032029748,
						48.27273203060031,
						0
					],
					[
						1.0551319923251867,
						48.2735269702971,
						0
					],
					[
						1.0519030317664146,
						48.27411001548171,
						0
					],
					[
						1.048984033986926,
						48.274829015135765,
						0
					],
					[
						1.048139976337552,
						48.27516496181488,
						0
					],
					[
						1.0443200077861547,
						48.2753730006516,
						0
					],
					[
						1.0386599600315094,
						48.276331974193454,
						0
					],
					[
						1.0362250171601772,
						48.27695298939943,
						0
					],
					[
						1.0335970390588045,
						48.27765799127519,
						0
					],
					[
						1.033065039664507,
						48.277772990986705,
						0
					],
					[
						1.0322020389139652,
						48.27802302315831,
						0
					],
					[
						1.028764033690095,
						48.2796139921993,
						0
					],
					[
						1.027682013809681,
						48.27999201603234,
						0
					],
					[
						1.0272579733282328,
						48.28012998215854,
						0
					],
					[
						1.022878009825945,
						48.28086297959089,
						0
					],
					[
						1.0228240303695202,
						48.280933974310756,
						0
					],
					[
						1.0228340048342943,
						48.281019972637296,
						0
					],
					[
						1.023029973730445,
						48.281856989488006,
						0
					],
					[
						1.0228469967842102,
						48.28294303268194,
						0
					],
					[
						1.0222780331969261,
						48.2831990160048,
						0
					],
					[
						1.021724995225668,
						48.283382998779416,
						0
					],
					[
						1.021373039111495,
						48.28368801623583,
						0
					],
					[
						1.0211619827896357,
						48.28403997235,
						0
					],
					[
						1.0193600412458181,
						48.28475000336766,
						0
					],
					[
						1.0192530043423176,
						48.28491303138435,
						0
					],
					[
						1.0202900134027004,
						48.287572022527456,
						0
					],
					[
						1.0201529692858458,
						48.28861699439585,
						0
					],
					[
						1.0207329969853163,
						48.29073300585151,
						0
					],
					[
						1.020786976441741,
						48.29086502082646,
						0
					],
					[
						1.0209370125085115,
						48.29157999716699,
						0
					],
					[
						1.020829975605011,
						48.29191703349352,
						0
					],
					[
						1.0199580062180758,
						48.29238801263273,
						0
					],
					[
						1.0199109837412834,
						48.292510975152254,
						0
					],
					[
						1.0207780078053474,
						48.293391996994615,
						0
					],
					[
						1.0216570179909468,
						48.29559501260519,
						0
					],
					[
						1.0220780409872532,
						48.29678197391331,
						0
					],
					[
						1.0219000093638897,
						48.2970380410552,
						0
					],
					[
						1.0202030092477798,
						48.29837000928819,
						0
					],
					[
						1.0196700040251017,
						48.298805030062795,
						0
					],
					[
						1.0194179601967335,
						48.29897501505911,
						0
					],
					[
						1.0173919703811407,
						48.2995299808681,
						0
					],
					[
						1.0166569612920284,
						48.299861988052726,
						0
					],
					[
						1.0152329597622156,
						48.30109496600926,
						0
					],
					[
						1.0146169736981392,
						48.30152202397585,
						0
					],
					[
						1.0101149696856737,
						48.301066970452666,
						0
					],
					[
						1.0063730366528034,
						48.30159000121057,
						0
					],
					[
						1.006339006125927,
						48.30197397619486,
						0
					],
					[
						1.0067900363355875,
						48.30250698141754,
						0
					],
					[
						1.0065730288624763,
						48.303382974117994,
						0
					],
					[
						1.004366995766759,
						48.30401203595102,
						0
					],
					[
						1.0038830246776342,
						48.30446700565517,
						0
					],
					[
						1.0033820383250713,
						48.305164966732264,
						0
					],
					[
						1.0021550115197897,
						48.30476498231292,
						0
					],
					[
						1.0013680346310139,
						48.303920002654195,
						0
					],
					[
						1.0000120103359222,
						48.30378698185086,
						0
					],
					[
						0.9981120005249977,
						48.30335196107626,
						0
					],
					[
						0.9977349825203419,
						48.303279960528016,
						0
					],
					[
						0.9969920106232166,
						48.3057969622314,
						0
					],
					[
						0.9949780069291592,
						48.30682802014053,
						0
					],
					[
						0.9939470328390598,
						48.307100012898445,
						0
					],
					[
						0.9937900397926569,
						48.307118033990264,
						0
					],
					[
						0.9935949929058552,
						48.30713597126305,
						0
					],
					[
						0.9929970279335976,
						48.30723697319627,
						0
					],
					[
						0.9926689602434635,
						48.309098007157445,
						0
					],
					[
						0.9926159866154194,
						48.30947301350534,
						0
					],
					[
						0.9928950201719999,
						48.31048496067524,
						0
					],
					[
						0.9930940065532923,
						48.31118904054165,
						0
					],
					[
						0.9930840320885181,
						48.31119197420776,
						0
					],
					[
						0.9930980298668146,
						48.31140101887286,
						0
					],
					[
						0.9929719660431147,
						48.31156597472727,
						0
					],
					[
						0.9930469840764999,
						48.31168801523745,
						0
					],
					[
						0.9930250234901905,
						48.31188498996198,
						0
					],
					[
						0.9928200021386147,
						48.31192698329687,
						0
					],
					[
						0.992826959118247,
						48.311980962753296,
						0
					],
					[
						0.9926970396190882,
						48.31219998188317,
						0
					],
					[
						0.9919649641960859,
						48.312341971322894,
						0
					],
					[
						0.9918529819697142,
						48.31246501766145,
						0
					],
					[
						0.9918969869613647,
						48.31274698488414,
						0
					],
					[
						0.9917270019650459,
						48.313867980614305,
						0
					],
					[
						0.9912390075623989,
						48.31381701864302,
						0
					],
					[
						0.9907270409166813,
						48.312707003206015,
						0
					],
					[
						0.9907729737460613,
						48.312425035983324,
						0
					],
					[
						0.9907849598675966,
						48.312365021556616,
						0
					],
					[
						0.9907680284231901,
						48.31232897937298,
						0
					],
					[
						0.9891110099852085,
						48.312301989644766,
						0
					],
					[
						0.9888420347124338,
						48.31138601526618,
						0
					],
					[
						0.988824013620615,
						48.31104202196002,
						0
					],
					[
						0.989082008600235,
						48.3106820192188,
						0
					],
					[
						0.9892100002616644,
						48.31057003699243,
						0
					],
					[
						0.9892280213534832,
						48.31047900952399,
						0
					],
					[
						0.9885780047625303,
						48.31011800095439,
						0
					],
					[
						0.9881780203431845,
						48.30999202094972,
						0
					],
					[
						0.9870980121195316,
						48.3098119776696,
						0
					],
					[
						0.9864149708300829,
						48.30977803096175,
						0
					],
					[
						0.98531199619174,
						48.309460021555424,
						0
					],
					[
						0.9809649735689163,
						48.30743302591145,
						0
					],
					[
						0.9790450148284435,
						48.30708500929177,
						0
					],
					[
						0.9782479796558619,
						48.3069400023669,
						0
					],
					[
						0.9761479776352644,
						48.306392999365926,
						0
					],
					[
						0.9757719654589891,
						48.30631303600967,
						0
					],
					[
						0.9757550340145826,
						48.30629300326109,
						0
					],
					[
						0.9757790062576532,
						48.30628001131117,
						0
					],
					[
						0.9748150035738945,
						48.306029979139566,
						0
					],
					[
						0.974212009459734,
						48.305899975821376,
						0
					],
					[
						0.9739700239151716,
						48.30586502328515,
						0
					],
					[
						0.9734980389475822,
						48.30575304105878,
						0
					],
					[
						0.9698830079287291,
						48.30495500005782,
						0
					],
					[
						0.9683300089091063,
						48.30474796704948,
						0
					],
					[
						0.9665890038013458,
						48.304481003433466,
						0
					],
					[
						0.9653830155730247,
						48.30411798320711,
						0
					],
					[
						0.9636470396071672,
						48.303686985746026,
						0
					],
					[
						0.9635379910469055,
						48.303555976599455,
						0
					],
					[
						0.9634710196405649,
						48.30348003655672,
						0
					],
					[
						0.9634219855070114,
						48.3034950401634,
						0
					],
					[
						0.961336987093091,
						48.30279800109565,
						0
					],
					[
						0.9595669806003571,
						48.30266699194908,
						0
					],
					[
						0.9587970189750195,
						48.302587028592825,
						0
					],
					[
						0.9572880249470472,
						48.30240799114108,
						0
					],
					[
						0.9565299656242132,
						48.30251201055944,
						0
					],
					[
						0.9559320006519556,
						48.302628016099334,
						0
					],
					[
						0.9549669921398163,
						48.302612006664276,
						0
					],
					[
						0.9542579669505358,
						48.30261804163456,
						0
					],
					[
						0.95319002866745,
						48.30266003496945,
						0
					],
					[
						0.9506550058722496,
						48.30296698026359,
						0
					],
					[
						0.9465050417929888,
						48.30366703681648,
						0
					],
					[
						0.9449249692261219,
						48.3037350140512,
						0
					],
					[
						0.944085018709302,
						48.303595036268234,
						0
					],
					[
						0.9434370137751102,
						48.303492022678256,
						0
					],
					[
						0.9414769895374775,
						48.3028369769454,
						0
					],
					[
						0.9398679994046688,
						48.30262499861419,
						0
					],
					[
						0.9352400153875351,
						48.30322002992034,
						0
					],
					[
						0.9343320038169622,
						48.3032220415771,
						0
					],
					[
						0.9335399977862835,
						48.30271300859749,
						0
					],
					[
						0.9328919928520918,
						48.30247697420418,
						0
					],
					[
						0.9325029887259007,
						48.30236197449267,
						0
					],
					[
						0.9317720029503107,
						48.30220799893141,
						0
					],
					[
						0.9302070178091526,
						48.30235501751304,
						0
					],
					[
						0.9292570129036903,
						48.30264796502888,
						0
					],
					[
						0.9287759754806757,
						48.30275600776076,
						0
					],
					[
						0.9290929790586233,
						48.30204798839986,
						0
					],
					[
						0.9299399703741074,
						48.301429990679026,
						0
					],
					[
						0.930765001103282,
						48.3004779741168,
						0
					],
					[
						0.9308329783380032,
						48.30040798522532,
						0
					],
					[
						0.9314519818872213,
						48.30000498332083,
						0
					],
					[
						0.9316430054605007,
						48.299819994717836,
						0
					],
					[
						0.9311909694224596,
						48.29920602031052,
						0
					],
					[
						0.9309079963713884,
						48.297300981357694,
						0
					],
					[
						0.931030036881566,
						48.296397998929024,
						0
					],
					[
						0.9304970316588879,
						48.29576298594475,
						0
					],
					[
						0.9292049612849951,
						48.29467300325632,
						0
					],
					[
						0.9289789851754904,
						48.29437402077019,
						0
					],
					[
						0.9290509857237339,
						48.29292504116893,
						0
					],
					[
						0.9296010062098503,
						48.29175098799169,
						0
					],
					[
						0.9297429956495762,
						48.290362022817135,
						0
					],
					[
						0.9295709989964962,
						48.2900030259043,
						0
					],
					[
						0.929525988176465,
						48.28996597789228,
						0
					],
					[
						0.9264650009572506,
						48.29105998389423,
						0
					],
					[
						0.921697961166501,
						48.29139702022076,
						0
					],
					[
						0.9186529833823442,
						48.29222003929317,
						0
					],
					[
						0.9181130211800337,
						48.29232699237764,
						0
					],
					[
						0.9158069919794798,
						48.2923099771142,
						0
					],
					[
						0.914605027064681,
						48.292511980980635,
						0
					],
					[
						0.9142379835247993,
						48.29254299402237,
						0
					],
					[
						0.9071219991892576,
						48.29277701675892,
						0
					],
					[
						0.9036170225590467,
						48.29325302504003,
						0
					],
					[
						0.9010809939354658,
						48.29373297281563,
						0
					],
					[
						0.9009479731321335,
						48.29323299229145,
						0
					],
					[
						0.9008019603788853,
						48.29299301840365,
						0
					],
					[
						0.8988319616764784,
						48.291113041341305,
						0
					],
					[
						0.8980419673025608,
						48.29044500365853,
						0
					],
					[
						0.897735022008419,
						48.29021701589227,
						0
					],
					[
						0.8964130282402039,
						48.289720974862576,
						0
					],
					[
						0.8912050165235996,
						48.288667034357786,
						0
					],
					[
						0.887095034122467,
						48.28835698775947,
						0
					],
					[
						0.8854779973626137,
						48.28798701055348,
						0
					],
					[
						0.8833869639784098,
						48.28704999759793,
						0
					],
					[
						0.8828129712492228,
						48.286623023450375,
						0
					],
					[
						0.8825320098549128,
						48.286238964647055,
						0
					],
					[
						0.8824519626796246,
						48.286260003224015,
						0
					],
					[
						0.8772509917616844,
						48.28887197189033,
						0
					],
					[
						0.8765630051493645,
						48.28944797627628,
						0
					],
					[
						0.8752619661390781,
						48.290248028934,
						0
					],
					[
						0.8734679874032736,
						48.29177001491189,
						0
					],
					[
						0.8715419936925173,
						48.29278196208179,
						0
					],
					[
						0.8707049768418074,
						48.2932579703629,
						0
					],
					[
						0.869787996634841,
						48.29434996470809,
						0
					],
					[
						0.8675249665975571,
						48.296252992004156,
						0
					],
					[
						0.8663420286029577,
						48.297003004699945,
						0
					],
					[
						0.8656599931418896,
						48.297456968575716,
						0
					],
					[
						0.8627379778772593,
						48.29899001866579,
						0
					],
					[
						0.8618619851768017,
						48.29952302388847,
						0
					],
					[
						0.8608350344002247,
						48.30035702325404,
						0
					],
					[
						0.8597430400550365,
						48.301001004874706,
						0
					],
					[
						0.8593119587749243,
						48.30144298262894,
						0
					],
					[
						0.8591070212423801,
						48.30160500481725,
						0
					],
					[
						0.8573599811643362,
						48.302373038604856,
						0
					],
					[
						0.8563880156725645,
						48.30274301581085,
						0
					],
					[
						0.8559919707477093,
						48.303277026861906,
						0
					],
					[
						0.855486961081624,
						48.304503969848156,
						0
					],
					[
						0.8542620297521353,
						48.30560996197164,
						0
					],
					[
						0.8544870000332594,
						48.306757025420666,
						0
					],
					[
						0.8542509656399488,
						48.307058019563556,
						0
					],
					[
						0.8523880038410425,
						48.30685802735388,
						0
					],
					[
						0.8520330302417278,
						48.3069899585098,
						0
					],
					[
						0.8511769864708185,
						48.30741701647639,
						0
					],
					[
						0.8489430416375399,
						48.308797013014555,
						0
					],
					[
						0.8482269756495953,
						48.309119967743754,
						0
					],
					[
						0.843233959749341,
						48.309552976861596,
						0
					],
					[
						0.8427140302956104,
						48.309808960184455,
						0
					],
					[
						0.8423569612205029,
						48.309849025681615,
						0
					],
					[
						0.837840037420392,
						48.30988900735974,
						0
					],
					[
						0.837251041084528,
						48.30998900346458,
						0
					],
					[
						0.8356770034879446,
						48.31024004146457,
						0
					],
					[
						0.8348819799721241,
						48.310368033126,
						0
					],
					[
						0.8324199635535479,
						48.31114696338773,
						0
					],
					[
						0.8310299925506115,
						48.311652978882194,
						0
					],
					[
						0.8296919893473387,
						48.31232998520136,
						0
					],
					[
						0.8267819602042437,
						48.31299701705575,
						0
					],
					[
						0.8256850205361843,
						48.31327797845006,
						0
					],
					[
						0.8242249768227339,
						48.31397803500295,
						0
					],
					[
						0.8222770225256681,
						48.31435698084533,
						0
					],
					[
						0.8218150120228529,
						48.31443501636386,
						0
					],
					[
						0.8214440289884806,
						48.31456200219691,
						0
					],
					[
						0.8217249903827906,
						48.314813962206244,
						0
					],
					[
						0.822591008618474,
						48.315246971324086,
						0
					],
					[
						0.8229410368949175,
						48.315412010997534,
						0
					],
					[
						0.8238919638097286,
						48.315973011776805,
						0
					],
					[
						0.8244780264794827,
						48.316937014460564,
						0
					],
					[
						0.8246399648487568,
						48.31740497611463,
						0
					],
					[
						0.8244569879025221,
						48.318337965756655,
						0
					],
					[
						0.8237580209970474,
						48.31925000064075,
						0
					],
					[
						0.8239919599145651,
						48.320573000237346,
						0
					],
					[
						0.8228950202465057,
						48.32080199383199,
						0
					],
					[
						0.8222729992121458,
						48.321172976866364,
						0
					],
					[
						0.8221989870071411,
						48.321256041526794,
						0
					],
					[
						0.8218379784375429,
						48.32133499905467,
						0
					],
					[
						0.8221040200442076,
						48.322806023061275,
						0
					],
					[
						0.8221620228141546,
						48.32299101166427,
						0
					],
					[
						0.8196629583835602,
						48.32344204187393,
						0
					],
					[
						0.8187820203602314,
						48.32355201244354,
						0
					],
					[
						0.8121510129421949,
						48.324033971875906,
						0
					],
					[
						0.8120680321007967,
						48.32486403174698,
						0
					],
					[
						0.8117060177028179,
						48.32526099868119,
						0
					],
					[
						0.8121449779719114,
						48.32625199109316,
						0
					],
					[
						0.8121299743652344,
						48.32722496241331,
						0
					],
					[
						0.8121550362557173,
						48.3274070173502,
						0
					],
					[
						0.8135880064219236,
						48.329098988324404,
						0
					],
					[
						0.8140569739043713,
						48.33035702817142,
						0
					],
					[
						0.8176880143582821,
						48.33455099724233,
						0
					],
					[
						0.8177809696644545,
						48.33473498001695,
						0
					],
					[
						0.8175450190901756,
						48.33510596305132,
						0
					],
					[
						0.8181019965559244,
						48.335545007139444,
						0
					],
					[
						0.818762993440032,
						48.336039958521724,
						0
					],
					[
						0.8203859813511372,
						48.33779303357005,
						0
					],
					[
						0.8206210099160671,
						48.337951032444835,
						0
					],
					[
						0.8223460055887699,
						48.339438987895846,
						0
					],
					[
						0.8228230196982622,
						48.339887000620365,
						0
					],
					[
						0.8238190412521362,
						48.34118896164,
						0
					],
					[
						0.8246109634637833,
						48.34209496155381,
						0
					],
					[
						0.8252719603478909,
						48.3433079905808,
						0
					],
					[
						0.8254980202764273,
						48.34354201331735,
						0
					],
					[
						0.8269190043210983,
						48.34461900405586,
						0
					],
					[
						0.8279280178248882,
						48.345368010923266,
						0
					],
					[
						0.8294489979743958,
						48.34603403694928,
						0
					],
					[
						0.8304239809513092,
						48.347017988562584,
						0
					],
					[
						0.8313640113919973,
						48.347918037325144,
						0
					],
					[
						0.8326280023902655,
						48.34900600835681,
						0
					],
					[
						0.8330989815294743,
						48.350716000422835,
						0
					],
					[
						0.8330220356583595,
						48.35108497180045,
						0
					],
					[
						0.8325949776917696,
						48.35148001089692,
						0
					],
					[
						0.832212008535862,
						48.351727025583386,
						0
					],
					[
						0.832040011882782,
						48.352221976965666,
						0
					],
					[
						0.8322209771722555,
						48.35515203885734,
						0
					],
					[
						0.8324389904737473,
						48.35586198605597,
						0
					],
					[
						0.8324949815869331,
						48.35600498132408,
						0
					],
					[
						0.8331040106713772,
						48.35712698288262,
						0
					],
					[
						0.834169015288353,
						48.35787598975003,
						0
					],
					[
						0.8343099988996983,
						48.35794497281313,
						0
					],
					[
						0.8350399788469076,
						48.358422992751,
						0
					],
					[
						0.8353330101817846,
						48.35871996358037,
						0
					],
					[
						0.8354849740862846,
						48.35892800241709,
						0
					],
					[
						0.8355650212615728,
						48.358984999358654,
						0
					],
					[
						0.835655964910984,
						48.3591640368104,
						0
					],
					[
						0.8358790073543787,
						48.35951699875295,
						0
					],
					[
						0.8363400120288134,
						48.36036700755358,
						0
					],
					[
						0.8364560175687075,
						48.36065702140331,
						0
					],
					[
						0.8368000108748674,
						48.361628986895084,
						0
					],
					[
						0.8379749860614538,
						48.36237195879221,
						0
					],
					[
						0.8388170320540667,
						48.363281982019544,
						0
					],
					[
						0.838937982916832,
						48.36337703280151,
						0
					],
					[
						0.8397610019892454,
						48.36385698057711,
						0
					],
					[
						0.8401159755885601,
						48.36428496055305,
						0
					],
					[
						0.8399039972573519,
						48.36527796462178,
						0
					],
					[
						0.8387389965355396,
						48.3666189853102,
						0
					],
					[
						0.8383339829742908,
						48.36745700798929,
						0
					],
					[
						0.837380038574338,
						48.36864598095417,
						0
					],
					[
						0.8366099931299686,
						48.36998197250068,
						0
					],
					[
						0.836105989292264,
						48.3703279774636,
						0
					],
					[
						0.8354220259934664,
						48.370527969673276,
						0
					],
					[
						0.8343300316482782,
						48.370996015146375,
						0
					],
					[
						0.8323929738253355,
						48.372246008366346,
						0
					],
					[
						0.8312599919736385,
						48.37251498363912,
						0
					],
					[
						0.8310070261359215,
						48.372738026082516,
						0
					],
					[
						0.8308320119976997,
						48.37425598874688,
						0
					],
					[
						0.830821031704545,
						48.37476301006973,
						0
					],
					[
						0.831653019413352,
						48.375898003578186,
						0
					],
					[
						0.8315380197018385,
						48.37792097590864,
						0
					],
					[
						0.8316639997065067,
						48.37910701520741,
						0
					],
					[
						0.8323069754987955,
						48.380213007330894,
						0
					],
					[
						0.832849033176899,
						48.38066102005541,
						0
					],
					[
						0.8340799994766712,
						48.381098974496126,
						0
					],
					[
						0.8345349691808224,
						48.381697023287416,
						0
					],
					[
						0.8346519805490971,
						48.38274300098419,
						0
					],
					[
						0.8342079911381006,
						48.384962026029825,
						0
					],
					[
						0.8342809975147247,
						48.385048024356365,
						0
					],
					[
						0.8344339672476053,
						48.3850740082562,
						0
					],
					[
						0.834535975009203,
						48.385092029348016,
						0
					],
					[
						0.8348140027374029,
						48.38512497022748,
						0
					],
					[
						0.8358260337263346,
						48.385328985750675,
						0
					],
					[
						0.835969028994441,
						48.38532001711428,
						0
					],
					[
						0.8359879720956087,
						48.38530199602246,
						0
					],
					[
						0.8359599765390158,
						48.38528196327388,
						0
					],
					[
						0.8359869662672281,
						48.385283974930644,
						0
					],
					[
						0.8434229716658592,
						48.386534973978996,
						0
					],
					[
						0.8452610392123461,
						48.385350024327636,
						0
					],
					[
						0.8458510413765907,
						48.3847870118916,
						0
					],
					[
						0.8467729669064283,
						48.38341900147498,
						0
					],
					[
						0.8474280126392841,
						48.38306897319853,
						0
					],
					[
						0.8479640353471041,
						48.3834039978683,
						0
					],
					[
						0.8483180031180382,
						48.38381001725793,
						0
					],
					[
						0.8486189972609282,
						48.38413800112903,
						0
					],
					[
						0.8491550199687481,
						48.3844590280205,
						0
					],
					[
						0.8494450338184834,
						48.3848649635911,
						0
					],
					[
						0.849777041003108,
						48.384985998272896,
						0
					],
					[
						0.8509039878845215,
						48.38562000542879,
						0
					],
					[
						0.8521160110831261,
						48.38648200035095,
						0
					],
					[
						0.8531569596379995,
						48.38760098442435,
						0
					],
					[
						0.8532749768346548,
						48.388419980183244,
						0
					],
					[
						0.8533069957047701,
						48.388548977673054,
						0
					],
					[
						0.8528999704867601,
						48.38963200338185,
						0
					],
					[
						0.8520630374550819,
						48.39038696140051,
						0
					],
					[
						0.8508179895579815,
						48.39114896021783,
						0
					],
					[
						0.8490690216422081,
						48.39214699342847,
						0
					],
					[
						0.8477529790252447,
						48.39328701607883,
						0
					],
					[
						0.8470769785344601,
						48.39374299161136,
						0
					],
					[
						0.843526991084218,
						48.39631699025631,
						0
					],
					[
						0.8430710155516863,
						48.39666500687599,
						0
					],
					[
						0.8427540119737387,
						48.397015035152435,
						0
					],
					[
						0.8394549787044525,
						48.3992909733206,
						0
					],
					[
						0.8393630292266607,
						48.39937495999038,
						0
					],
					[
						0.8390529826283455,
						48.39965399354696,
						0
					],
					[
						0.8390340395271778,
						48.399810986593366,
						0
					],
					[
						0.8378409594297409,
						48.400712963193655,
						0
					],
					[
						0.8363329712301493,
						48.40164897032082,
						0
					],
					[
						0.8348730113357306,
						48.402664018794894,
						0
					],
					[
						0.8344450313597918,
						48.40297498740256,
						0
					],
					[
						0.833552023395896,
						48.403502963483334,
						0
					],
					[
						0.8321349788457155,
						48.40407997369766,
						0
					],
					[
						0.8319199830293655,
						48.40422003529966,
						0
					],
					[
						0.830204039812088,
						48.40527196414769,
						0
					],
					[
						0.8275130297988653,
						48.407606994733214,
						0
					],
					[
						0.8252820186316967,
						48.40924699790776,
						0
					],
					[
						0.8245800342410803,
						48.409713031724095,
						0
					],
					[
						0.8239919599145651,
						48.41038702055812,
						0
					],
					[
						0.8238199632614851,
						48.41058298945427,
						0
					],
					[
						0.8235170412808657,
						48.41084802523255,
						0
					],
					[
						0.8218030259013176,
						48.411795012652874,
						0
					],
					[
						0.818295031785965,
						48.41301198117435,
						0
					],
					[
						0.8178180176764727,
						48.41316998004913,
						0
					],
					[
						0.8164729736745358,
						48.41363802552223,
						0
					],
					[
						0.813622958958149,
						48.41391798108816,
						0
					],
					[
						0.8130030333995819,
						48.413925021886826,
						0
					],
					[
						0.8097370248287916,
						48.41423003934324,
						0
					],
					[
						0.8090900257229805,
						48.414355013519526,
						0
					],
					[
						0.8087769616395235,
						48.41440999880433,
						0
					],
					[
						0.8081950061023235,
						48.414545031264424,
						0
					],
					[
						0.8071600086987019,
						48.41472499072552,
						0
					],
					[
						0.8066049590706825,
						48.41486698016524,
						0
					],
					[
						0.8050829730927944,
						48.415103014558554,
						0
					],
					[
						0.8041400089859962,
						48.41546502895653,
						0
					],
					[
						0.803728960454464,
						48.41565898619592,
						0
					],
					[
						0.8021369855850935,
						48.41668501496315,
						0
					],
					[
						0.800737040117383,
						48.417320027947426,
						0
					],
					[
						0.7942320127040148,
						48.418951984494925,
						0
					],
					[
						0.7894150167703629,
						48.42016995884478,
						0
					],
					[
						0.7862670253962278,
						48.42065501958132,
						0
					],
					[
						0.7810170203447342,
						48.421614998951554,
						0
					],
					[
						0.7758080027997494,
						48.423162968829274,
						0
					],
					[
						0.7754820305854082,
						48.42326497659087,
						0
					],
					[
						0.7737670093774796,
						48.42359798960388,
						0
					],
					[
						0.7728230394423008,
						48.423784989863634,
						0
					],
					[
						0.7716349884867668,
						48.424110040068626,
						0
					],
					[
						0.7678900379687548,
						48.42444498091936,
						0
					],
					[
						0.7677610404789448,
						48.424452021718025,
						0
					],
					[
						0.7676700130105019,
						48.42449099756777,
						0
					],
					[
						0.7621829677373171,
						48.42448798008263,
						0
					],
					[
						0.7599999848753214,
						48.424537014216185,
						0
					],
					[
						0.7594529818743467,
						48.42457003891468,
						0
					],
					[
						0.7580129709094763,
						48.42469803057611,
						0
					],
					[
						0.7572430092841387,
						48.424732983112335,
						0
					],
					[
						0.756718972697854,
						48.424882013350725,
						0
					],
					[
						0.7507480401545763,
						48.425485007464886,
						0
					],
					[
						0.7479720376431942,
						48.425979958847165,
						0
					],
					[
						0.7469780277460814,
						48.426276007667184,
						0
					],
					[
						0.7463750336319208,
						48.42646996490657,
						0
					],
					[
						0.7439229916781187,
						48.42710003256798,
						0
					],
					[
						0.7424269896000624,
						48.42768500559032,
						0
					],
					[
						0.7409780099987984,
						48.42852302826941,
						0
					],
					[
						0.7391929998993874,
						48.42991501092911,
						0
					],
					[
						0.7378069683909416,
						48.43090700916946,
						0
					],
					[
						0.7359369657933712,
						48.431948041543365,
						0
					],
					[
						0.7339020073413849,
						48.43286301009357,
						0
					],
					[
						0.7335929665714502,
						48.43298899009824,
						0
					],
					[
						0.7313349656760693,
						48.43361796811223,
						0
					],
					[
						0.7229679822921753,
						48.43532997183502,
						0
					],
					[
						0.7214660290628672,
						48.43563599511981,
						0
					],
					[
						0.7190080359578133,
						48.43591201119125,
						0
					],
					[
						0.7150899991393089,
						48.436420038342476,
						0
					],
					[
						0.7106470037251711,
						48.43725001439452,
						0
					],
					[
						0.7105770148336887,
						48.43726996332407,
						0
					],
					[
						0.7092230021953583,
						48.43776198104024,
						0
					],
					[
						0.7081849873065948,
						48.43822801485658,
						0
					],
					[
						0.7061679661273956,
						48.43945998698473,
						0
					],
					[
						0.7025729678571224,
						48.44223196618259,
						0
					],
					[
						0.7019670400768518,
						48.44293998554349,
						0
					],
					[
						0.7017729990184307,
						48.44320300966501,
						0
					],
					[
						0.700930031016469,
						48.444842007011175,
						0
					],
					[
						0.7003930024802685,
						48.44759998843074,
						0
					],
					[
						0.6999129708856344,
						48.448427030816674,
						0
					],
					[
						0.6990000139921904,
						48.44932003878057,
						0
					],
					[
						0.6975650321692228,
						48.4501230251044,
						0
					],
					[
						0.69652802310884,
						48.45051001757383,
						0
					],
					[
						0.6887119822204113,
						48.45262996852398,
						0
					],
					[
						0.6880870275199413,
						48.45277698710561,
						0
					],
					[
						0.6852419581264257,
						48.45305996015668,
						0
					],
					[
						0.6836919765919447,
						48.4529950004071,
						0
					],
					[
						0.674231993034482,
						48.45131803303957,
						0
					],
					[
						0.6734870094805956,
						48.45127201639116,
						0
					],
					[
						0.6715480238199234,
						48.451457004994154,
						0
					],
					[
						0.6707669980823994,
						48.45163797028363,
						0
					],
					[
						0.6690379790961742,
						48.45224800519645,
						0
					],
					[
						0.6677449867129326,
						48.45250801183283,
						0
					],
					[
						0.6625369749963284,
						48.45322801731527,
						0
					],
					[
						0.6612230278551579,
						48.453394984826446,
						0
					],
					[
						0.6594169791787863,
						48.45335802063346,
						0
					],
					[
						0.6574499979615211,
						48.45312500372529,
						0
					],
					[
						0.6554769817739725,
						48.45258001238108,
						0
					],
					[
						0.6553530134260654,
						48.452532989904284,
						0
					],
					[
						0.6488299649208784,
						48.45012101344764,
						0
					],
					[
						0.6480529624968767,
						48.449803004041314,
						0
					],
					[
						0.6461080256849527,
						48.449290031567216,
						0
					],
					[
						0.6459220312535763,
						48.44924803823233,
						0
					],
					[
						0.6435979809612036,
						48.448985014110804,
						0
					],
					[
						0.6422469858080149,
						48.44897001050413,
						0
					],
					[
						0.6408199667930603,
						48.44904502853751,
						0
					],
					[
						0.6397920101881027,
						48.449266981333494,
						0
					],
					[
						0.6389379780739546,
						48.44950703904033,
						0
					],
					[
						0.6380530167371035,
						48.44974801875651,
						0
					],
					[
						0.6365280132740736,
						48.450404992327094,
						0
					],
					[
						0.6344150193035603,
						48.45153302885592,
						0
					],
					[
						0.6318260170519352,
						48.4529810026288,
						0
					],
					[
						0.6305969785898924,
						48.45350503921509,
						0
					],
					[
						0.6275499891489744,
						48.4545630030334,
						0
					],
					[
						0.626160018146038,
						48.45494999550283,
						0
					],
					[
						0.6234400067478418,
						48.45576697960496,
						0
					],
					[
						0.6231980212032795,
						48.4558720048517,
						0
					],
					[
						0.6221480201929808,
						48.45611499622464,
						0
					],
					[
						0.6210380047559738,
						48.456423031166196,
						0
					],
					[
						0.6193049624562263,
						48.457131972536445,
						0
					],
					[
						0.6169160362333059,
						48.45781300216913,
						0
					],
					[
						0.6166970171034336,
						48.45786798745394,
						0
					],
					[
						0.6148420181125402,
						48.45871799625456,
						0
					],
					[
						0.6134350318461657,
						48.45950203947723,
						0
					],
					[
						0.6109979934990406,
						48.46099301241338,
						0
					],
					[
						0.6085349712520838,
						48.463042974472046,
						0
					],
					[
						0.6023870129138231,
						48.46956300549209,
						0
					],
					[
						0.6012179888784885,
						48.470722977072,
						0
					],
					[
						0.5998229887336493,
						48.47192703746259,
						0
					],
					[
						0.598908020183444,
						48.47269196994603,
						0
					],
					[
						0.5947540327906609,
						48.47591799683869,
						0
					],
					[
						0.5933769699186087,
						48.47713999450207,
						0
					],
					[
						0.5931380018591881,
						48.477375023067,
						0
					],
					[
						0.5923259630799294,
						48.47841798327863,
						0
					],
					[
						0.5913189612329006,
						48.48019695840776,
						0
					],
					[
						0.5898869968950748,
						48.482740027830005,
						0
					],
					[
						0.5882899928838015,
						48.48464699462056,
						0
					],
					[
						0.5854369606822729,
						48.48767797462642,
						0
					],
					[
						0.5840849597007036,
						48.48886803723872,
						0
					],
					[
						0.5838970374315977,
						48.489037016406655,
						0
					],
					[
						0.5832119844853878,
						48.489615032449365,
						0
					],
					[
						0.5755899846553802,
						48.49561898969114,
						0
					],
					[
						0.5733230151236057,
						48.497169977054,
						0
					],
					[
						0.5723050329834223,
						48.497650008648634,
						0
					],
					[
						0.5715479794889688,
						48.49792501889169,
						0
					],
					[
						0.5689469911158085,
						48.49869498051703,
						0
					],
					[
						0.5638020113110542,
						48.50030195899308,
						0
					],
					[
						0.5633069761097431,
						48.500509997829795,
						0
					],
					[
						0.5627729650586843,
						48.50077302195132,
						0
					],
					[
						0.5612499732524157,
						48.501731995493174,
						0
					],
					[
						0.5600950308144093,
						48.5027339681983,
						0
					],
					[
						0.5596470180898905,
						48.502400033175945,
						0
					],
					[
						0.5588229931890965,
						48.50239500403404,
						0
					],
					[
						0.5584560334682465,
						48.50411597639322,
						0
					],
					[
						0.5577810388058424,
						48.50492600351572,
						0
					],
					[
						0.556702958419919,
						48.505881037563086,
						0
					],
					[
						0.5564560275524855,
						48.506054962053895,
						0
					],
					[
						0.5564049817621708,
						48.506077006459236,
						0
					],
					[
						0.5563670117408037,
						48.5061149764806,
						0
					],
					[
						0.5562869645655155,
						48.50613299757242,
						0
					],
					[
						0.5563520081341267,
						48.506931038573384,
						0
					],
					[
						0.556378997862339,
						48.50700396113098,
						0
					],
					[
						0.554272960871458,
						48.507817005738616,
						0
					],
					[
						0.5502899643033743,
						48.50945298559964,
						0
					],
					[
						0.5482969991862774,
						48.5101299919188,
						0
					],
					[
						0.5478950031101704,
						48.51023300550878,
						0
					],
					[
						0.5479499883949757,
						48.51061304099858,
						0
					],
					[
						0.547761982306838,
						48.510756036266685,
						0
					],
					[
						0.5472149793058634,
						48.51082803681493,
						0
					],
					[
						0.5469790287315845,
						48.510696021839976,
						0
					],
					[
						0.5450749956071377,
						48.51119700819254,
						0
					],
					[
						0.5446279887109995,
						48.51124696433544,
						0
					],
					[
						0.5382890067994595,
						48.51139800623059,
						0
					],
					[
						0.5380519665777683,
						48.511447040364146,
						0
					],
					[
						0.5376349668949842,
						48.51137696765363,
						0
					],
					[
						0.5370329786092043,
						48.51133002899587,
						0
					],
					[
						0.5369230080395937,
						48.51133497431874,
						0
					],
					[
						0.5366250313818455,
						48.51135500706732,
						0
					],
					[
						0.5320279765874147,
						48.512452030554414,
						0
					],
					[
						0.5268470384180546,
						48.51246301084757,
						0
					],
					[
						0.52535698749125,
						48.51264003664255,
						0
					],
					[
						0.5248900316655636,
						48.51273802109063,
						0
					],
					[
						0.5236670281738043,
						48.51309198886156,
						0
					],
					[
						0.5212599970400333,
						48.51406496018171,
						0
					],
					[
						0.5193879827857018,
						48.51486501283944,
						0
					],
					[
						0.5185219645500183,
						48.51531503722072,
						0
					],
					[
						0.517528960481286,
						48.51583303883672,
						0
					],
					[
						0.516765033826232,
						48.51648196578026,
						0
					],
					[
						0.5161870177835226,
						48.51696199737489,
						0
					],
					[
						0.5142669752240181,
						48.518085004761815,
						0
					],
					[
						0.5140020232647657,
						48.51822498254478,
						0
					],
					[
						0.5137329641729593,
						48.51835498586297,
						0
					],
					[
						0.5136150307953358,
						48.51842497475445,
						0
					],
					[
						0.5134619772434235,
						48.51849798113108,
						0
					],
					[
						0.51302301697433,
						48.51857199333608,
						0
					],
					[
						0.51212003454566,
						48.51887198165059,
						0
					],
					[
						0.511806970462203,
						48.51899703964591,
						0
					],
					[
						0.5099590122699738,
						48.51941102184355,
						0
					],
					[
						0.5084279738366604,
						48.519697012379766,
						0
					],
					[
						0.5078079644590616,
						48.51974797435105,
						0
					],
					[
						0.5072779767215252,
						48.51985802873969,
						0
					],
					[
						0.5068619828671217,
						48.519845036789775,
						0
					],
					[
						0.5067110247910023,
						48.51984201930463,
						0
					],
					[
						0.5064070131629705,
						48.51985702291131,
						0
					],
					[
						0.5063169915229082,
						48.519866997376084,
						0
					],
					[
						0.50606201402843,
						48.51991703733802,
						0
					],
					[
						0.5042699631303549,
						48.51994696073234,
						0
					],
					[
						0.503366980701685,
						48.51992198266089,
						0
					],
					[
						0.5028919782489538,
						48.51996003650129,
						0
					],
					[
						0.5026370007544756,
						48.5199629701674,
						0
					],
					[
						0.5013450141996145,
						48.51990002207458,
						0
					],
					[
						0.5010550003498793,
						48.51987202651799,
						0
					],
					[
						0.49993702210485935,
						48.5197779815644,
						0
					],
					[
						0.49845702946186066,
						48.51959299296141,
						0
					],
					[
						0.4958680272102356,
						48.519095024093986,
						0
					],
					[
						0.49288096837699413,
						48.51861398667097,
						0
					],
					[
						0.4907119832932949,
						48.51835297420621,
						0
					],
					[
						0.49037301912903786,
						48.51840200833976,
						0
					],
					[
						0.49025198444724083,
						48.51842204108834,
						0
					],
					[
						0.49011804163455963,
						48.518426986411214,
						0
					],
					[
						0.4899229947477579,
						48.51846797391772,
						0
					],
					[
						0.4897049814462662,
						48.5184880066663,
						0
					],
					[
						0.48797696828842163,
						48.518792018294334,
						0
					],
					[
						0.4874349944293499,
						48.518965020775795,
						0
					],
					[
						0.4872650094330311,
						48.51894096471369,
						0
					],
					[
						0.48725604079663754,
						48.518922021612525,
						0
					],
					[
						0.4860710073262453,
						48.5195710323751,
						0
					],
					[
						0.48505302518606186,
						48.51997101679444,
						0
					],
					[
						0.48480802215635777,
						48.51992198266089,
						0
					],
					[
						0.484762005507946,
						48.51992198266089,
						0
					],
					[
						0.48472302965819836,
						48.51995903067291,
						0
					],
					[
						0.4846149869263172,
						48.5203099809587,
						0
					],
					[
						0.484597971662879,
						48.52036999538541,
						0
					],
					[
						0.4845370352268219,
						48.52047502063215,
						0
					],
					[
						0.4843790363520384,
						48.52104398421943,
						0
					],
					[
						0.484274011105299,
						48.52115496061742,
						0
					],
					[
						0.48422103747725487,
						48.52116099558771,
						0
					],
					[
						0.4834349825978279,
						48.52097298949957,
						0
					],
					[
						0.482337037101388,
						48.52031299844384,
						0
					],
					[
						0.4817850049585104,
						48.520147958770394,
						0
					],
					[
						0.48146297223865986,
						48.520102025941014,
						0
					],
					[
						0.4810520075261593,
						48.52005500346422,
						0
					],
					[
						0.4805849678814411,
						48.5199679993093,
						0
					],
					[
						0.48003301955759525,
						48.519887030124664,
						0
					],
					[
						0.47736698761582375,
						48.5194000415504,
						0
					],
					[
						0.4757379647344351,
						48.5191220138222,
						0
					],
					[
						0.4748980142176151,
						48.51901799440384,
						0
					],
					[
						0.47448202036321163,
						48.51898002438247,
						0
					],
					[
						0.4729180410504341,
						48.51891699247062,
						0
					],
					[
						0.46891702339053154,
						48.51919300854206,
						0
					],
					[
						0.4675019904971123,
						48.51955502294004,
						0
					],
					[
						0.46214000321924686,
						48.52229196578264,
						0
					],
					[
						0.45964496210217476,
						48.52334196679294,
						0
					],
					[
						0.4584269877523184,
						48.523695012554526,
						0
					],
					[
						0.45792700722813606,
						48.52382702752948,
						0
					],
					[
						0.4570500086992979,
						48.52402500808239,
						0
					],
					[
						0.45636202208697796,
						48.52415501140058,
						0
					],
					[
						0.4552329797297716,
						48.52428996004164,
						0
					],
					[
						0.4544650297611952,
						48.52438501082361,
						0
					],
					[
						0.4537099879235029,
						48.524403031915426,
						0
					],
					[
						0.4528670199215412,
						48.5244320333004,
						0
					],
					[
						0.4503360204398632,
						48.5243249963969,
						0
					],
					[
						0.4482080228626728,
						48.52411502972245,
						0
					],
					[
						0.4387099854648113,
						48.52301800623536,
						0
					],
					[
						0.4386499710381031,
						48.523027980700135,
						0
					],
					[
						0.43854796327650547,
						48.5229969676584,
						0
					],
					[
						0.437378017231822,
						48.52293200790882,
						0
					],
					[
						0.43652499094605446,
						48.52276696823537,
						0
					],
					[
						0.43620698153972626,
						48.522703014314175,
						0
					],
					[
						0.43294197879731655,
						48.52235198020935,
						0
					],
					[
						0.4311960283666849,
						48.52223597466946,
						0
					],
					[
						0.4308370314538479,
						48.522083004936576,
						0
					],
					[
						0.42982298880815506,
						48.52212198078632,
						0
					],
					[
						0.42706198990345,
						48.522362960502505,
						0
					],
					[
						0.42252696119248867,
						48.52285196073353,
						0
					],
					[
						0.4158599954098463,
						48.523625023663044,
						0
					],
					[
						0.4132020100951195,
						48.52389701642096,
						0
					],
					[
						0.4126870259642601,
						48.52387002669275,
						0
					],
					[
						0.4118739813566208,
						48.5238950047642,
						0
					],
					[
						0.40985302068293095,
						48.52395501919091,
						0
					],
					[
						0.40785200893878937,
						48.52393498644233,
						0
					],
					[
						0.39939500391483307,
						48.5234650131315,
						0
					],
					[
						0.3966830391436815,
						48.52314298041165,
						0
					],
					[
						0.3940539713948965,
						48.5227569937706,
						0
					],
					[
						0.38613801822066307,
						48.5210230294615,
						0
					],
					[
						0.3656519763171673,
						48.51555702276528,
						0
					],
					[
						0.364722004160285,
						48.51535803638399,
						0
					],
					[
						0.36270699463784695,
						48.51506802253425,
						0
					],
					[
						0.35934501327574253,
						48.51496299728751,
						0
					],
					[
						0.3590769600123167,
						48.51498202420771,
						0
					],
					[
						0.358807984739542,
						48.51499501615763,
						0
					],
					[
						0.3573180176317692,
						48.51514304056764,
						0
					],
					[
						0.35398797132074833,
						48.51562298834324,
						0
					],
					[
						0.3527720086276531,
						48.51584603078663,
						0
					],
					[
						0.350233968347311,
						48.516154987737536,
						0
					],
					[
						0.3477049805223942,
						48.51613403297961,
						0
					],
					[
						0.3376699984073639,
						48.51487901061773,
						0
					],
					[
						0.3350039664655924,
						48.514539040625095,
						0
					],
					[
						0.3333460260182619,
						48.51426796987653,
						0
					],
					[
						0.3325220011174679,
						48.5141259804368,
						0
					],
					[
						0.3228580020368099,
						48.51208297535777,
						0
					],
					[
						0.27045300230383873,
						48.5008379817009,
						0
					],
					[
						0.26555302552878857,
						48.50000197067857,
						0
					],
					[
						0.2503080200403929,
						48.498231964185834,
						0
					],
					[
						0.25018799118697643,
						48.49821603856981,
						0
					],
					[
						0.24627498351037502,
						48.497650008648634,
						0
					],
					[
						0.244932034984231,
						48.49738799035549,
						0
					],
					[
						0.23821796290576458,
						48.49585804156959,
						0
					],
					[
						0.23485698737204075,
						48.49493796005845,
						0
					],
					[
						0.23259001784026623,
						48.49421996623278,
						0
					],
					[
						0.21957996301352978,
						48.49041701294482,
						0
					],
					[
						0.18560802564024925,
						48.480810010805726,
						0
					],
					[
						0.18318498507142067,
						48.48033199086785,
						0
					],
					[
						0.18150701187551022,
						48.48008296452463,
						0
					],
					[
						0.1815009769052267,
						48.48006796091795,
						0
					],
					[
						0.16934202052652836,
						48.47868503071368,
						0
					],
					[
						0.16530001536011696,
						48.477927977219224,
						0
					],
					[
						0.164655027911067,
						48.47774500027299,
						0
					],
					[
						0.16383997164666653,
						48.47750997170806,
						0
					],
					[
						0.16310001723468304,
						48.47726999782026,
						0
					],
					[
						0.1418829895555973,
						48.46990498714149,
						0
					],
					[
						0.13828002847731113,
						48.46850504167378,
						0
					],
					[
						0.1349479705095291,
						48.46694198437035,
						0
					],
					[
						0.1334630325436592,
						48.467211965471506,
						0
					],
					[
						0.1324970182031393,
						48.46771001815796,
						0
					],
					[
						0.13056297786533833,
						48.468409990891814,
						0
					],
					[
						0.12831302359700203,
						48.46933803521097,
						0
					],
					[
						0.12639801017940044,
						48.47031301818788,
						0
					],
					[
						0.12541699223220348,
						48.47056799568236,
						0
					],
					[
						0.12524801306426525,
						48.470600014552474,
						0
					],
					[
						0.12451300397515297,
						48.47074996680021,
						0
					],
					[
						0.12342503294348717,
						48.47121197730303,
						0
					],
					[
						0.12261299416422844,
						48.47129998728633,
						0
					],
					[
						0.12240302748978138,
						48.47071803174913,
						0
					],
					[
						0.12303301133215427,
						48.469762997701764,
						0
					],
					[
						0.12300803326070309,
						48.46932697109878,
						0
					],
					[
						0.12200103141367435,
						48.46781495958567,
						0
					],
					[
						0.12110802344977856,
						48.467248007655144,
						0
					],
					[
						0.12079495936632156,
						48.466797983273864,
						0
					],
					[
						0.12117499485611916,
						48.465487975627184,
						0
					],
					[
						0.12060502544045448,
						48.464780040085316,
						0
					],
					[
						0.1193380169570446,
						48.463727021589875,
						0
					],
					[
						0.11899796314537525,
						48.46326702274382,
						0
					],
					[
						0.11885203421115875,
						48.462396981194615,
						0
					],
					[
						0.11823998764157295,
						48.461020002141595,
						0
					],
					[
						0.11701002717018127,
						48.458467964082956,
						0
					],
					[
						0.1171250268816948,
						48.457992961630225,
						0
					],
					[
						0.11289803311228752,
						48.45548300072551,
						0
					],
					[
						0.11176303960382938,
						48.45467297360301,
						0
					],
					[
						0.11163496412336826,
						48.45457197166979,
						0
					],
					[
						0.11048203334212303,
						48.453652979806066,
						0
					],
					[
						0.11001700535416603,
						48.45312299206853,
						0
					],
					[
						0.10600198991596699,
						48.44997198320925,
						0
					],
					[
						0.10596703737974167,
						48.4499419759959,
						0
					],
					[
						0.10316203348338604,
						48.44721500761807,
						0
					],
					[
						0.10187700390815735,
						48.44565303996205,
						0
					],
					[
						0.10040698572993279,
						48.44352697022259,
						0
					],
					[
						0.09956502355635166,
						48.44201797619462,
						0
					],
					[
						0.09898700751364231,
						48.440863033756614,
						0
					],
					[
						0.09915498085319996,
						48.44072196632624,
						0
					],
					[
						0.09937500581145287,
						48.44066203571856,
						0
					],
					[
						0.09948497638106346,
						48.44045198522508,
						0
					],
					[
						0.09934499859809875,
						48.440221985802054,
						0
					],
					[
						0.09883202612400055,
						48.43981998972595,
						0
					],
					[
						0.09847202338278294,
						48.438996970653534,
						0
					],
					[
						0.09848199784755707,
						48.43755000270903,
						0
					],
					[
						0.09877704083919525,
						48.436504025012255,
						0
					],
					[
						0.09670545347034931,
						48.435498951002955,
						0
					],
					[
						0.09661459363996983,
						48.4356520883739,
						0
					],
					[
						0.09530031122267246,
						48.43638114631176,
						0
					],
					[
						0.094887251034379,
						48.436334459111094,
						0
					],
					[
						0.0931414682418108,
						48.43373481184244,
						0
					],
					[
						0.09136567823588848,
						48.43230695463717,
						0
					],
					[
						0.09041734971106052,
						48.431688118726015,
						0
					],
					[
						0.08818315342068672,
						48.42956246808171,
						0
					],
					[
						0.08677843026816845,
						48.42881564050913,
						0
					],
					[
						0.08544369600713253,
						48.428844809532166,
						0
					],
					[
						0.08384124375879765,
						48.429511757567525,
						0
					],
					[
						0.08421733975410461,
						48.43025338836014,
						0
					],
					[
						0.08321285247802734,
						48.430614564567804,
						0
					],
					[
						0.07644865661859512,
						48.43165040016174,
						0
					],
					[
						0.07678401656448841,
						48.43285680748522,
						0
					],
					[
						0.07561742328107357,
						48.43308186158538,
						0
					],
					[
						0.07802864536643028,
						48.43723777681589,
						0
					],
					[
						0.080202491953969,
						48.43793439678848,
						0
					],
					[
						0.07891712710261345,
						48.43898900784552,
						0
					],
					[
						0.07693472318351269,
						48.440809305757284,
						0
					],
					[
						0.07642887532711029,
						48.44138765707612,
						0
					],
					[
						0.07597507908940315,
						48.442543018609285,
						0
					],
					[
						0.0757929403334856,
						48.443962913006544,
						0
					],
					[
						0.0747316237539053,
						48.44597976654768,
						0
					],
					[
						0.07469206117093563,
						48.44656968489289,
						0
					],
					[
						0.07347676903009415,
						48.44745724461973,
						0
					],
					[
						0.0730730127543211,
						48.44751499593258,
						0
					],
					[
						0.07268501445651054,
						48.44856801442802,
						0
					],
					[
						0.07240799255669117,
						48.45056902617216,
						0
					],
					[
						0.07238795980811119,
						48.450787961483,
						0
					],
					[
						0.07235200144350529,
						48.45120999030769,
						0
					],
					[
						0.07233699783682823,
						48.45129498280585,
						0
					],
					[
						0.07233699783682823,
						48.45139003358781,
						0
					],
					[
						0.07250698283314705,
						48.452295027673244,
						0
					],
					[
						0.07258200086653233,
						48.45287203788757,
						0
					],
					[
						0.0724250078201294,
						48.45376999117434,
						0
					],
					[
						0.07211202755570412,
						48.45422001555562,
						0
					],
					[
						0.07014496251940727,
						48.45549498684704,
						0
					],
					[
						0.06971203722059727,
						48.455907041206956,
						0
					],
					[
						0.06966803222894669,
						48.455952974036336,
						0
					],
					[
						0.06856204010546207,
						48.457236997783184,
						0
					],
					[
						0.06725496612489223,
						48.458097986876965,
						0
					],
					[
						0.06640001200139523,
						48.458937015384436,
						0
					],
					[
						0.06572199985384941,
						48.4596280194819,
						0
					],
					[
						0.06536702625453472,
						48.4599750302732,
						0
					],
					[
						0.062281982973217964,
						48.461730033159256,
						0
					],
					[
						0.06190203130245209,
						48.46250996924937,
						0
					],
					[
						0.060026999562978745,
						48.46318203024566,
						0
					],
					[
						0.05980001762509346,
						48.465172983706,
						0
					],
					[
						0.05990303121507168,
						48.46603196114302,
						0
					],
					[
						0.059762969613075256,
						48.466732017695904,
						0
					],
					[
						0.057445038110017776,
						48.4686750266701,
						0
					],
					[
						0.05629696883261204,
						48.469054978340864,
						0
					],
					[
						0.05389697849750519,
						48.46909303218126,
						0
					],
					[
						0.05307496525347233,
						48.46938204020262,
						0
					],
					[
						0.052859969437122345,
						48.469272991642356,
						0
					],
					[
						0.05109800957143307,
						48.46847000531852,
						0
					],
					[
						0.05087999626994133,
						48.46838098950684,
						0
					],
					[
						0.05071897991001606,
						48.46865298226476,
						0
					],
					[
						0.049732010811567307,
						48.4692569822073,
						0
					],
					[
						0.047060027718544006,
						48.4700720384717,
						0
					],
					[
						0.04622996784746647,
						48.47048702649772,
						0
					],
					[
						0.044807977974414825,
						48.47162302583456,
						0
					],
					[
						0.04388001747429371,
						48.47271803766489,
						0
					],
					[
						0.04378496669232845,
						48.47282197326422,
						0
					],
					[
						0.04188504070043564,
						48.47407498396933,
						0
					],
					[
						0.04073202610015869,
						48.47510696388781,
						0
					],
					[
						0.03985997289419174,
						48.475563023239374,
						0
					],
					[
						0.035371966660022736,
						48.47673296928406,
						0
					],
					[
						0.03287801519036293,
						48.47779001109302,
						0
					],
					[
						0.03132300451397896,
						48.47657295875251,
						0
					],
					[
						0.030193040147423744,
						48.47616299986839,
						0
					],
					[
						0.028893006965517998,
						48.47576502710581,
						0
					],
					[
						0.02867298200726509,
						48.47538499161601,
						0
					],
					[
						0.028523029759526253,
						48.47403198480606,
						0
					],
					[
						0.028208037838339806,
						48.47364499233663,
						0
					],
					[
						0.026810020208358765,
						48.472943007946014,
						0
					],
					[
						0.025882981717586517,
						48.4728779643774,
						0
					],
					[
						0.025494983419775963,
						48.4727450273931,
						0
					],
					[
						0.02276499755680561,
						48.471871968358755,
						0
					],
					[
						0.020308010280132294,
						48.47078299149871,
						0
					],
					[
						0.01798303797841072,
						48.47068198956549,
						0
					],
					[
						0.0164059828966856,
						48.47026901319623,
						0
					],
					[
						0.016174977645277977,
						48.470173040404916,
						0
					],
					[
						0.01407296396791935,
						48.47025501541793,
						0
					],
					[
						0.011952007189393044,
						48.4709320217371,
						0
					],
					[
						0.010245032608509064,
						48.47109203226864,
						0
					],
					[
						0.006262036040425301,
						48.47242500633001,
						0
					],
					[
						0.0048900023102760315,
						48.47303797490895,
						0
					],
					[
						0.00304296612739563,
						48.47140199504793,
						0
					],
					[
						0.0026530399918556213,
						48.47004001960158,
						0
					],
					[
						0.0022870022803545,
						48.469655038788915,
						0
					],
					[
						0.0017470400780439377,
						48.469444988295436,
						0
					],
					[
						0.0007429718971252441,
						48.46932998858392,
						0
					],
					[
						0.00013000331819057465,
						48.469247007742524,
						0
					],
					[
						-0.00004802830517292023,
						48.469184981659055,
						0
					],
					[
						-0.00035698525607585907,
						48.469120021909475,
						0
					],
					[
						-0.0006699655205011368,
						48.468969985842705,
						0
					],
					[
						-0.0008080154657363892,
						48.468902008607984,
						0
					],
					[
						-0.0013820081949234009,
						48.46870302222669,
						0
					],
					[
						-0.006213001906871796,
						48.468022998422384,
						0
					],
					[
						-0.011486979201436043,
						48.46848802641034,
						0
					],
					[
						-0.016102977097034454,
						48.469891995191574,
						0
					],
					[
						-0.018875040113925934,
						48.46990699879825,
						0
					],
					[
						-0.022417986765503883,
						48.47035501152277,
						0
					],
					[
						-0.025315023958683014,
						48.47037202678621,
						0
					],
					[
						-0.026094960048794746,
						48.470366997644305,
						0
					],
					[
						-0.02732299268245697,
						48.47002803348005,
						0
					],
					[
						-0.027960017323493958,
						48.46939000301063,
						0
					],
					[
						-0.029164999723434448,
						48.46854804083705,
						0
					],
					[
						-0.02928796224296093,
						48.46835701726377,
						0
					],
					[
						-0.02941695973277092,
						48.46822701394558,
						0
					],
					[
						-0.030848002061247826,
						48.46826498396695,
						0
					],
					[
						-0.03258397802710533,
						48.46762997098267,
						0
					],
					[
						-0.03273996524512768,
						48.46876798197627,
						0
					],
					[
						-0.03311203792691231,
						48.46917701885104,
						0
					],
					[
						-0.033768005669116974,
						48.46951698884368,
						0
					],
					[
						-0.035097962245345116,
						48.47016298212111,
						0
					],
					[
						-0.036497991532087326,
						48.471030006185174,
						0
					],
					[
						-0.041986964643001556,
						48.47427003085613,
						0
					],
					[
						-0.04701996222138405,
						48.47723797895014,
						0
					],
					[
						-0.04764198325574398,
						48.477735025808215,
						0
					],
					[
						-0.04842200316488743,
						48.47934200428426,
						0
					],
					[
						-0.04854203201830387,
						48.48038303665817,
						0
					],
					[
						-0.048543959856033325,
						48.48124100826681,
						0
					],
					[
						-0.04915701225399971,
						48.48279702477157,
						0
					],
					[
						-0.04943797364830971,
						48.48322802223265,
						0
					],
					[
						-0.050234002992510796,
						48.484308030456305,
						0
					],
					[
						-0.050770025700330734,
						48.484931979328394,
						0
					],
					[
						-0.05146203562617302,
						48.48642697557807,
						0
					],
					[
						-0.05121602676808834,
						48.48790302872658,
						0
					],
					[
						-0.05114302039146423,
						48.48864298313856,
						0
					],
					[
						-0.052484963089227676,
						48.48904196172953,
						0
					],
					[
						-0.05302601493895054,
						48.48934102803469,
						0
					],
					[
						-0.05251203663647175,
						48.49102503620088,
						0
					],
					[
						-0.052539026364684105,
						48.49106996320188,
						0
					],
					[
						-0.053002964705228806,
						48.49125503562391,
						0
					],
					[
						-0.05430500954389572,
						48.49181695841253,
						0
					],
					[
						-0.05506499670445919,
						48.492260025814176,
						0
					],
					[
						-0.055086035281419754,
						48.49270099774003,
						0
					],
					[
						-0.055001964792609215,
						48.49306703545153,
						0
					],
					[
						-0.05519198253750801,
						48.49333701655269,
						0
					],
					[
						-0.05748803727328777,
						48.494261959567666,
						0
					],
					[
						-0.05959801375865936,
						48.49451802670956,
						0
					],
					[
						-0.061731962487101555,
						48.495523016899824,
						0
					],
					[
						-0.06294800899922848,
						48.49703301675618,
						0
					],
					[
						-0.0647630263119936,
						48.49770298227668,
						0
					],
					[
						-0.06551697850227356,
						48.49847503937781,
						0
					],
					[
						-0.06649497896432877,
						48.498772010207176,
						0
					],
					[
						-0.06656496785581112,
						48.498788019642234,
						0
					],
					[
						-0.0678199902176857,
						48.49927701987326,
						0
					],
					[
						-0.06827998906373978,
						48.50015502423048,
						0
					],
					[
						-0.06907501257956028,
						48.50107703357935,
						0
					],
					[
						-0.07039499469101429,
						48.502185037359595,
						0
					],
					[
						-0.07191203534603119,
						48.502704966813326,
						0
					],
					[
						-0.07246297784149647,
						48.503581965342164,
						0
					],
					[
						-0.07269197143614292,
						48.50388798862696,
						0
					],
					[
						-0.07395302876830101,
						48.50477496162057,
						0
					],
					[
						-0.07448703981935978,
						48.505451967939734,
						0
					],
					[
						-0.0745160412043333,
						48.50548599846661,
						0
					],
					[
						-0.07615998387336731,
						48.506697015836835,
						0
					],
					[
						-0.07674302905797958,
						48.50825697183609,
						0
					],
					[
						-0.07672199048101902,
						48.509145034477115,
						0
					],
					[
						-0.07677496410906315,
						48.50933798588812,
						0
					],
					[
						-0.07724803872406483,
						48.510408019647,
						0
					],
					[
						-0.07772999815642834,
						48.51099198684096,
						0
					],
					[
						-0.07802504114806652,
						48.5114199668169,
						0
					],
					[
						-0.07799696177244186,
						48.51307203993201,
						0
					],
					[
						-0.07940503768622875,
						48.513745022937655,
						0
					],
					[
						-0.08048697374761105,
						48.514927960932255,
						0
					],
					[
						-0.08124302141368389,
						48.51553799584508,
						0
					],
					[
						-0.08197702467441559,
						48.51611701771617,
						0
					],
					[
						-0.08298696018755436,
						48.51734697818756,
						0
					],
					[
						-0.08355299010872841,
						48.518857983872294,
						0
					],
					[
						-0.08445798419415951,
						48.5197779815644,
						0
					],
					[
						-0.08501797914505005,
						48.52039002813399,
						0
					],
					[
						-0.08588802069425583,
						48.520878022536635,
						0
					],
					[
						-0.08609999902546406,
						48.521608002483845,
						0
					],
					[
						-0.08768702857196331,
						48.52359300479293,
						0
					],
					[
						-0.08777998387813568,
						48.52372200228274,
						0
					],
					[
						-0.08817301131784916,
						48.524187030270696,
						0
					],
					[
						-0.0886350218206644,
						48.52452700026333,
						0
					],
					[
						-0.09149199351668358,
						48.526483001187444,
						0
					],
					[
						-0.09286997839808464,
						48.5279599763453,
						0
					],
					[
						-0.09320701472461224,
						48.52883999235928,
						0
					],
					[
						-0.09338202886283398,
						48.529386995360255,
						0
					],
					[
						-0.09395199827849865,
						48.532587038353086,
						0
					],
					[
						-0.09477300569415092,
						48.53363502770662,
						0
					],
					[
						-0.09510199539363384,
						48.534497022628784,
						0
					],
					[
						-0.09561899118125439,
						48.53500303812325,
						0
					],
					[
						-0.0964499730616808,
						48.53565498255193,
						0
					],
					[
						-0.09750701487064362,
						48.53695300407708,
						0
					],
					[
						-0.09831503033638,
						48.537617018446326,
						0
					],
					[
						-0.09906797669827938,
						48.53913003578782,
						0
					],
					[
						-0.10060303844511509,
						48.54035496711731,
						0
					],
					[
						-0.10167701169848442,
						48.541805036365986,
						0
					],
					[
						-0.10390701703727245,
						48.543352000415325,
						0
					],
					[
						-0.1054450124502182,
						48.54502201080322,
						0
					],
					[
						-0.10680698789656162,
						48.54570798575878,
						0
					],
					[
						-0.10708996094763279,
						48.54598802514374,
						0
					],
					[
						-0.10711804032325745,
						48.54602800682187,
						0
					],
					[
						-0.10760301724076271,
						48.54665698483586,
						0
					],
					[
						-0.10846300050616264,
						48.5470350086689,
						0
					],
					[
						-0.10900799185037613,
						48.54740297421813,
						0
					],
					[
						-0.10956002399325371,
						48.54843998327851,
						0
					],
					[
						-0.11054003611207008,
						48.54940499179065,
						0
					],
					[
						-0.11058999225497246,
						48.54947003535926,
						0
					],
					[
						-0.11100699193775654,
						48.55112303048372,
						0
					],
					[
						-0.11105803772807121,
						48.551214979961514,
						0
					],
					[
						-0.11184995993971825,
						48.55196096934378,
						0
					],
					[
						-0.11228498071432114,
						48.552292976528406,
						0
					],
					[
						-0.11287196539342403,
						48.55308196507394,
						0
					],
					[
						-0.1136880274862051,
						48.553446996957064,
						0
					],
					[
						-0.11542802676558495,
						48.55400498025119,
						0
					],
					[
						-0.11701296083629131,
						48.55509999208152,
						0
					],
					[
						-0.11844802647829056,
						48.55578202754259,
						0
					],
					[
						-0.12079001404345036,
						48.55620699003339,
						0
					],
					[
						-0.12344003655016422,
						48.55711500160396,
						0
					],
					[
						-0.12449003756046295,
						48.55749696493149,
						0
					],
					[
						-0.1263199746608734,
						48.55814002454281,
						0
					],
					[
						-0.12847496196627617,
						48.55867504142225,
						0
					],
					[
						-0.12981497682631016,
						48.559527983888984,
						0
					],
					[
						-0.1305530034005642,
						48.56029300019145,
						0
					],
					[
						-0.13122196309268475,
						48.56077001430094,
						0
					],
					[
						-0.13501997105777264,
						48.562625013291836,
						0
					],
					[
						-0.13564199209213257,
						48.56296297162771,
						0
					],
					[
						-0.13766597025096416,
						48.56446299701929,
						0
					],
					[
						-0.13781298883259296,
						48.56466198340058,
						0
					],
					[
						-0.1381900068372488,
						48.56480497866869,
						0
					],
					[
						-0.1389899756759405,
						48.56543496251106,
						0
					],
					[
						-0.13966698199510574,
						48.56580703519285,
						0
					],
					[
						-0.14076299965381622,
						48.566080033779144,
						0
					],
					[
						-0.1458519883453846,
						48.5667749773711,
						0
					],
					[
						-0.14657090418040752,
						48.56612571515143,
						0
					],
					[
						-0.14869303442537785,
						48.56476197950542,
						0
					],
					[
						-0.1500769704580307,
						48.56377802789211,
						0
					],
					[
						-0.15088196843862534,
						48.563636960461736,
						0
					],
					[
						-0.15210296027362347,
						48.563464963808656,
						0
					],
					[
						-0.1540090050548315,
						48.56214699335396,
						0
					],
					[
						-0.15592804178595543,
						48.5608499776572,
						0
					],
					[
						-0.15709999948740005,
						48.560453010722995,
						0
					],
					[
						-0.1599459908902645,
						48.56000600382686,
						0
					],
					[
						-0.16116497106850147,
						48.55973702855408,
						0
					],
					[
						-0.16216300427913666,
						48.55934500694275,
						0
					],
					[
						-0.16304503194987774,
						48.55882801115513,
						0
					],
					[
						-0.16330202110111713,
						48.55864696204662,
						0
					],
					[
						-0.1639770157635212,
						48.55793198570609,
						0
					],
					[
						-0.17016403377056122,
						48.54769600555301,
						0
					],
					[
						-0.17116298899054527,
						48.54624702595174,
						0
					],
					[
						-0.17244801856577396,
						48.54487298056483,
						0
					],
					[
						-0.1734000351279974,
						48.544084997847676,
						0
					],
					[
						-0.17561201937496662,
						48.54276996105909,
						0
					],
					[
						-0.17727197147905827,
						48.54203503578901,
						0
					],
					[
						-0.17737003974616528,
						48.54199497029185,
						0
					],
					[
						-0.17798501998186111,
						48.54181199334562,
						0
					],
					[
						-0.17929201014339924,
						48.54151301085949,
						0
					],
					[
						-0.18081299029290676,
						48.54148702695966,
						0
					],
					[
						-0.18106997944414616,
						48.541506975889206,
						0
					],
					[
						-0.18226699903607368,
						48.54196798056364,
						0
					],
					[
						-0.1856470014899969,
						48.54218699969351,
						0
					],
					[
						-0.1866680011153221,
						48.542622020468116,
						0
					],
					[
						-0.18775999546051025,
						48.54287498630583,
						0
					],
					[
						-0.1881670206785202,
						48.542919997125864,
						0
					],
					[
						-0.18861201591789722,
						48.54292703792453,
						0
					],
					[
						-0.20605500787496567,
						48.541912995278835,
						0
					],
					[
						-0.20628198981285095,
						48.541936967521906,
						0
					],
					[
						-0.20679596811532974,
						48.54237399995327,
						0
					],
					[
						-0.2115019876509905,
						48.54174896143377,
						0
					],
					[
						-0.212828004732728,
						48.5412809997797,
						0
					],
					[
						-0.2133370377123356,
						48.54170001111925,
						0
					],
					[
						-0.21358296275138855,
						48.54175298474729,
						0
					],
					[
						-0.21614204160869122,
						48.541437992826104,
						0
					],
					[
						-0.21782202646136284,
						48.54168701916933,
						0
					],
					[
						-0.22043298929929733,
						48.54162499308586,
						0
					],
					[
						-0.22174802608788013,
						48.54187301360071,
						0
					],
					[
						-0.22385003976523876,
						48.54310498572886,
						0
					],
					[
						-0.22530203685164452,
						48.54341000318527,
						0
					],
					[
						-0.22757001221179962,
						48.54425800032914,
						0
					],
					[
						-0.22847802378237247,
						48.544897958636284,
						0
					],
					[
						-0.22890298627316952,
						48.54518503881991,
						0
					],
					[
						-0.23026303388178349,
						48.54566800408065,
						0
					],
					[
						-0.2303219586610794,
						48.54567697271705,
						0
					],
					[
						-0.23082696832716465,
						48.5457069799304,
						0
					],
					[
						-0.23167303763329983,
						48.54551201686263,
						0
					],
					[
						-0.23173104040324688,
						48.54546298272908,
						0
					],
					[
						-0.23332703858613968,
						48.54356003925204,
						0
					],
					[
						-0.23414796218276024,
						48.543675038963556,
						0
					],
					[
						-0.23535696789622307,
						48.54397997260094,
						0
					],
					[
						-0.23540801368653774,
						48.54399003088474,
						0
					],
					[
						-0.2362430188804865,
						48.54402498342097,
						0
					],
					[
						-0.23873202502727509,
						48.54183697141707,
						0
					],
					[
						-0.24051804095506668,
						48.540088003501296,
						0
					],
					[
						-0.24054997600615025,
						48.540074005723,
						0
					],
					[
						-0.24058702401816845,
						48.54015899822116,
						0
					],
					[
						-0.24286103434860706,
						48.53926196694374,
						0
					],
					[
						-0.24416500702500343,
						48.53863298892975,
						0
					],
					[
						-0.24680203758180141,
						48.5378999914974,
						0
					],
					[
						-0.24820500053465366,
						48.53706004098058,
						0
					],
					[
						-0.24875502102077007,
						48.536716969683766,
						0
					],
					[
						-0.24982203729450703,
						48.53642796166241,
						0
					],
					[
						-0.25071202777326107,
						48.5364250279963,
						0
					],
					[
						-0.2520719915628433,
						48.5361800249666,
						0
					],
					[
						-0.2535349689424038,
						48.53575196117163,
						0
					],
					[
						-0.25422999635338783,
						48.535575019195676,
						0
					],
					[
						-0.2592420391738415,
						48.53386703878641,
						0
					],
					[
						-0.2608549688011408,
						48.5331819858402,
						0
					],
					[
						-0.26129803620278835,
						48.53299297392368,
						0
					],
					[
						-0.2624369692057371,
						48.532525012269616,
						0
					],
					[
						-0.26391000486910343,
						48.53243297897279,
						0
					],
					[
						-0.26629297994077206,
						48.53261796757579,
						0
					],
					[
						-0.2671520411968231,
						48.53278803639114,
						0
					],
					[
						-0.27326999232172966,
						48.53322297334671,
						0
					],
					[
						-0.27469499967992306,
						48.53354701772332,
						0
					],
					[
						-0.27624296955764294,
						48.53409796021879,
						0
					],
					[
						-0.2823249623179436,
						48.53635302744806,
						0
					],
					[
						-0.28403998352587223,
						48.536734990775585,
						0
					],
					[
						-0.2854349836707115,
						48.536970019340515,
						0
					],
					[
						-0.28924296610057354,
						48.53832000866532,
						0
					],
					[
						-0.2895820140838623,
						48.53839200921357,
						0
					],
					[
						-0.29135202057659626,
						48.53854699060321,
						0
					],
					[
						-0.2932330034673214,
						48.53841698728502,
						0
					],
					[
						-0.29650798067450523,
						48.538949992507696,
						0
					],
					[
						-0.29659297317266464,
						48.53897203691304,
						0
					],
					[
						-0.2966799773275852,
						48.53899500332773,
						0
					],
					[
						-0.29723502695560455,
						48.539204970002174,
						0
					],
					[
						-0.29879498295485973,
						48.540150029584765,
						0
					],
					[
						-0.3003080002963543,
						48.54042202234268,
						0
					],
					[
						-0.30122196301817894,
						48.54140597395599,
						0
					],
					[
						-0.30161197297275066,
						48.5416420083493,
						0
					],
					[
						-0.3018480073660612,
						48.541828002780676,
						0
					],
					[
						-0.30419301241636276,
						48.542126985266805,
						0
					],
					[
						-0.30468796379864216,
						48.54204802773893,
						0
					],
					[
						-0.30525801703333855,
						48.54158501140773,
						0
					],
					[
						-0.3058370389044285,
						48.54123498313129,
						0
					],
					[
						-0.3073629643768072,
						48.541070027276874,
						0
					],
					[
						-0.30786797404289246,
						48.54063299484551,
						0
					],
					[
						-0.3088869620114565,
						48.53977804072201,
						0
					],
					[
						-0.31112702563405037,
						48.53947897441685,
						0
					],
					[
						-0.3138829953968525,
						48.538777995854616,
						0
					],
					[
						-0.31655699014663696,
						48.536928026005626,
						0
					],
					[
						-0.31898598186671734,
						48.53648101910949,
						0
					],
					[
						-0.31915596686303616,
						48.53646299801767,
						0
					],
					[
						-0.32022700645029545,
						48.53677002713084,
						0
					],
					[
						-0.3247320279479027,
						48.537892028689384,
						0
					],
					[
						-0.32557801343500614,
						48.53807802312076,
						0
					],
					[
						-0.3261199872940779,
						48.53825001977384,
						0
					],
					[
						-0.32715498469769955,
						48.53852704167366,
						0
					],
					[
						-0.3296470083296299,
						48.539072033017874,
						0
					],
					[
						-0.3309669904410839,
						48.539505964145064,
						0
					],
					[
						-0.3319220244884491,
						48.53966597467661,
						0
					],
					[
						-0.3342879842966795,
						48.540126979351044,
						0
					],
					[
						-0.33868303522467613,
						48.54127697646618,
						0
					],
					[
						-0.34338301979005337,
						48.54241297580302,
						0
					],
					[
						-0.3529150038957596,
						48.544747000560164,
						0
					],
					[
						-0.35450203344225883,
						48.54513801634312,
						0
					],
					[
						-0.3559289686381817,
						48.545435993000865,
						0
					],
					[
						-0.3569549974054098,
						48.54561796411872,
						0
					],
					[
						-0.3587469644844532,
						48.546123979613185,
						0
					],
					[
						-0.35914200358092785,
						48.54626202955842,
						0
					],
					[
						-0.35972999408841133,
						48.546358002349734,
						0
					],
					[
						-0.35998002626001835,
						48.54640795849264,
						0
					],
					[
						-0.36199302412569523,
						48.546876003965735,
						0
					],
					[
						-0.36283498629927635,
						48.547048000618815,
						0
					],
					[
						-0.36633996292948723,
						48.547949977219105,
						0
					],
					[
						-0.3669779933989048,
						48.54826698079705,
						0
					],
					[
						-0.3672219906002283,
						48.54835297912359,
						0
					],
					[
						-0.36844801157712936,
						48.54852698743343,
						0
					],
					[
						-0.37354303523898125,
						48.5497219953686,
						0
					],
					[
						-0.37377999164164066,
						48.549777986481786,
						0
					],
					[
						-0.37458800710737705,
						48.550055008381605,
						0
					],
					[
						-0.37549199536442757,
						48.55058298446238,
						0
					],
					[
						-0.3763450216501951,
						48.55103703215718,
						0
					],
					[
						-0.38595504127442837,
						48.55634302832186,
						0
					],
					[
						-0.3905879706144333,
						48.558862041682005,
						0
					],
					[
						-0.39458303712308407,
						48.5610069707036,
						0
					],
					[
						-0.3951550181955099,
						48.56128701008856,
						0
					],
					[
						-0.3954870253801346,
						48.561484990641475,
						0
					],
					[
						-0.39557998068630695,
						48.56148197315633,
						0
					],
					[
						-0.39565499871969223,
						48.5614750161767,
						0
					],
					[
						-0.3959129936993122,
						48.56147099286318,
						0
					],
					[
						-0.39597200229763985,
						48.561462024226785,
						0
					],
					[
						-0.39611902087926865,
						48.56140896677971,
						0
					],
					[
						-0.3962070308625698,
						48.56136102229357,
						0
					],
					[
						-0.3974069841206074,
						48.56109003536403,
						0
					],
					[
						-0.39758501574397087,
						48.5609329584986,
						0
					],
					[
						-0.3979669790714979,
						48.560369024053216,
						0
					],
					[
						-0.3980300109833479,
						48.56030699796975,
						0
					],
					[
						-0.39806898683309555,
						48.56008001603186,
						0
					],
					[
						-0.3983360342681408,
						48.559574000537395,
						0
					],
					[
						-0.4001040291041136,
						48.55899900197983,
						0
					],
					[
						-0.4004519619047642,
						48.558500027284026,
						0
					],
					[
						-0.4004569910466671,
						48.55846599675715,
						0
					],
					[
						-0.40137799456715584,
						48.558153016492724,
						0
					],
					[
						-0.4025470186024904,
						48.55780499987304,
						0
					],
					[
						-0.40333500131964684,
						48.55757801793516,
						0
					],
					[
						-0.4044819809496403,
						48.557188007980585,
						0
					],
					[
						-0.4048729967325926,
						48.55704199522734,
						0
					],
					[
						-0.40620303712785244,
						48.55670303106308,
						0
					],
					[
						-0.4078380111604929,
						48.55655500665307,
						0
					],
					[
						-0.409597959369421,
						48.55668702162802,
						0
					],
					[
						-0.4133659601211548,
						48.5571320168674,
						0
					],
					[
						-0.4136399645358324,
						48.557275012135506,
						0
					],
					[
						-0.41407196782529354,
						48.557232012972236,
						0
					],
					[
						-0.4144720360636711,
						48.557209968566895,
						0
					],
					[
						-0.4158119671046734,
						48.55702598579228,
						0
					],
					[
						-0.4163070023059845,
						48.55690302327275,
						0
					],
					[
						-0.4174239747226238,
						48.55704300105572,
						0
					],
					[
						-0.41816200129687786,
						48.557491013780236,
						0
					],
					[
						-0.42563396506011486,
						48.56097402982414,
						0
					],
					[
						-0.43050896376371384,
						48.56304896995425,
						0
					],
					[
						-0.4882420040667057,
						48.58706697821617,
						0
					],
					[
						-0.49057502299547195,
						48.58768103644252,
						0
					],
					[
						-0.5207860004156828,
						48.58166500926018,
						0
					],
					[
						-0.5237299762666225,
						48.581337025389075,
						0
					],
					[
						-0.5245809908956289,
						48.580909967422485,
						0
					],
					[
						-0.5428200121968985,
						48.57732796110213,
						0
					],
					[
						-0.5430820304900408,
						48.57725101523101,
						0
					],
					[
						-0.5426279827952385,
						48.57641198672354,
						0
					],
					[
						-0.5432899855077267,
						48.576247030869126,
						0
					],
					[
						-0.5452980380505323,
						48.57593296095729,
						0
					],
					[
						-0.547107020393014,
						48.575922986492515,
						0
					],
					[
						-0.5499179754406214,
						48.57585199177265,
						0
					],
					[
						-0.5512900091707706,
						48.5760619584471,
						0
					],
					[
						-0.5522100068628788,
						48.57630302198231,
						0
					],
					[
						-0.5525769665837288,
						48.57626496814191,
						0
					],
					[
						-0.5543830152601004,
						48.57540297321975,
						0
					],
					[
						-0.5556879937648773,
						48.57406002469361,
						0
					],
					[
						-0.5579070188105106,
						48.57301002368331,
						0
					],
					[
						-0.5590769648551941,
						48.572271997109056,
						0
					],
					[
						-0.5596640333533287,
						48.57204996049404,
						0
					],
					[
						-0.5604049935936928,
						48.572868034243584,
						0
					],
					[
						-0.5613270029425621,
						48.57435196638107,
						0
					],
					[
						-0.5625449772924185,
						48.57476502656937,
						0
					],
					[
						-0.5635000113397837,
						48.5750550404191,
						0
					],
					[
						-0.5648550298064947,
						48.57630503363907,
						0
					],
					[
						-0.5656270030885935,
						48.57663796283305,
						0
					],
					[
						-0.5663900077342987,
						48.576933005824685,
						0
					],
					[
						-0.5671069957315922,
						48.57750800438225,
						0
					],
					[
						-0.5678300186991692,
						48.577747978270054,
						0
					],
					[
						-0.5694150365889072,
						48.578073028475046,
						0
					],
					[
						-0.5717120133340359,
						48.5781669896096,
						0
					],
					[
						-0.5736670084297657,
						48.57848499901593,
						0
					],
					[
						-0.5740349739789963,
						48.57850695960224,
						0
					],
					[
						-0.5756220035254955,
						48.57866001315415,
						0
					],
					[
						-0.5787630379199982,
						48.579384963959455,
						0
					],
					[
						-0.5795920081436634,
						48.57950197532773,
						0
					],
					[
						-0.5824899673461914,
						48.580157021060586,
						0
					],
					[
						-0.5840370152145624,
						48.58021502383053,
						0
					],
					[
						-0.5854379665106535,
						48.580566979944706,
						0
					],
					[
						-0.5867029633373022,
						48.580672005191445,
						0
					],
					[
						-0.5867700185626745,
						48.58067703433335,
						0
					],
					[
						-0.5870470404624939,
						48.580694971606135,
						0
					],
					[
						-0.5889319628477097,
						48.58119503594935,
						0
					],
					[
						-0.5945080239325762,
						48.581915041431785,
						0
					],
					[
						-0.5972670111805201,
						48.58201302587986,
						0
					],
					[
						-0.5987399630248547,
						48.58235701918602,
						0
					],
					[
						-0.6001870147883892,
						48.58298197388649,
						0
					],
					[
						-0.6014169752597809,
						48.5832320060581,
						0
					],
					[
						-0.6015029735863209,
						48.583252960816026,
						0
					],
					[
						-0.602364968508482,
						48.58374196104705,
						0
					],
					[
						-0.6035999581217766,
						48.58441703952849,
						0
					],
					[
						-0.6047829799354076,
						48.584842002019286,
						0
					],
					[
						-0.6080250162631273,
						48.58558296225965,
						0
					],
					[
						-0.6115579884499311,
						48.58647999353707,
						0
					],
					[
						-0.6121800094842911,
						48.586643021553755,
						0
					],
					[
						-0.6139230262488127,
						48.587048035115004,
						0
					],
					[
						-0.6161129660904408,
						48.58712003566325,
						0
					],
					[
						-0.6174330320209265,
						48.58742798678577,
						0
					],
					[
						-0.6192300282418728,
						48.58727199956775,
						0
					],
					[
						-0.6205410417169333,
						48.58731902204454,
						0
					],
					[
						-0.6205940153449774,
						48.58730301260948,
						0
					],
					[
						-0.6205840408802032,
						48.58727996237576,
						0
					],
					[
						-0.6262892670929432,
						48.58767977915704,
						0
					],
					[
						-0.6271940097212791,
						48.58855493366718,
						0
					],
					[
						-0.6279052142053843,
						48.58954424969852,
						0
					],
					[
						-0.6291237752884626,
						48.58996971510351,
						0
					],
					[
						-0.6297198962420225,
						48.59059584327042,
						0
					],
					[
						-0.6315032299607992,
						48.58999050222337,
						0
					],
					[
						-0.6317124422639608,
						48.58966536819935,
						0
					],
					[
						-0.6322793941944838,
						48.589756563305855,
						0
					],
					[
						-0.6327165104448795,
						48.58927787281573,
						0
					],
					[
						-0.6348449271172285,
						48.58967567794025,
						0
					],
					[
						-0.6354846339672804,
						48.589560594409704,
						0
					],
					[
						-0.6364086549729109,
						48.589744912460446,
						0
					],
					[
						-0.6362046394497156,
						48.59040901064873,
						0
					],
					[
						-0.6370570790022612,
						48.59068921767175,
						0
					],
					[
						-0.6390512175858021,
						48.59178557060659,
						0
					],
					[
						-0.6401023920625448,
						48.59217910096049,
						0
					],
					[
						-0.640890458598733,
						48.592280354350805,
						0
					],
					[
						-0.6414808798581362,
						48.59220298938453,
						0
					],
					[
						-0.6417637690901756,
						48.59203132800758,
						0
					],
					[
						-0.642631882801652,
						48.59213509596884,
						0
					],
					[
						-0.6429927237331867,
						48.59244296327233,
						0
					],
					[
						-0.6435784511268139,
						48.592633148655295,
						0
					],
					[
						-0.6481436546891928,
						48.5932941455394,
						0
					],
					[
						-0.6481536291539669,
						48.59346387907863,
						0
					],
					[
						-0.6486228480935097,
						48.593764286488295,
						0
					],
					[
						-0.6499222107231617,
						48.59406067058444,
						0
					],
					[
						-0.650986460968852,
						48.59406762756407,
						0
					],
					[
						-0.6513116788119078,
						48.59394843690097,
						0
					],
					[
						-0.6513397581875324,
						48.59357837587595,
						0
					],
					[
						-0.6506593991070986,
						48.59319004230201,
						0
					],
					[
						-0.6505704671144485,
						48.593027517199516,
						0
					],
					[
						-0.6509650871157646,
						48.592296028509736,
						0
					],
					[
						-0.6518744397908449,
						48.59256559051573,
						0
					],
					[
						-0.6531370058655739,
						48.592766001820564,
						0
					],
					[
						-0.6541529763489962,
						48.592379009351134,
						0
					],
					[
						-0.6546490173786879,
						48.59207198023796,
						0
					],
					[
						-0.6547484267503023,
						48.593492209911346,
						0
					],
					[
						-0.6553603895008564,
						48.593983640894294,
						0
					],
					[
						-0.6560668163001537,
						48.59410316683352,
						0
					],
					[
						-0.6562277488410473,
						48.5940835531801,
						0
					],
					[
						-0.65732192248106,
						48.59275074675679,
						0
					],
					[
						-0.6593544501811266,
						48.59101845882833,
						0
					],
					[
						-0.6599736213684082,
						48.59062325209379,
						0
					],
					[
						-0.6646486278623343,
						48.58867948874831,
						0
					],
					[
						-0.6661390978842974,
						48.5879011452198,
						0
					],
					[
						-0.6711490452289581,
						48.5826532356441,
						0
					],
					[
						-0.6730108335614204,
						48.581165531650186,
						0
					],
					[
						-0.6757930386811495,
						48.57928102836013,
						0
					],
					[
						-0.6761650275439024,
						48.579165022820234,
						0
					],
					[
						-0.6802200246602297,
						48.5769650246948,
						0
					],
					[
						-0.6859750393778086,
						48.573906971141696,
						0
					],
					[
						-0.6879600416868925,
						48.57330699451268,
						0
					],
					[
						-0.6895479932427406,
						48.57319098897278,
						0
					],
					[
						-0.6929829809814692,
						48.573965979740024,
						0
					],
					[
						-0.6952920276671648,
						48.574527986347675,
						0
					],
					[
						-0.6970730144530535,
						48.57464700937271,
						0
					],
					[
						-0.7251529768109322,
						48.573515033349395,
						0
					],
					[
						-0.7269420102238655,
						48.57331001199782,
						0
					],
					[
						-0.7285869587212801,
						48.57294699177146,
						0
					],
					[
						-0.7289680000394583,
						48.57288303785026,
						0
					],
					[
						-0.7326469849795103,
						48.57175801880658,
						0
					],
					[
						-0.7330250088125467,
						48.571455013006926,
						0
					],
					[
						-0.7338180206716061,
						48.571474039927125,
						0
					],
					[
						-0.7402109820395708,
						48.56959003955126,
						0
					],
					[
						-0.7432019803673029,
						48.5692270193249,
						0
					],
					[
						-0.7520149648189545,
						48.56944997794926,
						0
					],
					[
						-0.7585980277508497,
						48.569652987644076,
						0
					],
					[
						-0.759935025125742,
						48.569887010380626,
						0
					],
					[
						-0.7612430211156607,
						48.57041699811816,
						0
					],
					[
						-0.764696029946208,
						48.57307397760451,
						0
					],
					[
						-0.7665249612182379,
						48.57402699999511,
						0
					],
					[
						-0.7680730149149895,
						48.57442203909159,
						0
					],
					[
						-0.7706620171666145,
						48.57477801851928,
						0
					],
					[
						-0.7708210218697786,
						48.57483400963247,
						0
					],
					[
						-0.7718489784747362,
						48.574827974662185,
						0
					],
					[
						-0.7722669839859009,
						48.57495998963714,
						0
					],
					[
						-0.7737479824572802,
						48.57475496828556,
						0
					],
					[
						-0.7757220044732094,
						48.57423302717507,
						0
					],
					[
						-0.7784949894994497,
						48.57305796816945,
						0
					],
					[
						-0.7799429632723331,
						48.57261096127331,
						0
					],
					[
						-0.7821210008114576,
						48.57228398323059,
						0
					],
					[
						-0.7839449867606163,
						48.572311978787184,
						0
					],
					[
						-0.785983968526125,
						48.57261096127331,
						0
					],
					[
						-0.7923569809645414,
						48.57352601364255,
						0
					],
					[
						-0.7979679945856333,
						48.57435003854334,
						0
					],
					[
						-0.8007040154188871,
						48.57455598190427,
						0
					],
					[
						-0.8030750043690205,
						48.57439203187823,
						0
					],
					[
						-0.8056709636002779,
						48.57385299168527,
						0
					],
					[
						-0.8096839673817158,
						48.572957972064614,
						0
					],
					[
						-0.8117220271378756,
						48.57286602258682,
						0
					],
					[
						-0.8148870337754488,
						48.57331998646259,
						0
					],
					[
						-0.8173870202153921,
						48.57359700836241,
						0
					],
					[
						-0.8185670245438814,
						48.57357596978545,
						0
					],
					[
						-0.8201009966433048,
						48.573427023366094,
						0
					],
					[
						-0.8210889715701342,
						48.57324899174273,
						0
					],
					[
						-0.8262600190937519,
						48.57204300351441,
						0
					],
					[
						-0.8279759623110294,
						48.57206395827234,
						0
					],
					[
						-0.8296290412545204,
						48.572462014853954,
						0
					],
					[
						-0.830722963437438,
						48.57292997650802,
						0
					],
					[
						-0.8378260396420956,
						48.57574101537466,
						0
					],
					[
						-0.8387909643352032,
						48.57616698369384,
						0
					],
					[
						-0.8395740017294884,
						48.576698983088136,
						0
					],
					[
						-0.840421998873353,
						48.57745201326907,
						0
					],
					[
						-0.8442309871315956,
						48.58369099907577,
						0
					],
					[
						-0.8451099973171949,
						48.58463496901095,
						0
					],
					[
						-0.845721960067749,
						48.58512396924198,
						0
					],
					[
						-0.8486080169677734,
						48.58679900877178,
						0
					],
					[
						-0.8553029783070087,
						48.59110001474619,
						0
					],
					[
						-0.856396984308958,
						48.59173201024532,
						0
					],
					[
						-0.8570090308785439,
						48.592014983296394,
						0
					],
					[
						-0.8587679732590914,
						48.59246199019253,
						0
					],
					[
						-0.8597230073064566,
						48.59258302487433,
						0
					],
					[
						-0.8658599853515625,
						48.59241999685764,
						0
					],
					[
						-0.8697439916431904,
						48.59285996295512,
						0
					],
					[
						-0.870913015678525,
						48.59307303093374,
						0
					],
					[
						-0.8727159630507231,
						48.5937399789691,
						0
					],
					[
						-0.8740569837391376,
						48.594655031338334,
						0
					],
					[
						-0.874528968706727,
						48.59515903517604,
						0
					],
					[
						-0.875279987230897,
						48.596741035580635,
						0
					],
					[
						-0.8754730224609375,
						48.5978480335325,
						0
					],
					[
						-0.8761060237884521,
						48.60007602721453,
						0
					],
					[
						-0.8770179748535156,
						48.60172198154032,
						0
					],
					[
						-0.8785630110651255,
						48.60443897545338,
						0
					],
					[
						-0.8792499918490648,
						48.60518395900726,
						0
					],
					[
						-0.8797969948500395,
						48.60577303916216,
						0
					],
					[
						-0.87999003008008,
						48.60600697807968,
						0
					],
					[
						-0.8817710168659687,
						48.60704298131168,
						0
					],
					[
						-0.8856329787522554,
						48.608561027795076,
						0
					],
					[
						-0.8887119870632887,
						48.609631983563304,
						0
					],
					[
						-0.8896240219473839,
						48.60986600629985,
						0
					],
					[
						-0.9011789783835411,
						48.61164003610611,
						0
					],
					[
						-0.9039259795099497,
						48.61225702799857,
						0
					],
					[
						-0.9049990307539701,
						48.612639997154474,
						0
					],
					[
						-0.9155990369617939,
						48.61729295924306,
						0
					],
					[
						-0.9168109763413668,
						48.61811597831547,
						0
					],
					[
						-0.9173800237476826,
						48.61878200434148,
						0
					],
					[
						-0.9185059648007154,
						48.62081101164222,
						0
					],
					[
						-0.91997598297894,
						48.623597994446754,
						0
					],
					[
						-0.9209099784493446,
						48.624717984348536,
						0
					],
					[
						-0.9217569697648287,
						48.62545601092279,
						0
					],
					[
						-0.923065971583128,
						48.6262790299952,
						0
					],
					[
						-0.9250079747289419,
						48.627100959420204,
						0
					],
					[
						-0.9345670323818922,
						48.63039898686111,
						0
					],
					[
						-0.9395349863916636,
						48.632277958095074,
						0
					],
					[
						-0.9435049910098314,
						48.63340498879552,
						0
					],
					[
						-0.9453070163726807,
						48.63356097601354,
						0
					],
					[
						-0.9462619666010141,
						48.63353298045695,
						0
					],
					[
						-0.9482570271939039,
						48.6331279668957,
						0
					],
					[
						-0.9499199967831373,
						48.63243402913213,
						0
					],
					[
						-0.9509069658815861,
						48.63173196092248,
						0
					],
					[
						-0.9565940033644438,
						48.62782398238778,
						0
					],
					[
						-0.958482027053833,
						48.626845981925726,
						0
					],
					[
						-0.9602309949696064,
						48.626392018049955,
						0
					],
					[
						-0.9690836258232594,
						48.62537923268974,
						0
					],
					[
						-0.9727730043232441,
						48.62502300180495,
						0
					],
					[
						-0.9748649597167969,
						48.624584041535854,
						0
					],
					[
						-0.9815809596329927,
						48.62200199626386,
						0
					],
					[
						-0.9831480402499437,
						48.62163302488625,
						0
					],
					[
						-0.992631996050477,
						48.62028596922755,
						0
					],
					[
						-1.0003349650651217,
						48.619023989886045,
						0
					],
					[
						-1.0019659996032715,
						48.61838503740728,
						0
					],
					[
						-1.007008971646428,
						48.615008974447846,
						0
					],
					[
						-1.008875034749508,
						48.6138319876045,
						0
					],
					[
						-1.009797966107726,
						48.613392021507025,
						0
					],
					[
						-1.011386001482606,
						48.61283898353577,
						0
					],
					[
						-1.0139500256627798,
						48.61233497969806,
						0
					],
					[
						-1.0189550276845694,
						48.61205100081861,
						0
					],
					[
						-1.0225709807127714,
						48.6110760178417,
						0
					],
					[
						-1.0276879649609327,
						48.60887702554464,
						0
					],
					[
						-1.0354559775441885,
						48.60570900142193,
						0
					],
					[
						-1.0379609931260347,
						48.605247996747494,
						0
					],
					[
						-1.0392379760742188,
						48.60513500869274,
						0
					],
					[
						-1.0424619913101196,
						48.60465598292649,
						0
					],
					[
						-1.0438730008900166,
						48.60429002903402,
						0
					],
					[
						-1.0461849812418222,
						48.60337497666478,
						0
					],
					[
						-1.0788599867373705,
						48.58620297163725,
						0
					],
					[
						-1.0805119760334492,
						48.58552202582359,
						0
					],
					[
						-1.0818209778517485,
						48.58525900170207,
						0
					],
					[
						-1.084094988182187,
						48.58518096618354,
						0
					],
					[
						-1.0858329758048058,
						48.58564297668636,
						0
					],
					[
						-1.086251987144351,
						48.58540803194046,
						0
					],
					[
						-1.088687013834715,
						48.58592603355646,
						0
					],
					[
						-1.0905430186539888,
						48.58613901771605,
						0
					],
					[
						-1.0922489874064922,
						48.58619601465762,
						0
					],
					[
						-1.1060999985784292,
						48.585806004703045,
						0
					],
					[
						-1.1084389686584473,
						48.58627396635711,
						0
					],
					[
						-1.1098550073802471,
						48.586899004876614,
						0
					],
					[
						-1.1110139731317759,
						48.58777902089059,
						0
					],
					[
						-1.1279650311917067,
						48.604113003239036,
						0
					],
					[
						-1.1295099835842848,
						48.60513500869274,
						0
					],
					[
						-1.1305400356650352,
						48.6056449636817,
						0
					],
					[
						-1.1332870367914438,
						48.60659597441554,
						0
					],
					[
						-1.1359689943492413,
						48.607291001826525,
						0
					],
					[
						-1.140690017491579,
						48.60863897949457,
						0
					],
					[
						-1.1421280167996883,
						48.60919201746583,
						0
					],
					[
						-1.1441229935735464,
						48.61035601235926,
						0
					],
					[
						-1.145860981196165,
						48.6117319855839,
						0
					],
					[
						-1.1478350032120943,
						48.61302296631038,
						0
					],
					[
						-1.1500350013375282,
						48.61444202251732,
						0
					],
					[
						-1.149873984977603,
						48.614513017237186,
						0
					],
					[
						-1.149916984140873,
						48.61484200693667,
						0
					],
					[
						-1.1505929846316576,
						48.615327989682555,
						0
					],
					[
						-1.1537579912692308,
						48.61776796169579,
						0
					],
					[
						-1.15547401830554,
						48.61864102073014,
						0
					],
					[
						-1.1573619581758976,
						48.619406037032604,
						0
					],
					[
						-1.1591010354459286,
						48.619903000071645,
						0
					],
					[
						-1.1664180178195238,
						48.62092399969697,
						0
					],
					[
						-1.1697860341519117,
						48.621534034609795,
						0
					],
					[
						-1.1720400117337704,
						48.62233601510525,
						0
					],
					[
						-1.1735950224101543,
						48.62327202223241,
						0
					],
					[
						-1.1748499609529972,
						48.62431397661567,
						0
					],
					[
						-1.1755800247192383,
						48.62519399262965,
						0
					],
					[
						-1.1781980283558369,
						48.629532968625426,
						0
					],
					[
						-1.179398987442255,
						48.6309729795903,
						0
					],
					[
						-1.1804400198161602,
						48.631851989775896,
						0
					],
					[
						-1.1844640038907528,
						48.63441199064255,
						0
					],
					[
						-1.1859979759901762,
						48.63529804162681,
						0
					],
					[
						-1.1877470277249813,
						48.63600002601743,
						0
					],
					[
						-1.1896349675953388,
						48.63651802763343,
						0
					],
					[
						-1.1933039780706167,
						48.63722696900368,
						0
					],
					[
						-1.1947630159556866,
						48.637303998693824,
						0
					],
					[
						-1.198046039789915,
						48.637219006195664,
						0
					],
					[
						-1.2024450302124023,
						48.63673696294427,
						0
					],
					[
						-1.2089470401406288,
						48.636014023795724,
						0
					],
					[
						-1.2115859985351562,
						48.63611301407218,
						0
					],
					[
						-1.213260032236576,
						48.63636899739504,
						0
					],
					[
						-1.2223790399730206,
						48.639261005446315,
						0
					],
					[
						-1.2243750225752592,
						48.64002702757716,
						0
					],
					[
						-1.230962025001645,
						48.643599981442094,
						0
					],
					[
						-1.2326150201261044,
						48.644224014133215,
						0
					],
					[
						-1.2339019775390625,
						48.644549986347556,
						0
					],
					[
						-1.237399997189641,
						48.644847963005304,
						0
					],
					[
						-1.2435359694063663,
						48.64527300931513,
						0
					],
					[
						-1.2465829588472843,
						48.64521601237357,
						0
					],
					[
						-1.2474850192666054,
						48.64507402293384,
						0
					],
					[
						-1.2558319699019194,
						48.64313201978803,
						0
					],
					[
						-1.2590070348232985,
						48.64221001043916,
						0
					],
					[
						-1.2605949863791466,
						48.64127500914037,
						0
					],
					[
						-1.264973022043705,
						48.636793959885836,
						0
					],
					[
						-1.2661309819668531,
						48.635375993326306,
						0
					],
					[
						-1.2671610340476036,
						48.63302201963961,
						0
					],
					[
						-1.2677839770913124,
						48.63207897171378,
						0
					],
					[
						-1.268556034192443,
						48.631419986486435,
						0
					],
					[
						-1.2728260271251202,
						48.62919299863279,
						0
					],
					[
						-1.2741989828646183,
						48.628711039200425,
						0
					],
					[
						-1.2785879988223314,
						48.62713700160384,
						0
					],
					[
						-1.2814090121537447,
						48.625405970960855,
						0
					],
					[
						-1.2827070336788893,
						48.62479601986706,
						0
					],
					[
						-1.2852500192821026,
						48.624200988560915,
						0
					],
					[
						-1.2911620270460844,
						48.623385010287166,
						0
					],
					[
						-1.2938869837671518,
						48.623597994446754,
						0
					],
					[
						-1.2988970149308443,
						48.6247110273689,
						0
					],
					[
						-1.3162140268832445,
						48.62848397344351,
						0
					],
					[
						-1.333507988601923,
						48.63211803138256,
						0
					],
					[
						-1.335449991747737,
						48.63242296501994,
						0
					],
					[
						-1.3369790185242891,
						48.632408967241645,
						0
					],
					[
						-1.3410510309040546,
						48.632019041106105,
						0
					],
					[
						-1.3428750168532133,
						48.632189026102424,
						0
					],
					[
						-1.3444249983876944,
						48.632621029391885,
						0
					],
					[
						-1.3451539725065231,
						48.6328240390867,
						0
					],
					[
						-1.345497965812683,
						48.6320470366627,
						0
					],
					[
						-1.346785007044673,
						48.63134899176657,
						0
					],
					[
						-1.3486089929938316,
						48.631054032593966,
						0
					],
					[
						-1.3505329750478268,
						48.6304650362581,
						0
					],
					[
						-1.3506260141730309,
						48.630796037614346,
						0
					],
					[
						-1.3507280219346285,
						48.63119803369045,
						0
					],
					[
						-1.3523319829255342,
						48.6312370095402,
						0
					],
					[
						-1.353230020031333,
						48.63161796703935,
						0
					],
					[
						-1.3536669686436653,
						48.631847966462374,
						0
					],
					[
						-1.359361968934536,
						48.63194704055786,
						0
					],
					[
						-1.3602299988269806,
						48.63213496282697,
						0
					],
					[
						-1.3621829822659492,
						48.63261197693646,
						0
					],
					[
						-1.363217979669571,
						48.63267702050507,
						0
					],
					[
						-1.363597009330988,
						48.632689006626606,
						0
					],
					[
						-1.3646380417048931,
						48.63274499773979,
						0
					],
					[
						-1.3667279854416847,
						48.63346701487899,
						0
					],
					[
						-1.3682779669761658,
						48.63379701040685,
						0
					],
					[
						-1.3690520357340574,
						48.63407696597278,
						0
					],
					[
						-1.3726949784904718,
						48.63602198660374,
						0
					],
					[
						-1.374552994966507,
						48.63727801479399,
						0
					],
					[
						-1.3768369797617197,
						48.637607004493475,
						0
					],
					[
						-1.3784649968147278,
						48.638832019641995,
						0
					],
					[
						-1.3793279975652695,
						48.639086997136474,
						0
					],
					[
						-1.3794719986617565,
						48.63915799185634,
						0
					],
					[
						-1.3804380130022764,
						48.63981496542692,
						0
					],
					[
						-1.384231997653842,
						48.640312012284994,
						0
					],
					[
						-1.3847130350768566,
						48.6406069714576,
						0
					],
					[
						-1.3848599698394537,
						48.64090503193438,
						0
					],
					[
						-1.3863900024443865,
						48.64212996326387,
						0
					],
					[
						-1.3878649659454823,
						48.64300696179271,
						0
					],
					[
						-1.3884149864315987,
						48.64346302114427,
						0
					],
					[
						-1.3885019905865192,
						48.64359201863408,
						0
					],
					[
						-1.388901975005865,
						48.64408001303673,
						0
					],
					[
						-1.3897450268268585,
						48.64432300440967,
						0
					],
					[
						-1.3920219708234072,
						48.644547974690795,
						0
					],
					[
						-1.3939219806343317,
						48.64442702382803,
						0
					],
					[
						-1.3945999927818775,
						48.644223008304834,
						0
					],
					[
						-1.3951869774609804,
						48.64406500943005,
						0
					],
					[
						-1.3963870145380497,
						48.643408035859466,
						0
					],
					[
						-1.3979870360344648,
						48.641432002186775,
						0
					],
					[
						-1.3997429609298706,
						48.640528013929725,
						0
					],
					[
						-1.404227027669549,
						48.63955797627568,
						0
					],
					[
						-1.4085879642516375,
						48.639048021286726,
						0
					],
					[
						-1.4158369693905115,
						48.637650003656745,
						0
					],
					[
						-1.4180069603025913,
						48.637542966753244,
						0
					],
					[
						-1.4193599671125412,
						48.6376800108701,
						0
					],
					[
						-1.4201150089502335,
						48.6379250138998,
						0
					],
					[
						-1.4209500141441822,
						48.638443015515804,
						0
					],
					[
						-1.421089991927147,
						48.63860302604735,
						0
					],
					[
						-1.4219030365347862,
						48.64006499759853,
						0
					],
					[
						-1.4219150226563215,
						48.64006499759853,
						0
					],
					[
						-1.4223730098456144,
						48.63971798680723,
						0
					],
					[
						-1.4234830252826214,
						48.63890200853348,
						0
					],
					[
						-1.4246350340545177,
						48.63866496831179,
						0
					],
					[
						-1.4255279581993818,
						48.63781303167343,
						0
					],
					[
						-1.426053000614047,
						48.63744297064841,
						0
					],
					[
						-1.426032967865467,
						48.63623698242009,
						0
					],
					[
						-1.426819022744894,
						48.63521698862314,
						0
					],
					[
						-1.427785037085414,
						48.634512992575765,
						0
					],
					[
						-1.4278169721364975,
						48.634428000077605,
						0
					],
					[
						-1.4260349795222282,
						48.63349199295044,
						0
					],
					[
						-1.4253269601613283,
						48.633265011012554,
						0
					],
					[
						-1.4241079799830914,
						48.63301497884095,
						0
					],
					[
						-1.421112036332488,
						48.63280702382326,
						0
					],
					[
						-1.4183750096708536,
						48.632066985592246,
						0
					],
					[
						-1.4130029641091824,
						48.6301870085299,
						0
					],
					[
						-1.4119330141693354,
						48.629531962797046,
						0
					],
					[
						-1.4117730036377907,
						48.62928000278771,
						0
					],
					[
						-1.4114600233733654,
						48.62876300700009,
						0
					],
					[
						-1.4117210358381271,
						48.62857399508357,
						0
					],
					[
						-1.4116720017045736,
						48.62842303700745,
						0
					],
					[
						-1.4109649881720543,
						48.62835296429694,
						0
					],
					[
						-1.4102400373667479,
						48.627661960199475,
						0
					],
					[
						-1.4098500274121761,
						48.62698000855744,
						0
					],
					[
						-1.4062769897282124,
						48.624801971018314,
						0
					],
					[
						-1.4061100222170353,
						48.624523021280766,
						0
					],
					[
						-1.4063850324600935,
						48.622708003968,
						0
					],
					[
						-1.406437000259757,
						48.62216301262379,
						0
					],
					[
						-1.4061299711465836,
						48.62163000740111,
						0
					],
					[
						-1.4032770227640867,
						48.61717997118831,
						0
					],
					[
						-1.4036999735981226,
						48.6161719635129,
						0
					],
					[
						-1.4034119714051485,
						48.61591698601842,
						0
					],
					[
						-1.4034979697316885,
						48.61553502269089,
						0
					],
					[
						-1.4044970087707043,
						48.61392301507294,
						0
					],
					[
						-1.4070249907672405,
						48.612360041588545,
						0
					],
					[
						-1.4078500214964151,
						48.6120100133121,
						0
					],
					[
						-1.4090750366449356,
						48.61155697144568,
						0
					],
					[
						-1.4096460118889809,
						48.60979098826647,
						0
					],
					[
						-1.4096900168806314,
						48.6096700374037,
						0
					],
					[
						-1.4138799626380205,
						48.60961798578501,
						0
					],
					[
						-1.417964966967702,
						48.61027495935559,
						0
					],
					[
						-1.4228739961981773,
						48.609546991065145,
						0
					],
					[
						-1.424454990774393,
						48.609314979985356,
						0
					],
					[
						-1.424675015732646,
						48.60954497940838,
						0
					],
					[
						-1.4247949607670307,
						48.609697027131915,
						0
					],
					[
						-1.4268880058079958,
						48.60998997464776,
						0
					],
					[
						-1.4289470203220844,
						48.610706962645054,
						0
					],
					[
						-1.4291969686746597,
						48.61076203174889,
						0
					],
					[
						-1.4311119820922613,
						48.61118800006807,
						0
					],
					[
						-1.433388004079461,
						48.61240002326667,
						0
					],
					[
						-1.4336520340293646,
						48.612487027421594,
						0
					],
					[
						-1.4341629948467016,
						48.61265701241791,
						0
					],
					[
						-1.4390379935503006,
						48.614642014726996,
						0
					],
					[
						-1.4432000275701284,
						48.61585697159171,
						0
					],
					[
						-1.4476450346410275,
						48.61754500307143,
						0
					],
					[
						-1.4478550013154745,
						48.61761700361967,
						0
					],
					[
						-1.4491149690002203,
						48.61787801608443,
						0
					],
					[
						-1.4494580402970314,
						48.61735297366977,
						0
					],
					[
						-1.4512220118194818,
						48.61579201184213,
						0
					],
					[
						-1.4522570092231035,
						48.61503797583282,
						0
					],
					[
						-1.4516520034521818,
						48.61424496397376,
						0
					],
					[
						-1.4514169748872519,
						48.613481959328055,
						0
					],
					[
						-1.4517369959503412,
						48.60975000075996,
						0
					],
					[
						-1.4515950065106153,
						48.609502986073494,
						0
					],
					[
						-1.4509749971330166,
						48.60921800136566,
						0
					],
					[
						-1.4510100334882736,
						48.60912303440273,
						0
					],
					[
						-1.45106703042984,
						48.60827696509659,
						0
					],
					[
						-1.4532050024718046,
						48.60858500003815,
						0
					],
					[
						-1.4540820010006428,
						48.60887995921075,
						0
					],
					[
						-1.4554879814386368,
						48.609589990228415,
						0
					],
					[
						-1.4566900301724672,
						48.6100120190531,
						0
					],
					[
						-1.4572139829397202,
						48.61054301261902,
						0
					],
					[
						-1.4573169965296984,
						48.61058701761067,
						0
					],
					[
						-1.4590350352227688,
						48.60953802242875,
						0
					],
					[
						-1.4604909718036652,
						48.609142983332276,
						0
					],
					[
						-1.462473040446639,
						48.6078380048275,
						0
					],
					[
						-1.4653330296278,
						48.60653000883758,
						0
					],
					[
						-1.4670649822801352,
						48.605397026985884,
						0
					],
					[
						-1.4690329693257809,
						48.604542994871736,
						0
					],
					[
						-1.470107026398182,
						48.60393497161567,
						0
					],
					[
						-1.47175800986588,
						48.6023620236665,
						0
					],
					[
						-1.472425041720271,
						48.60149801708758,
						0
					],
					[
						-1.4726500120013952,
						48.60096300020814,
						0
					],
					[
						-1.4736229833215475,
						48.600396970286965,
						0
					],
					[
						-1.4744060207158327,
						48.60016495920718,
						0
					],
					[
						-1.4753329753875732,
						48.59963497146964,
						0
					],
					[
						-1.4765019994229078,
						48.5955030284822,
						0
					],
					[
						-1.476741973310709,
						48.59366697259247,
						0
					],
					[
						-1.4769200049340725,
						48.592830039560795,
						0
					],
					[
						-1.4779229834675789,
						48.59082299284637,
						0
					],
					[
						-1.4781420025974512,
						48.589262031018734,
						0
					],
					[
						-1.4782099798321724,
						48.58897000551224,
						0
					],
					[
						-1.4783379714936018,
						48.588689966127276,
						0
					],
					[
						-1.4793029800057411,
						48.58725397847593,
						0
					],
					[
						-1.4792999625205994,
						48.58728197403252,
						0
					],
					[
						-1.4800980035215616,
						48.58741197735071,
						0
					],
					[
						-1.4825280010700226,
						48.58774700202048,
						0
					],
					[
						-1.4851170033216476,
						48.58857303857803,
						0
					],
					[
						-1.488779978826642,
						48.58938499353826,
						0
					],
					[
						-1.4890969824045897,
						48.58944199047983,
						0
					],
					[
						-1.4915950410068035,
						48.58981699682772,
						0
					],
					[
						-1.4926720317453146,
						48.5901980381459,
						0
					],
					[
						-1.4946019649505615,
						48.59128198586404,
						0
					],
					[
						-1.4971130155026913,
						48.59223500825465,
						0
					],
					[
						-1.4996150135993958,
						48.59316003508866,
						0
					],
					[
						-1.499862028285861,
						48.59340696595609,
						0
					],
					[
						-1.500112982466817,
						48.594872038811445,
						0
					],
					[
						-1.5006169863045216,
						48.59529800713062,
						0
					],
					[
						-1.5019920375198126,
						48.595994962379336,
						0
					],
					[
						-1.5068869851529598,
						48.59674799256027,
						0
					],
					[
						-1.508790012449026,
						48.59695200808346,
						0
					],
					[
						-1.5098720323294401,
						48.597298013046384,
						0
					],
					[
						-1.5127640403807163,
						48.59778500162065,
						0
					],
					[
						-1.5130149945616722,
						48.59788700938225,
						0
					],
					[
						-1.5131129790097475,
						48.59805800020695,
						0
					],
					[
						-1.5138670150190592,
						48.59826302155852,
						0
					],
					[
						-1.5139270294457674,
						48.59838497824967,
						0
					],
					[
						-1.5139820147305727,
						48.598223039880395,
						0
					],
					[
						-1.5113159827888012,
						48.61757802776992,
						0
					],
					[
						-1.5109539683908224,
						48.61907998099923,
						0
					],
					[
						-1.5103359706699848,
						48.62114301882684,
						0
					],
					[
						-1.5091830398887396,
						48.62307303585112,
						0
					],
					[
						-1.5086809638887644,
						48.624090012162924,
						0
					],
					[
						-1.5080300252884626,
						48.62644298002124,
						0
					],
					[
						-1.5079580247402191,
						48.628348018974066,
						0
					],
					[
						-1.5083290077745914,
						48.63020997494459,
						0
					],
					[
						-1.5102760400623083,
						48.63430595956743,
						0
					],
					[
						-1.5104600228369236,
						48.634750032797456,
						0
					],
					[
						-1.510825976729393,
						48.63490602001548,
						0
					],
					[
						-1.5116159711033106,
						48.63489001058042,
						0
					],
					[
						-1.5121639799326658,
						48.635180024430156,
						0
					],
					[
						-1.5121540054678917,
						48.63516996614635,
						0
					],
					[
						-1.5121639799326658,
						48.63518203608692,
						0
					]
				]
			},
			"properties": {
				"name": "Véloscénie",
				"styleUrl": "#LineGreenPoly",
				"styleHash": "7660cc8f",
				"description": "Véloscénie : Paris Mont Saint Michel",
				"stroke": "#ff0000",
				"stroke-opacity": 1,
				"stroke-width": 4,
				"fill": "#ff0000",
				"fill-opacity": 1
			}
		}
	]
};

/***/ }),

/***/ "./src/Trip/Map/data.js":
/* exports provided: STARTING_POINT, getStepLines */
/* exports used: STARTING_POINT */
/*!******************************!*\
  !*** ./src/Trip/Map/data.js ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(/*! ramda */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__turf_meta__ = __webpack_require__(/*! @turf/meta */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__turf_meta___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__turf_meta__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_helpers__ = __webpack_require__(/*! @turf/helpers */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_line_slice__ = __webpack_require__(/*! @turf/line-slice */ 13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_line_slice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__turf_line_slice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bike_roads_veloscenie_json__ = __webpack_require__(/*! ./bike_roads/veloscenie.json */ "./src/Trip/Map/bike_roads/veloscenie.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bike_roads_veloscenie_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__bike_roads_veloscenie_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bike_roads_ev4_json__ = __webpack_require__(/*! ./bike_roads/ev4.json */ "./src/Trip/Map/bike_roads/ev4.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bike_roads_ev4_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__bike_roads_ev4_json__);







const pathLineString = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["pipe"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["map"])(__WEBPACK_IMPORTED_MODULE_1__turf_meta__["coordAll"]), __WEBPACK_IMPORTED_MODULE_0_ramda__["unnest"], __WEBPACK_IMPORTED_MODULE_2__turf_helpers__["lineString"])([__WEBPACK_IMPORTED_MODULE_4__bike_roads_veloscenie_json___default.a, __WEBPACK_IMPORTED_MODULE_5__bike_roads_ev4_json___default.a]);

const STARTING_POINT = [2.3738311, 48.8841141];
/* harmony export (immutable) */ __webpack_exports__["a"] = STARTING_POINT;


const getStepLines = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["pipe"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["prepend"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__["point"])(STARTING_POINT)), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["map"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["repeat"])(__WEBPACK_IMPORTED_MODULE_0_ramda__["__"], 2)), __WEBPACK_IMPORTED_MODULE_0_ramda__["unnest"], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["slice"])(1, -1), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["aperture"])(2), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["map"])(([startPoint, endPoint]) => __WEBPACK_IMPORTED_MODULE_3__turf_line_slice___default()(startPoint, endPoint, pathLineString)));
/* unused harmony export getStepLines */


/***/ }),

/***/ "./src/Trip/Map/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!********************************!*\
  !*** ./src/Trip/Map/index.jsx ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda__ = __webpack_require__(/*! ramda */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_freactal__ = __webpack_require__(/*! freactal */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_freactal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_freactal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SleepMarker__ = __webpack_require__(/*! ./SleepMarker */ "./src/Trip/Map/SleepMarker/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data__ = __webpack_require__(/*! ./data */ "./src/Trip/Map/data.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/Map/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config__ = __webpack_require__(/*! ../../config */ "./src/config.js");
var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/Map/index.jsx',
    _this = this;












const Mapbox = new Proxy({}, {
    get: (target, name) => target[name] || (() => null)
});

const INITIAL_ZOOM = [10];
const withSleepPoints = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_freactal__["provideState"])({
    initialState: () => ({
        zoom: INITIAL_ZOOM
    }),
    effects: {
        updateMap: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_freactal__["softUpdate"])((_, map) => ({ zoom: map.getZoom() }))
    },
    computed: {
        displayedSleepPoints: ({ sleepLocations, currentSleepLocation }) => console.log(sleepLocations) || sleepLocations.slice(0, sleepLocations.indexOf(currentSleepLocation) + 1).map(sleepLocation => {
            const { longitude, latitude } = sleepLocation.data['sleep_location.location'].value;
            return [longitude, latitude];
        })
    }
});

const Map = ({ state: { displayedSleepPoints }, effects: { updateMap } }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    Mapbox.Map,
    {
        center: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ramda__["last"])(displayedSleepPoints) || __WEBPACK_IMPORTED_MODULE_5__data__["a" /* STARTING_POINT */],
        containerStyle: {
            height: '100%'
        },
        zoom: INITIAL_ZOOM,
        mapboxApiAccessToken: __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].mapboxAccessToken,
        style: 'mapbox://styles/mapbox/satellite-v9',
        onMove: updateMap,
        onStyleLoad: updateMap,
        movingMethod: 'easeTo',
        __source: {
            fileName: _jsxFileName,
            lineNumber: 50
        },
        __self: _this
    },
    displayedSleepPoints.map(sleepPoint => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        Mapbox.Marker,
        { key: sleepPoint.join(), coordinates: sleepPoint, anchor: 'center', __source: {
                fileName: _jsxFileName,
                lineNumber: 63
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__SleepMarker__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 64
            },
            __self: _this
        })
    ))
);
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ramda__["compose"])(withSleepPoints, __WEBPACK_IMPORTED_MODULE_3_freactal__["injectState"], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_6__style_css___default.a))(Map));

/***/ }),

/***/ "./src/Trip/Map/style.css":
/* no static exports found */
/* exports used: default */
/*!********************************!*\
  !*** ./src/Trip/Map/style.css ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Map/style.css");
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
      module.hot.accept(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Map/style.css", function() {
        content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Map/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/Trip/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!****************************!*\
  !*** ./src/Trip/index.jsx ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prismic_io__ = __webpack_require__(/*! prismic.io */ 47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prismic_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prismic_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__(/*! ramda */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_freactal__ = __webpack_require__(/*! freactal */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_freactal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_freactal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Map__ = __webpack_require__(/*! ./Map */ "./src/Trip/Map/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Details__ = __webpack_require__(/*! ./Details */ "./src/Trip/Details/index.jsx");
var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/index.jsx',
    _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };










const getSleepLocationsAfter = date => __WEBPACK_IMPORTED_MODULE_2_prismic_io___default.a.api('http://vagalam.prismic.io/api').then(api => api.query([__WEBPACK_IMPORTED_MODULE_2_prismic_io___default.a.Predicates.at('document.type', 'sleep_location'), __WEBPACK_IMPORTED_MODULE_2_prismic_io___default.a.Predicates.dateAfter('my.sleep_location.date', date)], { orderings: '[my.sleep_location.date]', pageSize: 10 })).then(response => response.results);

const FIRST_DAY_DATE = new Date(2017, 4, 28);

const withSleepLocations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_freactal__["provideState"])({
    initialState: () => ({
        currentSleepLocation: null,
        currentDate: FIRST_DAY_DATE,
        sleepLocations: [],
        isFetching: false
    }),
    effects: {
        fetchSleepLocations: (effects, date, isFetching, cb) => {
            if (isFetching) {
                return state => state;
            }
            return effects.setFetching(true).then(() => getSleepLocationsAfter(date)).then(locations => effects.setFetching(false).then(() => locations)).then(effects.updateSleepLocations).then(cb).then(() => state => state);
        },
        updateSleepLocations: (effects, sleepLocations) => state => {
            const previousLastDayNumber = state.sleepLocations.length ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ramda__["last"])(state.sleepLocations).data['sleep_location.day_number'].value : 0;
            const fetchedFirstDayNumber = sleepLocations[0].data['sleep_location.day_number'].value;
            if (previousLastDayNumber >= fetchedFirstDayNumber) {
                return state;
            }
            return _extends({}, state, {
                sleepLocations: state.sleepLocations.concat(sleepLocations)
            });
        },
        setFetching: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_freactal__["softUpdate"])((_, isFetching) => ({ isFetching })),
        goToNextDay: effects => state => {
            // TODO: case when no more sleeplocation exists
            const nextLocation = state.sleepLocations.find(sleepLocation => new Date(sleepLocation.data['sleep_location.date'].value) > state.currentDate);
            if (!nextLocation) {
                effects.fetchSleepLocations(state.currentDate, state.isFetching, effects.goToNextDay);
                return state;
            }
            return _extends({}, state, {
                currentSleepLocation: nextLocation,
                currentDate: new Date(nextLocation.data['sleep_location.date'].value)
            });
        },
        initialize: effects => state => {
            effects.fetchSleepLocations(state.currentDate, state.isFetching);
            return state;
        }
    }
});

const Trip = ({ effects }) => {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_5__style_css___default.a.layout, onKeyDown: e => e.key === ' ' && effects.goToNextDay(), __source: {
                fileName: _jsxFileName,
                lineNumber: 88
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Map__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 89
            },
            __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Details__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 90
            },
            __self: _this
        })
    );
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ramda__["compose"])(withSleepLocations, __WEBPACK_IMPORTED_MODULE_4_freactal__["injectState"], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_5__style_css___default.a))(Trip));

/***/ }),

/***/ "./src/Trip/style.css":
/* no static exports found */
/* exports used: default */
/*!****************************!*\
  !*** ./src/Trip/style.css ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../~/css-loader??ref--1-1!../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/style.css");
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
      module.hot.accept(/*! !../../~/css-loader??ref--1-1!../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/style.css", function() {
        content = __webpack_require__(/*! !../../~/css-loader??ref--1-1!../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/config.js":
/* exports provided: default */
/* exports used: default */
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    mapboxAccessToken: 'pk.eyJ1IjoiZ2FuY2VhYiIsImEiOiJjajQ0OHZjZzgxOGY3MndzOTh6YTFjbmNyIn0.0pHsI5xrBMh9YMftXmLQKw'
});

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Trip__ = __webpack_require__(/*! ./Trip */ "./src/Trip/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Landing__ = __webpack_require__(/*! ./Landing */ "./src/Landing/index.jsx");
var _jsxFileName = '/home/johan/Project/Vagalam/src/routes.js';






/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__["a" /* Route */],
    { component: __WEBPACK_IMPORTED_MODULE_2__App__["a" /* default */], __source: {
            fileName: _jsxFileName,
            lineNumber: 7
        },
        __self: this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__["a" /* Route */], { path: '/', component: __WEBPACK_IMPORTED_MODULE_4__Landing__["a" /* default */], __source: {
            fileName: _jsxFileName,
            lineNumber: 8
        },
        __self: this
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__["a" /* Route */], { path: '/voyage', component: __WEBPACK_IMPORTED_MODULE_3__Trip__["a" /* default */], __source: {
            fileName: _jsxFileName,
            lineNumber: 9
        },
        __self: this
    })
));

/***/ }),

/***/ "./src/style.global.css":
/* no static exports found */
/* exports used: default */
/*!******************************!*\
  !*** ./src/style.global.css ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../~/css-loader??ref--0-1!../~/postcss-loader!./style.global.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1}!./node_modules/postcss-loader/index.js!./src/style.global.css");
    var insertCss = __webpack_require__(/*! ../~/isomorphic-style-loader/lib/insertCss.js */ "./node_modules/isomorphic-style-loader/lib/insertCss.js");

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
      module.hot.accept(/*! !../~/css-loader??ref--0-1!../~/postcss-loader!./style.global.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1}!./node_modules/postcss-loader/index.js!./src/style.global.css", function() {
        content = __webpack_require__(/*! !../~/css-loader??ref--0-1!../~/postcss-loader!./style.global.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1}!./node_modules/postcss-loader/index.js!./src/style.global.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/ui-element/Button/Link.jsx":
/* exports provided: default */
/* exports used: default */
/*!****************************************!*\
  !*** ./src/ui-element/Button/Link.jsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(/*! ./style.css */ "./src/ui-element/Button/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/johan/Project/Vagalam/src/ui-element/Button/Link.jsx',
    _this = this;



function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




const LinkButton = (_ref) => {
    let { children, href } = _ref,
        props = _objectWithoutProperties(_ref, ['children', 'href']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'a',
        _extends({
            href: href
        }, props, {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 6
            },
            __self: _this
        }),
        children
    );
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_2__style_css___default.a)(LinkButton));

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

/***/ "./src/ui-element/Pastille/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!*******************************************!*\
  !*** ./src/ui-element/Pastille/index.jsx ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(/*! ./style.css */ "./src/ui-element/Pastille/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);
var _jsxFileName = '/home/johan/Project/Vagalam/src/ui-element/Pastille/index.jsx',
    _this = this;





const Pastille = ({ value, unit }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.pastille, __source: {
            fileName: _jsxFileName,
            lineNumber: 5
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'strong',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 6
            },
            __self: _this
        },
        value
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'small',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 7
            },
            __self: _this
        },
        unit
    )
);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_2__style_css___default.a)(Pastille));

/***/ }),

/***/ "./src/ui-element/Pastille/style.css":
/* no static exports found */
/* exports used: default */
/*!*******************************************!*\
  !*** ./src/ui-element/Pastille/style.css ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/ui-element/Pastille/style.css");
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
      module.hot.accept(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/ui-element/Pastille/style.css", function() {
        content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/ui-element/Pastille/style.css");

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
/* exports used: default, Component */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 1:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ 10:
/* no static exports found */
/* exports used: renderToStaticMarkup, renderToString */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ 11:
/* no static exports found */
/* exports used: parse */
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ 12:
/* no static exports found */
/* exports used: lineString, point */
/*!********************************!*\
  !*** external "@turf/helpers" ***!
  \********************************/
/***/ (function(module, exports) {

module.exports = require("@turf/helpers");

/***/ }),

/***/ 13:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "@turf/line-slice" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("@turf/line-slice");

/***/ }),

/***/ 14:
/* no static exports found */
/* exports used: coordAll */
/*!*****************************!*\
  !*** external "@turf/meta" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("@turf/meta");

/***/ }),

/***/ 15:
/* no static exports found */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "babel-plugin-discard-module-references" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-discard-module-references");

/***/ }),

/***/ 16:
/* no static exports found */
/* exports used: default */
/*!************************************************************!*\
  !*** external "babel-plugin-minify-dead-code-elimination" ***!
  \************************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-dead-code-elimination");

/***/ }),

/***/ 17:
/* no static exports found */
/* exports used: default */
/*!**********************************************************!*\
  !*** external "babel-plugin-minify-guarded-expressions" ***!
  \**********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-guarded-expressions");

/***/ }),

/***/ 18:
/* no static exports found */
/* exports used: default */
/*!**********************************************!*\
  !*** external "babel-plugin-minify-replace" ***!
  \**********************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-replace");

/***/ }),

/***/ 19:
/* no static exports found */
/* exports used: default */
/*!*********************************************!*\
  !*** external "babel-plugin-react-require" ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-react-require");

/***/ }),

/***/ 2:
/* no static exports found */
/* exports used: last, compose, pipe, map, unnest, prepend, repeat, __, slice, aperture */
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),

/***/ 20:
/* no static exports found */
/* exports used: default */
/*!********************************************************************!*\
  !*** external "babel-plugin-transform-export-default-name-forked" ***!
  \********************************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-export-default-name-forked");

/***/ }),

/***/ 21:
/* no static exports found */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "babel-plugin-transform-node-env-inline" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-node-env-inline");

/***/ }),

/***/ 22:
/* no static exports found */
/* exports used: default */
/*!********************************************************!*\
  !*** external "babel-plugin-transform-react-jsx-self" ***!
  \********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-react-jsx-self");

/***/ }),

/***/ 23:
/* no static exports found */
/* exports used: default */
/*!**********************************************************!*\
  !*** external "babel-plugin-transform-react-jsx-source" ***!
  \**********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-react-jsx-source");

/***/ }),

/***/ 24:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "babel-preset-env" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-env");

/***/ }),

/***/ 25:
/* no static exports found */
/* exports used: default */
/*!*************************************!*\
  !*** external "babel-preset-react" ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-react");

/***/ }),

/***/ 26:
/* no static exports found */
/* exports used: default */
/*!***************************************!*\
  !*** external "babel-preset-stage-1" ***!
  \***************************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-stage-1");

/***/ }),

/***/ 27:
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ 28:
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** external "babel-runtime/helpers/slicedToArray" ***!
  \******************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),

/***/ 29:
/* no static exports found */
/* exports used: default */
/*!******************************************************!*\
  !*** external "case-sensitive-paths-webpack-plugin" ***!
  \******************************************************/
/***/ (function(module, exports) {

module.exports = require("case-sensitive-paths-webpack-plugin");

/***/ }),

/***/ 3:
/* no static exports found */
/* exports used: default */
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),

/***/ 30:
/* no static exports found */
/* exports used: default */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ 31:
/* no static exports found */
/* exports used: default */
/*!*****************************************!*\
  !*** external "http-graceful-shutdown" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("http-graceful-shutdown");

/***/ }),

/***/ 32:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "js-string-escape" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("js-string-escape");

/***/ }),

/***/ 33:
/* no static exports found */
/* exports used: default */
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ 34:
/* no static exports found */
/* exports used: default */
/*!******************************!*\
  !*** external "koa-compose" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("koa-compose");

/***/ }),

/***/ 35:
/* no static exports found */
/* exports used: default */
/*!**************************************!*\
  !*** external "koa-conditional-get" ***!
  \**************************************/
/***/ (function(module, exports) {

module.exports = require("koa-conditional-get");

/***/ }),

/***/ 36:
/* no static exports found */
/* exports used: default */
/*!***************************!*\
  !*** external "koa-etag" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("koa-etag");

/***/ }),

/***/ 37:
/* no static exports found */
/* exports used: default */
/*!****************************!*\
  !*** external "koa-mount" ***!
  \****************************/
/***/ (function(module, exports) {

module.exports = require("koa-mount");

/***/ }),

/***/ 38:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),

/***/ 39:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "lodash.mergewith" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("lodash.mergewith");

/***/ }),

/***/ 4:
/* no static exports found */
/* exports used: provideState, softUpdate, injectState */
/*!***************************!*\
  !*** external "freactal" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("freactal");

/***/ }),

/***/ 40:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ 41:
/* no static exports found */
/* exports used: default */
/*!*******************************************!*\
  !*** external "postcss-browser-reporter" ***!
  \*******************************************/
/***/ (function(module, exports) {

module.exports = require("postcss-browser-reporter");

/***/ }),

/***/ 42:
/* no static exports found */
/* exports used: default */
/*!**********************************!*\
  !*** external "postcss-cssnext" ***!
  \**********************************/
/***/ (function(module, exports) {

module.exports = require("postcss-cssnext");

/***/ }),

/***/ 43:
/* no static exports found */
/* exports used: default */
/*!*********************************!*\
  !*** external "postcss-import" ***!
  \*********************************/
/***/ (function(module, exports) {

module.exports = require("postcss-import");

/***/ }),

/***/ 44:
/* no static exports found */
/* exports used: default */
/*!********************************************!*\
  !*** external "postcss-omit-import-tilde" ***!
  \********************************************/
/***/ (function(module, exports) {

module.exports = require("postcss-omit-import-tilde");

/***/ }),

/***/ 45:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "postcss-reporter" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("postcss-reporter");

/***/ }),

/***/ 46:
/* no static exports found */
/* exports used: default */
/*!******************************!*\
  !*** external "postcss-url" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("postcss-url");

/***/ }),

/***/ 47:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "prismic.io" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("prismic.io");

/***/ }),

/***/ 48:
/* no static exports found */
/* exports used: default */
/*!****************************************************************!*\
  !*** external "react-dev-utils/WatchMissingNodeModulesPlugin" ***!
  \****************************************************************/
/***/ (function(module, exports) {

module.exports = require("react-dev-utils/WatchMissingNodeModulesPlugin");

/***/ }),

/***/ 49:
/* no static exports found */
/* exports used: Provider */
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ 5:
/* no static exports found */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "isomorphic-style-loader/lib/withStyles" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),

/***/ 50:
/* no static exports found */
/* exports used: Resolver */
/*!*********************************!*\
  !*** external "react-resolver" ***!
  \*********************************/
/***/ (function(module, exports) {

module.exports = require("react-resolver");

/***/ }),

/***/ 51:
/* no static exports found */
/* exports used: routerReducer, routerMiddleware */
/*!*************************************!*\
  !*** external "react-router-redux" ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),

/***/ 52:
/* no static exports found */
/* exports used: default */
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),

/***/ 53:
/* no static exports found */
/* exports used: combineReducers, compose, applyMiddleware, createStore */
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ 54:
/* no static exports found */
/* exports used: default */
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ 55:
/* no static exports found */
/* exports used: default */
/*!***********************************************!*\
  !*** external "serviceworker-webpack-plugin" ***!
  \***********************************************/
/***/ (function(module, exports) {

module.exports = require("serviceworker-webpack-plugin");

/***/ }),

/***/ 56:
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ 57:
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),

/***/ 58:
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
/* exports used: RouterContext, match, Route, createMemoryHistory */
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),

/***/ 7:
/* no static exports found */
/* exports used: default */
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ 8:
/* no static exports found */
/* all exports used */
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),

/***/ 9:
/* no static exports found */
/* all exports used */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=server_bundle.js.map