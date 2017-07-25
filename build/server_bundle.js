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
/******/ 	var hotCurrentHash = "52a1afefd1b596362ec3"; // eslint-disable-line no-unused-vars
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
/******/ 	return hotCreateRequire(69)(__webpack_require__.s = 69);
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
exports.push([module.i, ".style__icon___3M-PM {\n    -webkit-animation: style__swirl-in-fwd___GJZux 0.4s ease-out both;\n            animation: style__swirl-in-fwd___GJZux 0.4s ease-out both;\n    -webkit-animation-delay: 0.3s;\n            animation-delay: 0.3s;\n    padding: 4px;\n    border: 1px black solid;\n    border-radius: 100%;\n    background-color: white;\n    transition: height 0.3s, width 0.3s, padding 0.3s;\n}\n\n/* ----------------------------------------------\n * Generated by Animista on 2017-7-21 16:44:3\n * w: http://animista.net, t: @cssanimista\n * ---------------------------------------------- */\n\n/**\n * ----------------------------------------\n * animation swirl-in-fwd\n * ----------------------------------------\n */\n\n@-webkit-keyframes style__swirl-in-fwd___GJZux {\n    0% {\n        -webkit-transform: rotate(-540deg) scale(0);\n                transform: rotate(-540deg) scale(0);\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotate(0) scale(1);\n                transform: rotate(0) scale(1);\n        opacity: 1;\n    }\n}\n\n@keyframes style__swirl-in-fwd___GJZux {\n    0% {\n        -webkit-transform: rotate(-540deg) scale(0);\n                transform: rotate(-540deg) scale(0);\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotate(0) scale(1);\n                transform: rotate(0) scale(1);\n        opacity: 1;\n    }\n}\n", ""]);

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


var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 32);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ 33);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_preset_env__ = __webpack_require__(/*! babel-preset-env */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_preset_env___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_preset_env__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_preset_react__ = __webpack_require__(/*! babel-preset-react */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_preset_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_preset_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_preset_stage_1__ = __webpack_require__(/*! babel-preset-stage-1 */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_preset_stage_1___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_preset_stage_1__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_plugin_react_require__ = __webpack_require__(/*! babel-plugin-react-require */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_plugin_react_require___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_plugin_react_require__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_plugin_transform_export_default_name_forked__ = __webpack_require__(/*! babel-plugin-transform-export-default-name-forked */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_plugin_transform_export_default_name_forked___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_plugin_transform_export_default_name_forked__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_plugin_minify_replace__ = __webpack_require__(/*! babel-plugin-minify-replace */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_plugin_minify_replace___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_plugin_minify_replace__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_plugin_transform_node_env_inline__ = __webpack_require__(/*! babel-plugin-transform-node-env-inline */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_plugin_transform_node_env_inline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_plugin_transform_node_env_inline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_plugin_minify_dead_code_elimination__ = __webpack_require__(/*! babel-plugin-minify-dead-code-elimination */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_plugin_minify_dead_code_elimination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_plugin_minify_dead_code_elimination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_plugin_minify_guarded_expressions__ = __webpack_require__(/*! babel-plugin-minify-guarded-expressions */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_plugin_minify_guarded_expressions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_plugin_minify_guarded_expressions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_plugin_discard_module_references__ = __webpack_require__(/*! babel-plugin-discard-module-references */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_plugin_discard_module_references___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_plugin_discard_module_references__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_react_jsx_source__ = __webpack_require__(/*! babel-plugin-transform-react-jsx-source */ 28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_react_jsx_source___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_react_jsx_source__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_babel_plugin_transform_react_jsx_self__ = __webpack_require__(/*! babel-plugin-transform-react-jsx-self */ 27);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_mergewith__ = __webpack_require__(/*! lodash.mergewith */ 44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_mergewith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_mergewith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webpack__ = __webpack_require__(/*! webpack */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serviceworker_webpack_plugin__ = __webpack_require__(/*! serviceworker-webpack-plugin */ 66);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_case_sensitive_paths_webpack_plugin__ = __webpack_require__(/*! case-sensitive-paths-webpack-plugin */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_case_sensitive_paths_webpack_plugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_case_sensitive_paths_webpack_plugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dev_utils_WatchMissingNodeModulesPlugin__ = __webpack_require__(/*! react-dev-utils/WatchMissingNodeModulesPlugin */ 53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dev_utils_WatchMissingNodeModulesPlugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dev_utils_WatchMissingNodeModulesPlugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_postcss_omit_import_tilde__ = __webpack_require__(/*! postcss-omit-import-tilde */ 49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_postcss_omit_import_tilde___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_postcss_omit_import_tilde__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_postcss_import__ = __webpack_require__(/*! postcss-import */ 48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_postcss_import___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_postcss_import__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_postcss_url__ = __webpack_require__(/*! postcss-url */ 51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_postcss_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_postcss_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_postcss_cssnext__ = __webpack_require__(/*! postcss-cssnext */ 47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_postcss_cssnext___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_postcss_cssnext__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_postcss_browser_reporter__ = __webpack_require__(/*! postcss-browser-reporter */ 46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_postcss_browser_reporter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_postcss_browser_reporter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_postcss_reporter__ = __webpack_require__(/*! postcss-reporter */ 50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_postcss_reporter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_postcss_reporter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_path__ = __webpack_require__(/*! path */ 10);
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

module.exports = { "server": { "buildPath": "/home/johan/Project/Vagalam/build", "filename": "server_bundle.js", "host": "localhost", "port": 3000 }, "basePath": "", "publicPath": "/assets", "servePublic": true, "client": { "buildPath": "/home/johan/Project/Vagalam/public", "filename": "client_bundle.[hash].js", "serviceWorker": false, "targetBrowsers": [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"] }, "webpack": { "alias": {} }, "filesPath": "files", "rootElementId": "vitamin-app", "moduleMap": { "__app_modules__routes__": "/home/johan/Project/Vagalam/src/rootRoutes", "__app_modules__server_middlewares__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/emptyArray", "__app_modules__server_ErrorPage__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/ErrorPage", "__app_modules__server_onError__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/defaultFunction", "__app_modules__server_layout__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/HTMLLayout", "__app_modules__server_createInitAction__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/defaultFunction", "__app_modules__redux_reducers__": "/home/johan/Project/Vagalam/src/rootReducers", "__app_modules__redux_middlewares__": "/home/johan/Project/Vagalam/src/middlewares", "__app_modules__redux_enhancers__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/emptyArray", "__app_modules__redux_stateSerializer__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/src/shared/defaultStateSerializer" } };

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

const path = __webpack_require__(/*! path */ 10);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_compose__ = __webpack_require__(/*! koa-compose */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_compose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_compose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_etag__ = __webpack_require__(/*! koa-etag */ 41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_etag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_etag__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_conditional_get__ = __webpack_require__(/*! koa-conditional-get */ 40);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_string_escape__ = __webpack_require__(/*! js-string-escape */ 37);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 4);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 4);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 4);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server__ = __webpack_require__(/*! react-dom/server */ 11);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_modules_routes___ = __webpack_require__(/*! __app_modules__routes__ */ "./src/rootRoutes.jsx");
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url__ = __webpack_require__(/*! url */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static__ = __webpack_require__(/*! koa-static */ 43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_static__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_mount__ = __webpack_require__(/*! koa-mount */ 42);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_modules_redux_middlewares___ = __webpack_require__(/*! __app_modules__redux_middlewares__ */ "./src/middlewares.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_store__ = __webpack_require__(/*! ../../shared/store */ "./node_modules/vitaminjs/src/shared/store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(/*! ../../../config */ "./node_modules/vitaminjs/config/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);


/* eslint-disable import/no-extraneous-dependencies */

// used require instead of import, because optional default with import cause warnings
const reducers = __webpack_require__(/*! __app_modules__redux_reducers__ */ "./src/rootReducers.js");
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server__ = __webpack_require__(/*! react-dom/server */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(/*! react-helmet */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_resolver__ = __webpack_require__(/*! react-resolver */ 55);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url__ = __webpack_require__(/*! url */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(/*! koa */ 38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__(/*! express */ 35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk__ = __webpack_require__(/*! chalk */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch__ = __webpack_require__(/*! node-fetch */ 45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_readline__ = __webpack_require__(/*! readline */ 57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_readline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_readline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_http_graceful_shutdown__ = __webpack_require__(/*! http-graceful-shutdown */ 36);
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
        app.use(__webpack_require__(/*! webpack-dev-middleware */ 67)(compiler, {
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
        app.use(__webpack_require__(/*! webpack-hot-middleware */ 68)(compiler, {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(/*! react-redux */ 5);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 4);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(/*! redux */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux__ = __webpack_require__(/*! react-router-redux */ 56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk__ = __webpack_require__(/*! redux-thunk */ 59);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectors__ = __webpack_require__(/*! ./selectors */ "./src/Trip/Details/selectors.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/Details/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ui_element_Pastille__ = __webpack_require__(/*! ../../ui-element/Pastille */ "./src/ui-element/Pastille/index.jsx");
var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/Details/index.jsx',
    _this = this;







const Details = ({ currentDayNumber }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.container, __source: {
            fileName: _jsxFileName,
            lineNumber: 7
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__ui_element_Pastille__["a" /* default */], { value: currentDayNumber || '...', unit: 'jour', __source: {
            fileName: _jsxFileName,
            lineNumber: 8
        },
        __self: _this
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__ui_element_Pastille__["a" /* default */], { value: 1209, unit: 'km', __source: {
            fileName: _jsxFileName,
            lineNumber: 9
        },
        __self: _this
    })
);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(__WEBPACK_IMPORTED_MODULE_2__selectors__["a" /* default */])(Details));

/***/ }),

/***/ "./src/Trip/Details/selectors.js":
/* exports provided: default */
/* exports used: default */
/*!***************************************!*\
  !*** ./src/Trip/Details/selectors.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(/*! reselect */ 13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectors__ = __webpack_require__(/*! ../selectors */ "./src/Trip/selectors.js");




const currentDayNumberSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_1__selectors__["a" /* sleepLocationsSelector */], __WEBPACK_IMPORTED_MODULE_1__selectors__["b" /* currentSleepLocationIndexSelector */], (sleepLocations, currentSleepLocationIndex) => sleepLocations.length && currentSleepLocationIndex >= 0 ? sleepLocations[Math.min(currentSleepLocationIndex, sleepLocations.length - 1)].dayNumber : null);
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createStructuredSelector"])({
    currentDayNumber: currentDayNumberSelector
}));

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_freactal__ = __webpack_require__(/*! freactal */ 9);
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
    if (zoom < 4) {
        return null;
    }
    const size = zoom > 8 ? 24 : zoom > 6 ? 12 : /* otherwise */4;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
            style: {
                height: `${size}px`,
                width: `${size}px`,
                padding: `${size / 6}px`,
                borderColor: zoom > 7 ? 'black' : 'transparent'
            },
            className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.icon,
            __source: {
                fileName: _jsxFileName,
                lineNumber: 14
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Icon__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 23
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_line_distance__ = __webpack_require__(/*! @turf/line-distance */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_line_distance___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__turf_line_distance__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_line_slice_along__ = __webpack_require__(/*! @turf/line-slice-along */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_line_slice_along___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__turf_line_slice_along__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_motion__ = __webpack_require__(/*! react-motion */ 54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_motion___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_motion__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_redux__ = __webpack_require__(/*! react-redux */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ramda__ = __webpack_require__(/*! ramda */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_freactal__ = __webpack_require__(/*! freactal */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_freactal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_freactal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__selectors__ = __webpack_require__(/*! ./selectors */ "./src/Trip/Map/selectors.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__SleepMarker__ = __webpack_require__(/*! ./SleepMarker */ "./src/Trip/Map/SleepMarker/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/Map/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__config__ = __webpack_require__(/*! ../../config */ "./src/config.js");
var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/Map/index.jsx',
    _this = this;


















let Mapbox = new Proxy({}, {
    get: (target, name) => target[name] || (() => null)
});

const INITIAL_ZOOM = [9];
const withMapZoomControl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_freactal__["provideState"])({
    initialState: () => ({
        zoom: INITIAL_ZOOM
    }),
    effects: {
        updateMap: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_freactal__["softUpdate"])((_, map) => ({ zoom: map.getZoom() }))
    }
});

const Map = ({
    effects: { updateMap },
    displayedTripLineString,
    displayedSleepLocations
}) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    Mapbox.Map,
    {
        center: displayedSleepLocations.length ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_ramda__["last"])(displayedSleepLocations).coordinates : [2.3738311, 48.8841141],
        containerStyle: {
            height: '100%'
        },
        zoom: INITIAL_ZOOM,
        mapboxApiAccessToken: __WEBPACK_IMPORTED_MODULE_11__config__["a" /* default */].mapboxAccessToken,
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
    displayedTripLineString ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_react_motion__["Motion"],
        {
            defaultStyle: { distance: 0 },
            style: {
                distance: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_motion__["spring"])(__WEBPACK_IMPORTED_MODULE_2__turf_line_distance___default()(displayedTripLineString), {
                    stiffness: 42,
                    damping: 19,
                    precision: 1
                })
            },
            __source: {
                fileName: _jsxFileName,
                lineNumber: 67
            },
            __self: _this
        },
        ({ distance }) => distance > 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Mapbox.GeoJSONLayer, {
            data: __WEBPACK_IMPORTED_MODULE_3__turf_line_slice_along___default()(displayedTripLineString, 0, distance),
            lineLayout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            linePaint: {
                'line-color': 'white',
                'line-opacity': 0.8,
                'line-width': 2
            },
            __source: {
                fileName: _jsxFileName,
                lineNumber: 79
            },
            __self: _this
        }) : null
    ) : null,
    displayedSleepLocations.map(sleepLocation => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        Mapbox.Marker,
        {
            key: sleepLocation.coordinates.join(),
            coordinates: sleepLocation.coordinates,
            anchor: 'center',
            __source: {
                fileName: _jsxFileName,
                lineNumber: 95
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__SleepMarker__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 100
            },
            __self: _this
        })
    ))
);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_ramda__["compose"])(withMapZoomControl, __WEBPACK_IMPORTED_MODULE_7_freactal__["injectState"], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_react_redux__["connect"])(__WEBPACK_IMPORTED_MODULE_8__selectors__["a" /* default */]), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_10__style_css___default.a))(Map));

/***/ }),

/***/ "./src/Trip/Map/selectors.js":
/* exports provided: default */
/* exports used: default */
/*!***********************************!*\
  !*** ./src/Trip/Map/selectors.js ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(/*! reselect */ 13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__(/*! ramda */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_helpers__ = __webpack_require__(/*! @turf/helpers */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_meta__ = __webpack_require__(/*! @turf/meta */ 70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_meta___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__turf_meta__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__turf_line_slice__ = __webpack_require__(/*! @turf/line-slice */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__turf_line_slice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__turf_line_slice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__turf_bezier__ = __webpack_require__(/*! @turf/bezier */ 15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__turf_bezier___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__turf_bezier__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__selectors__ = __webpack_require__(/*! ../selectors */ "./src/Trip/selectors.js");










const TRIP_STARTING_POINT = [2.3738311, 48.8841141];

function bezierCoord(resolution, coordinates) {
    return coordinates.length ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__turf_meta__["coordAll"])(__WEBPACK_IMPORTED_MODULE_5__turf_bezier___default()(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__["lineString"])(coordinates), resolution, 0.6)) : coordinates;
}

const SMOOTH_LINE_NUMBER = 15;
const wholeTripLineStringSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_6__selectors__["a" /* sleepLocationsSelector */], sleepLocations => {
    if (!sleepLocations.length) {
        return null;
    }
    const coordinates = [TRIP_STARTING_POINT, ...sleepLocations.map(sleepLocation => sleepLocation.coordinates)];
    const [roughLine, smoothLine] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["splitAt"])(-SMOOTH_LINE_NUMBER, coordinates);

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__["lineString"])([...bezierCoord(5000, roughLine), ...bezierCoord(20000, smoothLine)]);
});

const displayedSleepLocationsSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_6__selectors__["a" /* sleepLocationsSelector */], __WEBPACK_IMPORTED_MODULE_6__selectors__["b" /* currentSleepLocationIndexSelector */], (sleepLocations, currentSleepLocationIndex) => sleepLocations.slice(0, currentSleepLocationIndex + 1));

const displayedTripLineStringSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(wholeTripLineStringSelector, displayedSleepLocationsSelector, (tripLineString, sleepLocations) => {
    if (!tripLineString || !sleepLocations.length) {
        return null;
    }
    return __WEBPACK_IMPORTED_MODULE_4__turf_line_slice___default()(TRIP_STARTING_POINT, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["last"])(sleepLocations), tripLineString);
});

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createStructuredSelector"])({
    displayedSleepLocations: displayedSleepLocationsSelector,
    displayedTripLineString: displayedTripLineStringSelector
}));

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

/***/ "./src/Trip/actions.js":
/* exports provided: goToNextSleepLocation, addSleepLocations */
/* exports used: goToNextSleepLocation, addSleepLocations */
/*!*****************************!*\
  !*** ./src/Trip/actions.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = goToNextSleepLocation;
/* harmony export (immutable) */ __webpack_exports__["b"] = addSleepLocations;


function goToNextSleepLocation() {
    return {
        type: 'app/trip/GO_TO_NEXT_SLEEP_LOCATION'
    };
}


function addSleepLocations(sleepLocations) {
    return {
        type: 'app/trip/ADD_SLEEP_LOCATIONS',
        sleepLocations
    };
}

/***/ }),

/***/ "./src/Trip/epic.js":
/* exports provided: default */
/* exports used: default */
/*!**************************!*\
  !*** ./src/Trip/epic.js ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = goToNextDay;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(/*! rxjs/Observable */ 60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(/*! rxjs/add/operator/map */ 64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__ = __webpack_require__(/*! rxjs/add/operator/filter */ 63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_startWith__ = __webpack_require__(/*! rxjs/add/operator/startWith */ 65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_exhaust__ = __webpack_require__(/*! rxjs/add/operator/exhaust */ 62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_exhaust___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_exhaust__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__ = __webpack_require__(/*! rxjs/add/observable/fromPromise */ 61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ramda__ = __webpack_require__(/*! ramda */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prismic_io__ = __webpack_require__(/*! prismic.io */ 52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prismic_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prismic_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions__ = __webpack_require__(/*! ./actions */ "./src/Trip/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__types__ = __webpack_require__(/*! ./types */ "./src/Trip/types.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__types__);













const TRIP_FIRST_DAY = new Date(2017, 4, 28);

const fetchSleepLocationsAfter = date => __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_7_prismic_io___default.a.api('http://vagalam.prismic.io/api').then(api => api.query([__WEBPACK_IMPORTED_MODULE_7_prismic_io___default.a.Predicates.at('document.type', 'sleep_location'), __WEBPACK_IMPORTED_MODULE_7_prismic_io___default.a.Predicates.dateAfter('my.sleep_location.date', date)], { orderings: '[my.sleep_location.date]', pageSize: 10 })).then(response => response.results.map(apiSleepLocation => {
    const { longitude, latitude } = apiSleepLocation.data['sleep_location.location'].value;
    return {
        date: new Date(apiSleepLocation.data['sleep_location.date'].value),
        dayNumber: apiSleepLocation.data['sleep_location.day_number'].value,
        coordinates: [longitude, latitude]
    };
})));

function goToNextDay(action$, store) {
    return action$.ofType('app/trip/GO_TO_NEXT_SLEEP_LOCATION').map(() => {
        const { sleepLocations, currentSleepLocationIndex } = store.getState().app.trip;
        const lastSleepLocation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_ramda__["last"])(sleepLocations);
        if (lastSleepLocation && currentSleepLocationIndex >= sleepLocations.length - 1) {
            return fetchSleepLocationsAfter(lastSleepLocation.date);
        }
        return null;
    }).filter(Boolean).startWith(fetchSleepLocationsAfter(TRIP_FIRST_DAY)).exhaust().map(__WEBPACK_IMPORTED_MODULE_8__actions__["b" /* addSleepLocations */]);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda__ = __webpack_require__(/*! ramda */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(/*! react-redux */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(/*! ./actions */ "./src/Trip/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Map__ = __webpack_require__(/*! ./Map */ "./src/Trip/Map/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Details__ = __webpack_require__(/*! ./Details */ "./src/Trip/Details/index.jsx");
var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/index.jsx',
    _this = this;











// eslint-disable-next-line no-shadow
const Trip = ({ goToNextSleepLocation }) => {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_5__style_css___default.a.layout, role: 'presentation', onKeyDown: e => e.key === ' ' && goToNextSleepLocation(), __source: {
                fileName: _jsxFileName,
                lineNumber: 16
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Map__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 17
            },
            __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Details__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 18
            },
            __self: _this
        })
    );
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ramda__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_react_redux__["connect"])(null, { goToNextSleepLocation: __WEBPACK_IMPORTED_MODULE_4__actions__["a" /* goToNextSleepLocation */] }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_5__style_css___default.a))(Trip));

/***/ }),

/***/ "./src/Trip/reducer.js":
/* exports provided: default */
/* exports used: default */
/*!*****************************!*\
  !*** ./src/Trip/reducer.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = reducer;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const initialState = {
    sleepLocations: [],
    currentSleepLocationIndex: -1
};


function reducer(state = initialState, action) {
    switch (action.type) {
        case 'app/trip/ADD_SLEEP_LOCATIONS':
            return _extends({}, state, {
                sleepLocations: state.sleepLocations.concat(action.sleepLocations)
            });

        case 'app/trip/GO_TO_NEXT_SLEEP_LOCATION':
            return _extends({}, state, {
                currentSleepLocationIndex: state.currentSleepLocationIndex + 1
            });

        default:
            return state;
    }
}

/***/ }),

/***/ "./src/Trip/selectors.js":
/* exports provided: sleepLocationsSelector, currentSleepLocationIndexSelector */
/* exports used: sleepLocationsSelector, currentSleepLocationIndexSelector */
/*!*******************************!*\
  !*** ./src/Trip/selectors.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const sleepLocationsSelector = state => state.app.trip.sleepLocations;
/* harmony export (immutable) */ __webpack_exports__["a"] = sleepLocationsSelector;

const currentSleepLocationIndexSelector = state => state.app.trip.currentSleepLocationIndex;
/* harmony export (immutable) */ __webpack_exports__["b"] = currentSleepLocationIndexSelector;


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

/***/ "./src/Trip/types.js":
/* no static exports found */
/*!***************************!*\
  !*** ./src/Trip/types.js ***!
  \***************************/
/***/ (function(module, exports) {



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

/***/ "./src/middlewares.js":
/* exports provided: default */
/* exports used: default */
/*!****************************!*\
  !*** ./src/middlewares.js ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable__ = __webpack_require__(/*! redux-observable */ 58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rootEpic__ = __webpack_require__(/*! ./rootEpic */ "./src/rootEpic.js");



const epicMiddleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux_observable__["createEpicMiddleware"])(__WEBPACK_IMPORTED_MODULE_1__rootEpic__["a" /* rootEpic */]);
/* harmony default export */ __webpack_exports__["a"] = ([epicMiddleware]);

/***/ }),

/***/ "./src/rootEpic.js":
/* exports provided: rootEpic */
/* exports used: rootEpic */
/*!*************************!*\
  !*** ./src/rootEpic.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Trip_epic__ = __webpack_require__(/*! ./Trip/epic */ "./src/Trip/epic.js");
// import { combineEpics } from 'redux-observable';


const rootEpic = __WEBPACK_IMPORTED_MODULE_0__Trip_epic__["a" /* default */];
/* harmony export (immutable) */ __webpack_exports__["a"] = rootEpic;


/***/ }),

/***/ "./src/rootReducers.js":
/* exports provided: default */
/* all exports used */
/*!*****************************!*\
  !*** ./src/rootReducers.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(/*! redux */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Trip_reducer__ = __webpack_require__(/*! ./Trip/reducer */ "./src/Trip/reducer.js");



/* harmony default export */ __webpack_exports__["default"] = ({
    app: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
        trip: __WEBPACK_IMPORTED_MODULE_1__Trip_reducer__["a" /* default */]
    })
});

/***/ }),

/***/ "./src/rootRoutes.jsx":
/* exports provided: default */
/* exports used: default */
/*!****************************!*\
  !*** ./src/rootRoutes.jsx ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__ = __webpack_require__(/*! vitaminjs/react-router */ "./node_modules/vitaminjs/react-router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__(/*! ./App */ "./src/App.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Trip__ = __webpack_require__(/*! ./Trip */ "./src/Trip/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Landing__ = __webpack_require__(/*! ./Landing */ "./src/Landing/index.jsx");
var _jsxFileName = '/home/johan/Project/Vagalam/src/rootRoutes.jsx';






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
/* all exports used */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ 11:
/* no static exports found */
/* exports used: renderToStaticMarkup, renderToString */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ 12:
/* no static exports found */
/* exports used: combineReducers, compose, applyMiddleware, createStore */
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ 13:
/* no static exports found */
/* exports used: createSelector, createStructuredSelector */
/*!***************************!*\
  !*** external "reselect" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("reselect");

/***/ }),

/***/ 14:
/* no static exports found */
/* exports used: parse */
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ 15:
/* no static exports found */
/* exports used: default */
/*!*******************************!*\
  !*** external "@turf/bezier" ***!
  \*******************************/
/***/ (function(module, exports) {

module.exports = require("@turf/bezier");

/***/ }),

/***/ 16:
/* no static exports found */
/* exports used: lineString */
/*!********************************!*\
  !*** external "@turf/helpers" ***!
  \********************************/
/***/ (function(module, exports) {

module.exports = require("@turf/helpers");

/***/ }),

/***/ 17:
/* no static exports found */
/* exports used: default */
/*!**************************************!*\
  !*** external "@turf/line-distance" ***!
  \**************************************/
/***/ (function(module, exports) {

module.exports = require("@turf/line-distance");

/***/ }),

/***/ 18:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "@turf/line-slice" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("@turf/line-slice");

/***/ }),

/***/ 19:
/* no static exports found */
/* exports used: default */
/*!*****************************************!*\
  !*** external "@turf/line-slice-along" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("@turf/line-slice-along");

/***/ }),

/***/ 2:
/* no static exports found */
/* exports used: compose, last, splitAt */
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),

/***/ 20:
/* no static exports found */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "babel-plugin-discard-module-references" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-discard-module-references");

/***/ }),

/***/ 21:
/* no static exports found */
/* exports used: default */
/*!************************************************************!*\
  !*** external "babel-plugin-minify-dead-code-elimination" ***!
  \************************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-dead-code-elimination");

/***/ }),

/***/ 22:
/* no static exports found */
/* exports used: default */
/*!**********************************************************!*\
  !*** external "babel-plugin-minify-guarded-expressions" ***!
  \**********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-guarded-expressions");

/***/ }),

/***/ 23:
/* no static exports found */
/* exports used: default */
/*!**********************************************!*\
  !*** external "babel-plugin-minify-replace" ***!
  \**********************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-replace");

/***/ }),

/***/ 24:
/* no static exports found */
/* exports used: default */
/*!*********************************************!*\
  !*** external "babel-plugin-react-require" ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-react-require");

/***/ }),

/***/ 25:
/* no static exports found */
/* exports used: default */
/*!********************************************************************!*\
  !*** external "babel-plugin-transform-export-default-name-forked" ***!
  \********************************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-export-default-name-forked");

/***/ }),

/***/ 26:
/* no static exports found */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "babel-plugin-transform-node-env-inline" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-node-env-inline");

/***/ }),

/***/ 27:
/* no static exports found */
/* exports used: default */
/*!********************************************************!*\
  !*** external "babel-plugin-transform-react-jsx-self" ***!
  \********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-react-jsx-self");

/***/ }),

/***/ 28:
/* no static exports found */
/* exports used: default */
/*!**********************************************************!*\
  !*** external "babel-plugin-transform-react-jsx-source" ***!
  \**********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-react-jsx-source");

/***/ }),

/***/ 29:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "babel-preset-env" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-env");

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
/*!*************************************!*\
  !*** external "babel-preset-react" ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-react");

/***/ }),

/***/ 31:
/* no static exports found */
/* exports used: default */
/*!***************************************!*\
  !*** external "babel-preset-stage-1" ***!
  \***************************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-stage-1");

/***/ }),

/***/ 32:
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ 33:
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** external "babel-runtime/helpers/slicedToArray" ***!
  \******************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),

/***/ 34:
/* no static exports found */
/* exports used: default */
/*!******************************************************!*\
  !*** external "case-sensitive-paths-webpack-plugin" ***!
  \******************************************************/
/***/ (function(module, exports) {

module.exports = require("case-sensitive-paths-webpack-plugin");

/***/ }),

/***/ 35:
/* no static exports found */
/* exports used: default */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ 36:
/* no static exports found */
/* exports used: default */
/*!*****************************************!*\
  !*** external "http-graceful-shutdown" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("http-graceful-shutdown");

/***/ }),

/***/ 37:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "js-string-escape" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("js-string-escape");

/***/ }),

/***/ 38:
/* no static exports found */
/* exports used: default */
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ 39:
/* no static exports found */
/* exports used: default */
/*!******************************!*\
  !*** external "koa-compose" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("koa-compose");

/***/ }),

/***/ 4:
/* no static exports found */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "isomorphic-style-loader/lib/withStyles" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),

/***/ 40:
/* no static exports found */
/* exports used: default */
/*!**************************************!*\
  !*** external "koa-conditional-get" ***!
  \**************************************/
/***/ (function(module, exports) {

module.exports = require("koa-conditional-get");

/***/ }),

/***/ 41:
/* no static exports found */
/* exports used: default */
/*!***************************!*\
  !*** external "koa-etag" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("koa-etag");

/***/ }),

/***/ 42:
/* no static exports found */
/* exports used: default */
/*!****************************!*\
  !*** external "koa-mount" ***!
  \****************************/
/***/ (function(module, exports) {

module.exports = require("koa-mount");

/***/ }),

/***/ 43:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),

/***/ 44:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "lodash.mergewith" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("lodash.mergewith");

/***/ }),

/***/ 45:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ 46:
/* no static exports found */
/* exports used: default */
/*!*******************************************!*\
  !*** external "postcss-browser-reporter" ***!
  \*******************************************/
/***/ (function(module, exports) {

module.exports = require("postcss-browser-reporter");

/***/ }),

/***/ 47:
/* no static exports found */
/* exports used: default */
/*!**********************************!*\
  !*** external "postcss-cssnext" ***!
  \**********************************/
/***/ (function(module, exports) {

module.exports = require("postcss-cssnext");

/***/ }),

/***/ 48:
/* no static exports found */
/* exports used: default */
/*!*********************************!*\
  !*** external "postcss-import" ***!
  \*********************************/
/***/ (function(module, exports) {

module.exports = require("postcss-import");

/***/ }),

/***/ 49:
/* no static exports found */
/* exports used: default */
/*!********************************************!*\
  !*** external "postcss-omit-import-tilde" ***!
  \********************************************/
/***/ (function(module, exports) {

module.exports = require("postcss-omit-import-tilde");

/***/ }),

/***/ 5:
/* no static exports found */
/* exports used: Provider, connect */
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ 50:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "postcss-reporter" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("postcss-reporter");

/***/ }),

/***/ 51:
/* no static exports found */
/* exports used: default */
/*!******************************!*\
  !*** external "postcss-url" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("postcss-url");

/***/ }),

/***/ 52:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "prismic.io" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("prismic.io");

/***/ }),

/***/ 53:
/* no static exports found */
/* exports used: default */
/*!****************************************************************!*\
  !*** external "react-dev-utils/WatchMissingNodeModulesPlugin" ***!
  \****************************************************************/
/***/ (function(module, exports) {

module.exports = require("react-dev-utils/WatchMissingNodeModulesPlugin");

/***/ }),

/***/ 54:
/* no static exports found */
/* exports used: Motion, spring */
/*!*******************************!*\
  !*** external "react-motion" ***!
  \*******************************/
/***/ (function(module, exports) {

module.exports = require("react-motion");

/***/ }),

/***/ 55:
/* no static exports found */
/* exports used: Resolver */
/*!*********************************!*\
  !*** external "react-resolver" ***!
  \*********************************/
/***/ (function(module, exports) {

module.exports = require("react-resolver");

/***/ }),

/***/ 56:
/* no static exports found */
/* exports used: routerReducer, routerMiddleware */
/*!*************************************!*\
  !*** external "react-router-redux" ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),

/***/ 57:
/* no static exports found */
/* exports used: default */
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),

/***/ 58:
/* no static exports found */
/* exports used: createEpicMiddleware */
/*!***********************************!*\
  !*** external "redux-observable" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("redux-observable");

/***/ }),

/***/ 59:
/* no static exports found */
/* exports used: default */
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

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

/***/ 60:
/* no static exports found */
/* exports used: Observable */
/*!**********************************!*\
  !*** external "rxjs/Observable" ***!
  \**********************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/Observable");

/***/ }),

/***/ 61:
/* no static exports found */
/*!**************************************************!*\
  !*** external "rxjs/add/observable/fromPromise" ***!
  \**************************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/observable/fromPromise");

/***/ }),

/***/ 62:
/* no static exports found */
/*!********************************************!*\
  !*** external "rxjs/add/operator/exhaust" ***!
  \********************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/exhaust");

/***/ }),

/***/ 63:
/* no static exports found */
/*!*******************************************!*\
  !*** external "rxjs/add/operator/filter" ***!
  \*******************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/filter");

/***/ }),

/***/ 64:
/* no static exports found */
/*!****************************************!*\
  !*** external "rxjs/add/operator/map" ***!
  \****************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/map");

/***/ }),

/***/ 65:
/* no static exports found */
/*!**********************************************!*\
  !*** external "rxjs/add/operator/startWith" ***!
  \**********************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/startWith");

/***/ }),

/***/ 66:
/* no static exports found */
/* exports used: default */
/*!***********************************************!*\
  !*** external "serviceworker-webpack-plugin" ***!
  \***********************************************/
/***/ (function(module, exports) {

module.exports = require("serviceworker-webpack-plugin");

/***/ }),

/***/ 67:
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ 68:
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),

/***/ 69:
/* no static exports found */
/* all exports used */
/*!**********************************************************************************!*\
  !*** multi ./~/vitaminjs/config/utils/hot.js ./~/vitaminjs/src/server/server.js ***!
  \**********************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/hot.js */"./node_modules/vitaminjs/config/utils/hot.js");
module.exports = __webpack_require__(/*! /home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/server.js */"./node_modules/vitaminjs/src/server/server.js");


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

/***/ 70:
/* no static exports found */
/* exports used: coordAll */
/*!*****************************!*\
  !*** external "@turf/meta" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("@turf/meta");

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
/* exports used: provideState, softUpdate, injectState */
/*!***************************!*\
  !*** external "freactal" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("freactal");

/***/ })

/******/ });
//# sourceMappingURL=server_bundle.js.map