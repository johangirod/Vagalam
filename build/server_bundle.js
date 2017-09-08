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
/******/ 	var hotCurrentHash = "b586f9370b0e24ee1d92"; // eslint-disable-line no-unused-vars
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
/******/ 	return hotCreateRequire(81)(__webpack_require__.s = 81);
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
exports.push([module.i, "section.style__header___La0Pw {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    height: 100%;\n    position: relative;\n}\n.style__background___2Myi_ {\n    background-size: cover;\n    background-position: center;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n}\nheader {\n    color: white;\n    font-family: 'Crimson Text', serif;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    z-index: 1;\n    margin: 32px;\n}\nh1 {\n    margin: 0;\n    margin-bottom: 8px;\n    font-size: 82px;\n}\nh2 {\n    margin: 0;\n    font-size: 20px;\n}\n.style__cta___2Aax1 {\n    text-align: center;\n    -ms-flex-item-align: flex-center;\n        align-self: flex-center;\n    margin: 32px;\n    z-index: 1;\n}\n", ""]);

// exports
exports.locals = {
	"header": "style__header___La0Pw",
	"background": "style__background___2Myi_",
	"cta": "style__cta___2Aax1"
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
exports.push([module.i, ".style__details___2zN8J {\n    font-family: 'Crimson Text', serif;\n    font-size: 20px;\n}\n\n.style__press-space___1BylT {\n    -webkit-animation: style__fade-in___tfnob 2s ease-in-out infinite alternate-reverse;\n            animation: style__fade-in___tfnob 2s ease-in-out infinite alternate-reverse;\n}\n\n@-webkit-keyframes style__fade-in___tfnob {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n\n@keyframes style__fade-in___tfnob {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n", ""]);

// exports
exports.locals = {
	"details": "style__details___2zN8J",
	"press-space": "style__press-space___1BylT",
	"fade-in": "style__fade-in___tfnob"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/LastPointModale/style.css":
/* no static exports found */
/* all exports used */
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/Trip/LastPointModale/style.css ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".style__modale___2VLn5 {\n    background-color: white;\n    padding: 32px;\n    max-width: 600px;\n}\n", ""]);

// exports
exports.locals = {
	"modale": "style__modale___2VLn5"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Map/MapPointMarker/style.css":
/* no static exports found */
/* all exports used */
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/Trip/Map/MapPointMarker/style.css ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".style__icon___PKEQD {\n    -webkit-animation: style__scale-in-center___1MRDq 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940)\n        both;\n            animation: style__scale-in-center___1MRDq 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940)\n        both;\n    padding: 4px;\n    border: 1px black solid;\n    border-radius: 100%;\n    background-color: white;\n    transition: height 0.3s, width 0.3s, padding 0.3s;\n}\n/* ----------------------------------------------\n * Generated by Animista on 2017-7-26 19:20:3\n * w: http://animista.net, t: @cssanimista\n * ---------------------------------------------- */\n/**\n * ----------------------------------------\n * animation scale-in-center\n * ----------------------------------------\n */\n@-webkit-keyframes style__scale-in-center___1MRDq {\n    0% {\n        -webkit-transform: scale(0);\n                transform: scale(0);\n        opacity: 1;\n    }\n    100% {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n        opacity: 1;\n    }\n}\n@keyframes style__scale-in-center___1MRDq {\n    0% {\n        -webkit-transform: scale(0);\n                transform: scale(0);\n        opacity: 1;\n    }\n    100% {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n        opacity: 1;\n    }\n}\n", ""]);

// exports
exports.locals = {
	"icon": "style__icon___PKEQD",
	"scale-in-center": "style__scale-in-center___1MRDq"
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

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Posts/Pictures/style.css":
/* no static exports found */
/* all exports used */
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/Trip/Posts/Pictures/style.css ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".style__pictures___3HFbl {\n    position: relative;\n    height: 100%;\n}\n.style__picture___33lmx {\n    background-size: cover;\n    background-position: center;\n    cursor: pointer;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    /*animation: zoom-in 10s linear infinite alternate-reverse;*/\n    opacity: 0;\n    position: absolute;\n    transition: opacity 0.7s;\n}\n.style__picture___33lmx.style__show___2gnB6 {\n    opacity: 1;\n}\n@-webkit-keyframes style__zoom-in___2i0LU {\n    from {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n    }\n    to {\n        -webkit-transform: scale(1.2);\n                transform: scale(1.2);\n    }\n}\n@keyframes style__zoom-in___2i0LU {\n    from {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n    }\n    to {\n        -webkit-transform: scale(1.2);\n                transform: scale(1.2);\n    }\n}\n", ""]);

// exports
exports.locals = {
	"pictures": "style__pictures___3HFbl",
	"picture": "style__picture___33lmx",
	"show": "style__show___2gnB6",
	"zoom-in": "style__zoom-in___2i0LU"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Posts/Post/style.css":
/* no static exports found */
/* all exports used */
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/Trip/Posts/Post/style.css ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "article {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    height: 100%;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: hidden;\n    background-color: white;\n}\n\nh1 {\n    font-family: 'Crimson Text', serif;\n}\n\n.style__pictures___4FB4g {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\n.style__content___2Li1p {\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n    overflow: auto;\n    padding: 16px 32px;\n    max-height: calc(100% - 32px);\n    z-index: 1;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\n.style__body___1twJ5 {\n    white-space: pre-line;\n    line-height: 1.5em;\n}\n\np {\n    margin-bottom: 1em;\n}\n", ""]);

// exports
exports.locals = {
	"pictures": "style__pictures___4FB4g",
	"content": "style__content___2Li1p",
	"body": "style__body___1twJ5"
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
exports.push([module.i, ".style__map___1Y6_H {\n    transition: -webkit-transform 1s;\n    transition: transform 1s;\n    transition: transform 1s, -webkit-transform 1s;\n}\n.style__zoom-in___oJPGi {\n    -webkit-transform: scale(3);\n        -ms-transform: scale(3);\n            transform: scale(3);\n}\n.style__brand___2yABU {\n    text-decoration: none;\n    color: black;\n    font-family: 'Crimson Text', serif;\n    font-weight: bold;\n    font-size: 22px;\n    transition: color 0.5s;\n}\n.style__brand___2yABU::before {\n    content: '\\\\';\n}\n.style__brand___2yABU::after {\n    content: '\\\\';\n}\n.style__brand___2yABU::after,\n.style__brand___2yABU::before {\n    display: inline-block;\n    transition: -webkit-transform 0.8s;\n    transition: transform 0.8s;\n    transition: transform 0.8s, -webkit-transform 0.8s;\n}\n.style__brand___2yABU:hover::after {\n    -webkit-transform: translateX(10px);\n        -ms-transform: translateX(10px);\n            transform: translateX(10px);\n}\n.style__brand___2yABU:hover::before {\n    -webkit-transform: translateX(-10px);\n        -ms-transform: translateX(-10px);\n            transform: translateX(-10px);\n}\n", ""]);

// exports
exports.locals = {
	"map": "style__map___1Y6_H",
	"zoom-in": "style__zoom-in___oJPGi",
	"brand": "style__brand___2yABU"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/FullScreenModale/style.css":
/* no static exports found */
/* all exports used */
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/shared/FullScreenModale/style.css ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".style__modale___oN5LA {\n    background-color: white;\n    padding: 32px;\n}\n.style__button-container___3GOoV {\n    text-align: center;\n}\n", ""]);

// exports
exports.locals = {
	"modale": "style__modale___oN5LA",
	"button-container": "style__button-container___3GOoV"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/Visitor/style.css":
/* no static exports found */
/* all exports used */
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/shared/Visitor/style.css ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".style__form___1Zr28 {\n    z-index: 2;\n}\n.style__input___1vCxN {\n    border: 1px solid black;\n    height: 48px;\n    font-size: large;\n    padding: 4px 16px;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n.style__input-container___xv7na {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.style__label___2Dq5A {\n    display: block;\n    font-weight: bold;\n    margin-bottom: 4px;\n}\n.style__select___9fNwA {\n    background: none;\n    border: none;\n    border-bottom: 1px dashed black;\n    padding-bottom: 1px;\n}\n.style__submit___2_0U2 {\n    background-color: black;\n    color: white;\n    padding: 4px 8px;\n    text-transform: uppercase;\n    border: none;\n    font-family: inherit;\n}\n", ""]);

// exports
exports.locals = {
	"form": "style__form___1Zr28",
	"input": "style__input___1vCxN",
	"input-container": "style__input-container___xv7na",
	"label": "style__label___2Dq5A",
	"select": "style__select___9fNwA",
	"submit": "style__submit___2_0U2"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/ui-element/Button/style.css":
/* no static exports found */
/* all exports used */
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/shared/ui-element/Button/style.css ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".style__button___1Hi-V {\n    position: relative;\n    border-radius: 32px;\n    border: 2px solid white;\n    display: inline-block;\n    text-decoration: none;\n    cursor: pointer;\n    color: white;\n    font-size: large;\n    padding: 12px 32px;\n    font-weight: bold;\n    transition: border-color 1s;\n    background: black;\n    background-clip: padding-box;\n}\n.style__button___1Hi-V:hover {\n    border-color: transparent;\n}\n.style__button___1Hi-V::after {\n    position: absolute;\n    top: -2px;\n    bottom: -2px;\n    left: -2px;\n    right: -2px;\n    border-radius: 32px;\n    content: '';\n    z-index: -1;\n    background: linear-gradient(\n        45deg,\n        rgba(255, 0, 0, 1) 0%,\n        rgba(255, 255, 0, 1) 15%,\n        rgba(0, 255, 0, 1) 30%,\n        rgba(0, 255, 255, 1) 50%,\n        rgba(0, 0, 255, 1) 65%,\n        rgba(255, 0, 255, 1) 80%,\n        rgba(255, 0, 0, 1) 100%\n    );\n    -webkit-animation: style__hue-rotate___j9SqY 1s linear infinite;\n            animation: style__hue-rotate___j9SqY 1s linear infinite;\n}\n@-webkit-keyframes style__hue-rotate___j9SqY {\n    from {\n        filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"0\" /></filter></svg>#filter');\n        -webkit-filter: hue-rotate(0deg);\n                filter: hue-rotate(0deg);\n    }\n    to {\n        filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"360\" /></filter></svg>#filter');\n        -webkit-filter: hue-rotate(360deg);\n                filter: hue-rotate(360deg);\n    }\n}\n@keyframes style__hue-rotate___j9SqY {\n    from {\n        filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"0\" /></filter></svg>#filter');\n        -webkit-filter: hue-rotate(0deg);\n                filter: hue-rotate(0deg);\n    }\n    to {\n        filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"360\" /></filter></svg>#filter');\n        -webkit-filter: hue-rotate(360deg);\n                filter: hue-rotate(360deg);\n    }\n}\n", ""]);

// exports
exports.locals = {
	"button": "style__button___1Hi-V",
	"hue-rotate": "style__hue-rotate___j9SqY"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/ui-element/FrameLayout/style.css":
/* no static exports found */
/* all exports used */
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/shared/ui-element/FrameLayout/style.css ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".style__layout___k4A_w {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    height: 100vh;\n    transition: background-color .5s;\n    padding: 0 48px;\n}\n\n.style__top___XdUbx,\n.style__bottom___4USFl {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    height: 48px;\n    -ms-flex-item-align: center;\n        align-self: center;\n}\n\n.style__inside___wwCOC {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    width: 100%;\n    -ms-flex-item-align: center;\n        -ms-grid-row-align: center;\n        align-self: center;\n    max-width: 150vh;\n    position: relative;\n}\n", ""]);

// exports
exports.locals = {
	"layout": "style__layout___k4A_w",
	"top": "style__top___XdUbx",
	"bottom": "style__bottom___4USFl",
	"inside": "style__inside___wwCOC"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/ui-element/Modale/style.css":
/* no static exports found */
/* all exports used */
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?{"minimize":false,"discardComments":{"removeAll":false},"importLoaders":1,"localIdentName":"[name]__[local]___[hash:base64:5]","modules":true}!./~/postcss-loader!./src/shared/ui-element/Modale/style.css ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../~/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".style__overlay___1F4_X {\n    position: absolute;\n    z-index: 3;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n\n.style__close-button___1ow_E {\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 16px;\n    z-index: 2;\n    border: none;\n    display: block;\n    font-size: large;\n    background-color: transparent;\n    cursor: pointer;\n}\n\n.style__close-button___1ow_E:hover {\n    font-weight: bold;\n}\n\n.style__fullscreen___1XD0i .style__close-button___1ow_E {\n    right: -44px;\n    color: white;\n    top: -2px;\n}\n\n.style__modale___2ddo9 {\n    position: relative;\n    max-width: 600px;\n    max-height: 100%;\n    border: 1px solid black;\n}\n\n.style__fullscreen___1XD0i {\n    max-width: none;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    border: 2px solid white;\n    width: 100%;\n}\n\n.style__enter___1TsM6 {\n    opacity: 0.01;\n    -webkit-transform: scale(0.01);\n        -ms-transform: scale(0.01);\n            transform: scale(0.01);\n}\n\n.style__enter-active___cOvkb {\n    opacity: 1;\n    -webkit-transform: scale(1);\n        -ms-transform: scale(1);\n            transform: scale(1);\n    transition: opacity 0.8s, -webkit-transform 0.8s;\n    transition: opacity 0.8s, transform 0.8s;\n    transition: opacity 0.8s, transform 0.8s, -webkit-transform 0.8s;\n}\n\n.style__leave___24Fs2 {\n    opacity: 1;\n    -webkit-transform: scale(1);\n        -ms-transform: scale(1);\n            transform: scale(1);\n}\n\n.style__leave-active___3bda8 {\n    opacity: 0.01;\n    -webkit-transform: scale(0.01);\n        -ms-transform: scale(0.01);\n            transform: scale(0.01);\n    transition: opacity 0.5s, -webkit-transform 0.5s;\n    transition: opacity 0.5s, transform 0.5s;\n    transition: opacity 0.5s, transform 0.5s, -webkit-transform 0.5s;\n}\n", ""]);

// exports
exports.locals = {
	"overlay": "style__overlay___1F4_X",
	"close-button": "style__close-button___1ow_E",
	"fullscreen": "style__fullscreen___1XD0i",
	"modale": "style__modale___2ddo9",
	"enter": "style__enter___1TsM6",
	"enter-active": "style__enter-active___cOvkb",
	"leave": "style__leave___24Fs2",
	"leave-active": "style__leave-active___3bda8"
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
exports.push([module.i, "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n\nbody {\n    box-sizing: border-box;\n    background-color: #fdfaf2;\n}\n\n* {\n    font-family: 'Lato', sans-serif;\n    box-sizing: inherit;\n}\n", ""]);

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


var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 41);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ 42);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_preset_env__ = __webpack_require__(/*! babel-preset-env */ 38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_preset_env___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_preset_env__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_preset_react__ = __webpack_require__(/*! babel-preset-react */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_preset_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_preset_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_preset_stage_1__ = __webpack_require__(/*! babel-preset-stage-1 */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_preset_stage_1___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_preset_stage_1__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_plugin_react_require__ = __webpack_require__(/*! babel-plugin-react-require */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_plugin_react_require___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_plugin_react_require__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_plugin_transform_export_default_name_forked__ = __webpack_require__(/*! babel-plugin-transform-export-default-name-forked */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_plugin_transform_export_default_name_forked___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_plugin_transform_export_default_name_forked__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_plugin_minify_replace__ = __webpack_require__(/*! babel-plugin-minify-replace */ 32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_plugin_minify_replace___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_plugin_minify_replace__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_plugin_transform_node_env_inline__ = __webpack_require__(/*! babel-plugin-transform-node-env-inline */ 35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_plugin_transform_node_env_inline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_plugin_transform_node_env_inline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_plugin_minify_dead_code_elimination__ = __webpack_require__(/*! babel-plugin-minify-dead-code-elimination */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_plugin_minify_dead_code_elimination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_plugin_minify_dead_code_elimination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_plugin_minify_guarded_expressions__ = __webpack_require__(/*! babel-plugin-minify-guarded-expressions */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_plugin_minify_guarded_expressions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_plugin_minify_guarded_expressions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_plugin_discard_module_references__ = __webpack_require__(/*! babel-plugin-discard-module-references */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_plugin_discard_module_references___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_plugin_discard_module_references__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_react_jsx_source__ = __webpack_require__(/*! babel-plugin-transform-react-jsx-source */ 37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_react_jsx_source___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_babel_plugin_transform_react_jsx_source__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_babel_plugin_transform_react_jsx_self__ = __webpack_require__(/*! babel-plugin-transform-react-jsx-self */ 36);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_mergewith__ = __webpack_require__(/*! lodash.mergewith */ 53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_mergewith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_mergewith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webpack__ = __webpack_require__(/*! webpack */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serviceworker_webpack_plugin__ = __webpack_require__(/*! serviceworker-webpack-plugin */ 78);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(/*! webpack */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_case_sensitive_paths_webpack_plugin__ = __webpack_require__(/*! case-sensitive-paths-webpack-plugin */ 43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_case_sensitive_paths_webpack_plugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_case_sensitive_paths_webpack_plugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dev_utils_WatchMissingNodeModulesPlugin__ = __webpack_require__(/*! react-dev-utils/WatchMissingNodeModulesPlugin */ 62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dev_utils_WatchMissingNodeModulesPlugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dev_utils_WatchMissingNodeModulesPlugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_postcss_omit_import_tilde__ = __webpack_require__(/*! postcss-omit-import-tilde */ 58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_postcss_omit_import_tilde___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_postcss_omit_import_tilde__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_postcss_import__ = __webpack_require__(/*! postcss-import */ 57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_postcss_import___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_postcss_import__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_postcss_url__ = __webpack_require__(/*! postcss-url */ 60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_postcss_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_postcss_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_postcss_cssnext__ = __webpack_require__(/*! postcss-cssnext */ 56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_postcss_cssnext___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_postcss_cssnext__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_postcss_browser_reporter__ = __webpack_require__(/*! postcss-browser-reporter */ 55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_postcss_browser_reporter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_postcss_browser_reporter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_postcss_reporter__ = __webpack_require__(/*! postcss-reporter */ 59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_postcss_reporter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_postcss_reporter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_path__ = __webpack_require__(/*! path */ 15);
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
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk__ = __webpack_require__(/*! chalk */ 9);
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

const path = __webpack_require__(/*! path */ 15);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_helmet__ = __webpack_require__(/*! react-helmet */ 4);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_compose__ = __webpack_require__(/*! koa-compose */ 48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_compose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_compose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_etag__ = __webpack_require__(/*! koa-etag */ 50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_etag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_etag__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_conditional_get__ = __webpack_require__(/*! koa-conditional-get */ 49);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_string_escape__ = __webpack_require__(/*! js-string-escape */ 46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_string_escape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_js_string_escape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(/*! react-router */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(/*! prop-types */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_helmet__ = __webpack_require__(/*! react-helmet */ 4);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(/*! react-helmet */ 4);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 3);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server__ = __webpack_require__(/*! react-dom/server */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(/*! react-helmet */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk__ = __webpack_require__(/*! chalk */ 9);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url__ = __webpack_require__(/*! url */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static__ = __webpack_require__(/*! koa-static */ 52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_static__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_mount__ = __webpack_require__(/*! koa-mount */ 51);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server__ = __webpack_require__(/*! react-dom/server */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(/*! react-helmet */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_resolver__ = __webpack_require__(/*! react-resolver */ 63);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url__ = __webpack_require__(/*! url */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(/*! koa */ 47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__(/*! express */ 44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk__ = __webpack_require__(/*! chalk */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch__ = __webpack_require__(/*! node-fetch */ 54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_readline__ = __webpack_require__(/*! readline */ 66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_readline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_readline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_http_graceful_shutdown__ = __webpack_require__(/*! http-graceful-shutdown */ 45);
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
        const webpack = __webpack_require__(/*! webpack */ 12);
        const clientBuildConfig = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__config_build_webpack_config_client__["a" /* default */])(_extends({
            hot: true,
            dev: true
        }, __WEBPACK_IMPORTED_MODULE_8__config___default.a));

        const compiler = webpack(clientBuildConfig);
        let clientBuilt = false;
        const parsedPublicPath = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_url__["parse"])(__WEBPACK_IMPORTED_MODULE_8__config___default.a.publicPath).pathname || '';
        app.use(__webpack_require__(/*! webpack-dev-middleware */ 79)(compiler, {
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
        app.use(__webpack_require__(/*! webpack-hot-middleware */ 80)(compiler, {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(/*! react-redux */ 2);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(/*! prop-types */ 3);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(/*! redux */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux__ = __webpack_require__(/*! react-router-redux */ 64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk__ = __webpack_require__(/*! redux-thunk */ 67);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vitaminjs_react_helmet__ = __webpack_require__(/*! vitaminjs/react-helmet */ "./node_modules/vitaminjs/react-helmet.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_global_css__ = __webpack_require__(/*! ./style.global.css */ "./src/style.global.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_global_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_global_css__);
var _jsxFileName = '/home/johan/Project/Vagalam/src/App.jsx',
    _this = this;







/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_3__style_global_css___default.a)(({ children }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 7
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_vitaminjs_react_helmet__["a" /* default */], {
        title: 'Vagalam',
        meta: [{
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        }],
        link: [{
            href: 'https://fonts.googleapis.com/css?family=Crimson+Text|Lato',
            rel: 'stylesheet'
        }],
        script: [{
            innerHTML: `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
  analytics.load("MU4inBjkrvhUp3WuzqnO9eeBllyXEliM");
  analytics.page();
  }}();`
        }],
        __source: {
            fileName: _jsxFileName,
            lineNumber: 8
        },
        __self: _this
    }),
    children
)));

/***/ }),

/***/ "./src/Landing/background4.jpg":
/* no static exports found */
/* exports used: default */
/*!*************************************!*\
  !*** ./src/Landing/background4.jpg ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "files/69b092c386b258d0aa21569f13b95552.jpg";

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_motion__ = __webpack_require__(/*! react-motion */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_motion___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_motion__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_ui_element_Button_Link__ = __webpack_require__(/*! ../shared/ui-element/Button/Link */ "./src/shared/ui-element/Button/Link.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_ui_element_FrameLayout__ = __webpack_require__(/*! ../shared/ui-element/FrameLayout */ "./src/shared/ui-element/FrameLayout/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__background4_jpg__ = __webpack_require__(/*! ./background4.jpg */ "./src/Landing/background4.jpg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__background4_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__background4_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Landing/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__style_css__);
var _jsxFileName = '/home/johan/Project/Vagalam/src/Landing/index.jsx';










const SPRING_CONFIG = {
    stiffness: 80,
    damping: 80
};
class Landing extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.registerCTARef = CTARef => {
            this.CTARef = CTARef;
        };

        this.handleMouseEnter = () => {
            this.setState({ mouseOverCTA: true });
        };

        this.handleMouseOut = () => {
            this.setState({ mouseOverCTA: false });
        };

        this.state = {
            mouseOverCTA: false,
            glowCycle: 0
        };
    }
    componentDidMount() {
        setInterval(() => this.setState({ glowCycle: 1 }), 1000);
        setInterval(() => this.setState({ glowCycle: 0 }), 600);
    }

    render() {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4__shared_ui_element_FrameLayout__["a" /* default */],
            { freeRatio: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 38
                },
                __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'section',
                { className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.header, onMouseOut: this.handleMouseOut, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 39
                    },
                    __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_2_react_motion__["Motion"],
                    {
                        style: {
                            saturate: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_motion__["spring"])(this.state.mouseOverCTA ? 100 : 0, SPRING_CONFIG),
                            glowOffset: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_motion__["spring"])(this.state.mouseOverCTA ? this.state.glowCycle * 50 : 0, SPRING_CONFIG)
                        },
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 40
                        },
                        __self: this
                    },
                    ({ saturate, glowOffset }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', {
                        className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.background,
                        style: {
                            backgroundImage: `url(${__WEBPACK_IMPORTED_MODULE_5__background4_jpg___default.a})`,
                            filter: `saturate(${saturate + glowOffset}%)`
                        },
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 50
                        },
                        __self: this
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'header',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 59
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'h1',
                        {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 60
                            },
                            __self: this
                        },
                        ' \\Vagalam\\ '
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'h2',
                        {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 61
                            },
                            __self: this
                        },
                        ' Le blog int\xE9ractif de mon tour du monde \xE0 v\xE9lo '
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    {
                        className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.cta,
                        onMouseEnter: this.handleMouseEnter,
                        onMouseOut: this.handleMouseOut,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 63
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_3__shared_ui_element_Button_Link__["a" /* default */],
                        { registerRef: this.registerCTARef, href: '/voyage', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 68
                            },
                            __self: this
                        },
                        'Parcourir le voyage'
                    )
                )
            )
        );
    }
}
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_6__style_css___default.a)(Landing));

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__(/*! ramda */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__selectors__ = __webpack_require__(/*! ./selectors */ "./src/Trip/Details/selectors.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/Details/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__style_css__);
var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/Details/index.jsx',
    _this = this;








const Details = ({ currentDayNumber }) => currentDayNumber ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    { className: __WEBPACK_IMPORTED_MODULE_5__style_css___default.a.details, __source: {
            fileName: _jsxFileName,
            lineNumber: 9
        },
        __self: _this
    },
    'Jour ',
    currentDayNumber
) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'em',
    { className: __WEBPACK_IMPORTED_MODULE_5__style_css___default.a['press-space'], __source: {
            fileName: _jsxFileName,
            lineNumber: 11
        },
        __self: _this
    },
    ' Appuyez sur Espace pour commencer '
);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ramda__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(__WEBPACK_IMPORTED_MODULE_4__selectors__["a" /* default */]), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_5__style_css___default.a))(Details));

/***/ }),

/***/ "./src/Trip/Details/selectors.js":
/* exports provided: default */
/* exports used: default */
/*!***************************************!*\
  !*** ./src/Trip/Details/selectors.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(/*! reselect */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__(/*! ramda */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectors__ = __webpack_require__(/*! ../selectors */ "./src/Trip/selectors.js");





const currentDayNumberSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_2__selectors__["b" /* currentPathSelector */], currentPath => {
    const lastSleepLocation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["last"])(currentPath.filter(({ type }) => type === 'sleep_location'));
    return lastSleepLocation ? lastSleepLocation.dayNumber : null;
});
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

/***/ "./src/Trip/LastPointModale/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!********************************************!*\
  !*** ./src/Trip/LastPointModale/index.jsx ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(/*! react-redux */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__(/*! ramda */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__selectors__ = __webpack_require__(/*! ../selectors */ "./src/Trip/selectors.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_ui_element_Modale__ = __webpack_require__(/*! ../../shared/ui-element/Modale */ "./src/shared/ui-element/Modale/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_Visitor_EmailForm__ = __webpack_require__(/*! ../../shared/Visitor/EmailForm */ "./src/shared/Visitor/EmailForm.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_Visitor_selectors__ = __webpack_require__(/*! ../../shared/Visitor/selectors */ "./src/shared/Visitor/selectors.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/LastPointModale/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__style_css__);
var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/LastPointModale/index.jsx',
    _this = this;











const LastPointModale = ({ isOpened, visitorEmail }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_5__shared_ui_element_Modale__["a" /* default */],
    { isOpened: isOpened, __source: {
            fileName: _jsxFileName,
            lineNumber: 17
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_8__style_css___default.a.modale, __source: {
                fileName: _jsxFileName,
                lineNumber: 18
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h3',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                },
                __self: _this
            },
            'Le blog s\'arr\xEAte ici...'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 20
                },
                __self: _this
            },
            'Mais pas le voyage ! Ce blog est mis \xE0 jour en continu, n\'h\xE9sites pas \xE0 revenir d\'ici quelques jours pour suivre les nouvelles aventures !'
        ),
        !visitorEmail ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 25
                },
                __self: _this
            },
            'Tu peux aussi laisser ton email pour \xEAtre pr\xE9venu quand il y a du nouveau.'
        ) : null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__shared_Visitor_EmailForm__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 27
            },
            __self: _this
        })
    )
);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ramda__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(state => ({
    isOpened: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__selectors__["d" /* userArrivedToLastPointSelector */])(state),
    visitorEmail: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared_Visitor_selectors__["a" /* emailSelector */])(state)
})), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_8__style_css___default.a))(LastPointModale));

/***/ }),

/***/ "./src/Trip/LastPointModale/style.css":
/* no static exports found */
/* exports used: default */
/*!********************************************!*\
  !*** ./src/Trip/LastPointModale/style.css ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/LastPointModale/style.css");
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
      module.hot.accept(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/LastPointModale/style.css", function() {
        content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/LastPointModale/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/Trip/Map/MapPointMarker/TentIcon.jsx":
/* exports provided: default */
/* exports used: default */
/*!**************************************************!*\
  !*** ./src/Trip/Map/MapPointMarker/TentIcon.jsx ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "/home/johan/Project/Vagalam/src/Trip/Map/MapPointMarker/TentIcon.jsx",
    _this = this;


/* harmony default export */ __webpack_exports__["a"] = (function tentIcon() {
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

/***/ "./src/Trip/Map/MapPointMarker/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!***********************************************!*\
  !*** ./src/Trip/Map/MapPointMarker/index.jsx ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_freactal__ = __webpack_require__(/*! freactal */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_freactal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_freactal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__(/*! ramda */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/Map/MapPointMarker/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__TentIcon__ = __webpack_require__(/*! ./TentIcon */ "./src/Trip/Map/MapPointMarker/TentIcon.jsx");
var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/Map/MapPointMarker/index.jsx',
    _this = this;









const Marker = ({
    state: { zoom },
    type
}) => {
    if (zoom < 4 || type === 'point_of_interest') {
        return null;
    }
    const size = zoom > 7 ? 24 : zoom > 6 ? 12 : /* otherwise */4;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
            style: {
                height: `${size}px`,
                width: `${size}px`,
                padding: `${size / 6}px`,
                borderColor: zoom > 6 ? 'black' : 'transparent',
                backgroundColor: 'white'
            },
            className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.icon,
            __source: {
                fileName: _jsxFileName,
                lineNumber: 21
            },
            __self: _this
        },
        type === 'sleep_location' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__TentIcon__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 31
            },
            __self: _this
        }) : null
    );
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ramda__["compose"])(__WEBPACK_IMPORTED_MODULE_1_freactal__["injectState"], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_4__style_css___default.a))(Marker));

/***/ }),

/***/ "./src/Trip/Map/MapPointMarker/style.css":
/* no static exports found */
/* exports used: default */
/*!***********************************************!*\
  !*** ./src/Trip/Map/MapPointMarker/style.css ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Map/MapPointMarker/style.css");
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
      module.hot.accept(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Map/MapPointMarker/style.css", function() {
        content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Map/MapPointMarker/style.css");

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_line_distance__ = __webpack_require__(/*! @turf/line-distance */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_line_distance___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__turf_line_distance__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_line_slice_along__ = __webpack_require__(/*! @turf/line-slice-along */ 27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_line_slice_along___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__turf_line_slice_along__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_motion__ = __webpack_require__(/*! react-motion */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_motion___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_motion__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_redux__ = __webpack_require__(/*! react-redux */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ramda__ = __webpack_require__(/*! ramda */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_freactal__ = __webpack_require__(/*! freactal */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_freactal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_freactal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__selectors__ = __webpack_require__(/*! ./selectors */ "./src/Trip/Map/selectors.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__actions__ = __webpack_require__(/*! ../actions */ "./src/Trip/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__MapPointMarker__ = __webpack_require__(/*! ./MapPointMarker */ "./src/Trip/Map/MapPointMarker/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/Map/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__config__ = __webpack_require__(/*! ../../config */ "./src/config.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/Map/index.jsx';



















let Mapbox = new Proxy({}, {
    get: (target, name) => target[name] || (() => null)
});

const INITIAL_ZOOM = [8];
const STYLE_URL = 'mapbox://styles/ganceab/cj60tjdxq0asi2rppfum27wau';
const withMapZoomControl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_freactal__["provideState"])({
    initialState: () => ({
        zoom: INITIAL_ZOOM
    }),
    effects: {
        updateMap: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_freactal__["update"])((_, map) => ({ zoom: map.getZoom() }))
    }
});

class Map extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.handleAnimatonEnd = () => {
            this.setState({ isMapCurrentlyAnimated: false });
            // Waiting for marker to appear
            setTimeout(this.props.onAnimationEnd, 300);
        };

        this.state = {
            isMapCurrentlyAnimated: false
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentPath && this.props.currentPath && this.props.currentPath.length !== nextProps.currentPath.length) {
            this.setState({ isMapCurrentlyAnimated: true });
        }
    }

    render() {
        const { effects: { updateMap }, displayedTripLineString, currentPath, style } = this.props;
        const currentMapPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_ramda__["last"])(currentPath);
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            Mapbox.Map,
            {
                center: currentMapPoint ? currentMapPoint.coordinates : [2.3738311, 48.8841141],
                containerStyle: _extends({
                    height: '100%',
                    backgroundColor: 'black'
                }, style),
                zoom: INITIAL_ZOOM,
                mapboxApiAccessToken: __WEBPACK_IMPORTED_MODULE_12__config__["a" /* default */].mapboxAccessToken,
                style: STYLE_URL,
                onMove: updateMap,
                onStyleLoad: updateMap,
                movingMethod: 'easeTo',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 80
                },
                __self: this
            },
            displayedTripLineString ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_4_react_motion__["Motion"],
                {
                    defaultStyle: { distance: 0 },
                    style: {
                        distance: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_motion__["spring"])(__WEBPACK_IMPORTED_MODULE_2__turf_line_distance___default()(displayedTripLineString), {
                            stiffness: 170,
                            damping: 55,
                            precision: 1
                        })
                    },
                    onRest: this.handleAnimatonEnd,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 95
                    },
                    __self: this
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
                        lineNumber: 108
                    },
                    __self: this
                }) : null
            ) : null,
            currentPath.slice(0, this.state.isMapCurrentlyAnimated ? -1 : currentPath.length).map(mapPoint => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                Mapbox.Marker,
                {
                    key: mapPoint.coordinates.join(),
                    coordinates: mapPoint.coordinates,
                    anchor: 'center',
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 126
                    },
                    __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__MapPointMarker__["a" /* default */], { type: mapPoint.type, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 131
                    },
                    __self: this
                })
            ))
        );
    }
}

Map.defaultProps = {
    style: {}
};
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_ramda__["compose"])(withMapZoomControl, __WEBPACK_IMPORTED_MODULE_7_freactal__["injectState"], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_react_redux__["connect"])(__WEBPACK_IMPORTED_MODULE_8__selectors__["a" /* default */], {
    onAnimationEnd: __WEBPACK_IMPORTED_MODULE_9__actions__["b" /* notifyAnimationEnd */]
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_11__style_css___default.a))(Map));

/***/ }),

/***/ "./src/Trip/Map/selectors.js":
/* exports provided: default */
/* exports used: default */
/*!***********************************!*\
  !*** ./src/Trip/Map/selectors.js ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(/*! reselect */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__(/*! ramda */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_helpers__ = __webpack_require__(/*! @turf/helpers */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_meta__ = __webpack_require__(/*! @turf/meta */ 28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_meta___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__turf_meta__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__turf_line_slice__ = __webpack_require__(/*! @turf/line-slice */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__turf_line_slice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__turf_line_slice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__turf_bezier__ = __webpack_require__(/*! @turf/bezier */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__turf_bezier___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__turf_bezier__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__selectors__ = __webpack_require__(/*! ../selectors */ "./src/Trip/selectors.js");












const TRIP_STARTING_POINT = [2.3738311, 48.8841141];

function bezierCoord(resolution, coordinates) {
    return coordinates.length >= 2 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__turf_meta__["coordAll"])(__WEBPACK_IMPORTED_MODULE_5__turf_bezier___default()(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__["lineString"])(coordinates), resolution, 0.6)) : coordinates;
}

const SMOOTH_LINE_NUMBER = 25;
const wholeTripLineStringSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_6__selectors__["e" /* pathSelector */], path => {
    const coordinates = [TRIP_STARTING_POINT, ...path.map(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["prop"])('coordinates'))];
    if (coordinates.length < 2) {
        return null;
    }
    const [roughLine, smoothLine] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["splitAt"])(-SMOOTH_LINE_NUMBER, coordinates);
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__["lineString"])([...roughLine, ...bezierCoord(20000, smoothLine)]);
});

const displayedTripLineStringSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(wholeTripLineStringSelector, __WEBPACK_IMPORTED_MODULE_6__selectors__["b" /* currentPathSelector */], (tripLineString, currentPath) => {
    const currentMapPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["last"])(currentPath);
    if (!tripLineString || !currentMapPoint) {
        return null;
    }
    return __WEBPACK_IMPORTED_MODULE_4__turf_line_slice___default()(TRIP_STARTING_POINT, currentMapPoint.coordinates, tripLineString);
});

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createStructuredSelector"])({
    displayedTripLineString: displayedTripLineStringSelector,
    currentPath: __WEBPACK_IMPORTED_MODULE_6__selectors__["b" /* currentPathSelector */]
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

/***/ "./src/Trip/Posts/Pictures/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!*******************************************!*\
  !*** ./src/Trip/Posts/Pictures/index.jsx ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(/*! classnames */ 13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/Posts/Pictures/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);
var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/Posts/Pictures/index.jsx';






class Pictures extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.goToNextPicture = () => {
            this.setState(({ currentPicture }) => ({
                currentPicture: (currentPicture + 1) % this.props.pictures.length
            }));
        };

        this.state = {
            currentPicture: 0
        };
    }
    componentDidMount() {
        setInterval(this.goToNextPicture, 8000);
    }

    render() {
        const { pictures } = this.props;
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.pictures, onClick: this.goToNextPicture, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 24
                },
                __self: this
            },
            pictures.map((picture, i) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', {
                className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a.picture, {
                    [__WEBPACK_IMPORTED_MODULE_3__style_css___default.a.show]: this.state.currentPicture === i
                }),
                key: picture,
                style: { backgroundImage: `url(${picture})` },
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 26
                },
                __self: this
            }))
        );
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a)(Pictures));

/***/ }),

/***/ "./src/Trip/Posts/Pictures/style.css":
/* no static exports found */
/* exports used: default */
/*!*******************************************!*\
  !*** ./src/Trip/Posts/Pictures/style.css ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Posts/Pictures/style.css");
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
      module.hot.accept(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Posts/Pictures/style.css", function() {
        content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Posts/Pictures/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/Trip/Posts/Post/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!***************************************!*\
  !*** ./src/Trip/Posts/Post/index.jsx ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pictures__ = __webpack_require__(/*! ../Pictures */ "./src/Trip/Posts/Pictures/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/Posts/Post/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);
var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/Posts/Post/index.jsx',
    _this = this;







const Post = ({ title, content, pictures }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 9
        },
        __self: _this
    },
    pictures.length ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.pictures, __source: {
                fileName: _jsxFileName,
                lineNumber: 11
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Pictures__["a" /* default */], { pictures: pictures, __source: {
                fileName: _jsxFileName,
                lineNumber: 12
            },
            __self: _this
        })
    ) : null,
    content ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
            className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.content,
            style: { alignSelf: pictures.length ? 'stretch' : 'center' },
            __source: {
                fileName: _jsxFileName,
                lineNumber: 17
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h1',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 21
                },
                __self: _this
            },
            title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.body,
            dangerouslySetInnerHTML: {
                __html: content
            },
            __source: {
                fileName: _jsxFileName,
                lineNumber: 24
            },
            __self: _this
        })
    ) : null
);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a)(Post));

/***/ }),

/***/ "./src/Trip/Posts/Post/style.css":
/* no static exports found */
/* exports used: default */
/*!***************************************!*\
  !*** ./src/Trip/Posts/Post/style.css ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Posts/Post/style.css");
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
      module.hot.accept(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Posts/Post/style.css", function() {
        content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/Trip/Posts/Post/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/Trip/Posts/actions.js":
/* exports provided: addFetchedPosts */
/* exports used: addFetchedPosts */
/*!***********************************!*\
  !*** ./src/Trip/Posts/actions.js ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addFetchedPosts;


function addFetchedPosts(posts) {
    return {
        type: 'app/trip/posts/ADD_FETCHED_POSTS',
        posts
    };
}

/***/ }),

/***/ "./src/Trip/Posts/epic.js":
/* exports provided: default */
/* exports used: default */
/*!********************************!*\
  !*** ./src/Trip/Posts/epic.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(/*! rxjs/Observable */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_fromPromise__ = __webpack_require__(/*! rxjs/add/observable/fromPromise */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__(/*! rxjs/add/observable/of */ 70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_mergeMap__ = __webpack_require__(/*! rxjs/add/operator/mergeMap */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(/*! rxjs/add/operator/map */ 74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__(/*! rxjs/add/operator/filter */ 73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_bufferTime__ = __webpack_require__(/*! rxjs/add/operator/bufferTime */ 71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_bufferTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_bufferTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do__ = __webpack_require__(/*! rxjs/add/operator/do */ 72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prismic_io__ = __webpack_require__(/*! prismic.io */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prismic_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prismic_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_prismic_dom__ = __webpack_require__(/*! prismic-dom */ 61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_prismic_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_prismic_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__actions__ = __webpack_require__(/*! ./actions */ "./src/Trip/Posts/actions.js");













const proxyWithGoogleImageResizer = pictureUrl => `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?url=${pictureUrl}&container=focus&resize_h=1080&refresh=31536000`;

function fetchPosts(postIds) {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_8_prismic_io___default.a.api('http://vagalam.prismic.io/api').then(api => api.query(__WEBPACK_IMPORTED_MODULE_8_prismic_io___default.a.Predicates.in('document.id', postIds), {}))).map(response => response.results).map(postsApi => postsApi.map(postApi => ({
        id: postApi.id,
        type: postApi.data['post.content'] ? 'Article' : 'Gallery',
        title: postApi.data['post.title'] && __WEBPACK_IMPORTED_MODULE_9_prismic_dom___default.a.RichText.asText(postApi.data['post.title'].value),
        content: postApi.data['post.content'] && __WEBPACK_IMPORTED_MODULE_9_prismic_dom___default.a.RichText.asHtml(postApi.data['post.content'].value),
        pictures: postApi.data['post.pictures'] ? postApi.data['post.pictures'].value.map(value => proxyWithGoogleImageResizer(value.picture.value.main.url)) : []
    })));
}

const fetchPostsEpic = $action => __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge($action.ofType('app/trip/ADD_FETCHED_SLEEP_LOCATIONS').map(({ sleepLocations }) => sleepLocations), $action.ofType('app/trip/ADD_FETCHED_POINTS_OF_INTEREST').map(({ pointsOfInterest }) => pointsOfInterest)).mergeMap(resources => __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(...resources.map(({ postId }) => postId))).filter(Boolean)
// $FlowFixMe: rxJS flow typed API not up to date
.bufferTime(2000, 2000, 10).filter(postIds => postIds.length).mergeMap(fetchPosts).map(__WEBPACK_IMPORTED_MODULE_10__actions__["a" /* addFetchedPosts */]);

/* harmony default export */ __webpack_exports__["a"] = (fetchPostsEpic);

/***/ }),

/***/ "./src/Trip/Posts/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!**********************************!*\
  !*** ./src/Trip/Posts/index.jsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda__ = __webpack_require__(/*! ramda */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__selectors__ = __webpack_require__(/*! ./selectors */ "./src/Trip/Posts/selectors.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Post__ = __webpack_require__(/*! ./Post */ "./src/Trip/Posts/Post/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_ui_element_Modale__ = __webpack_require__(/*! ../../shared/ui-element/Modale */ "./src/shared/ui-element/Modale/index.jsx");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/Posts/index.jsx',
    _this = this;








const PostOverlay = ({ currentPost }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_5__shared_ui_element_Modale__["a" /* default */],
    { isOpened: !!currentPost, fullScreen: currentPost && !!currentPost.pictures.length, __source: {
            fileName: _jsxFileName,
            lineNumber: 14
        },
        __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Post__["a" /* default */], _extends({}, currentPost, {
        __source: {
            fileName: _jsxFileName,
            lineNumber: 15
        },
        __self: _this
    }))
);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ramda__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(state => ({
    currentPost: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__selectors__["b" /* currentPostSelector */])(state)
})))(PostOverlay));

/***/ }),

/***/ "./src/Trip/Posts/reducer.js":
/* exports provided: default */
/* exports used: default */
/*!***********************************!*\
  !*** ./src/Trip/Posts/reducer.js ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = postsReducer;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function postsReducer(state = {}, action) {
    switch (action.type) {
        case 'app/trip/posts/ADD_FETCHED_POSTS':
            return action.posts.reduce((postsMap, post) => _extends({}, postsMap, {
                [post.id]: post
            }), state);
        default:
            return state;
    }
}

/***/ }),

/***/ "./src/Trip/Posts/selectors.js":
/* exports provided: currentPostSelector, hasFullScreenPostSelector */
/* exports used: hasFullScreenPostSelector, currentPostSelector */
/*!*************************************!*\
  !*** ./src/Trip/Posts/selectors.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(/*! ramda */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reselect__ = __webpack_require__(/*! reselect */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectors__ = __webpack_require__(/*! ../selectors */ "./src/Trip/selectors.js");





const currentPostSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_2__selectors__["a" /* postsSelector */], __WEBPACK_IMPORTED_MODULE_2__selectors__["b" /* currentPathSelector */], __WEBPACK_IMPORTED_MODULE_2__selectors__["c" /* currentAnimationSelector */], (posts, currentPath, currentAnimation) => {
    if (currentAnimation === 'Map') {
        return null;
    }
    const currentMapPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["last"])(currentPath);
    if (!currentMapPoint || !currentMapPoint.postId) {
        return null;
    }
    const currentPost = posts[currentMapPoint.postId];
    if (!currentPost) {
        throw new Error('The post id was not fetched');
    }
    return currentPost;
});
/* harmony export (immutable) */ __webpack_exports__["b"] = currentPostSelector;


const hasFullScreenPostSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_reselect__["createSelector"])(currentPostSelector, currentPost => currentPost && currentPost.pictures.length);
/* harmony export (immutable) */ __webpack_exports__["a"] = hasFullScreenPostSelector;


/***/ }),

/***/ "./src/Trip/actions.js":
/* exports provided: goToNextStep, addFetchedSleepLocations, addFetchedPointsOfInterest, notifyAnimationEnd */
/* exports used: goToNextStep, notifyAnimationEnd, addFetchedSleepLocations, addFetchedPointsOfInterest */
/*!*****************************!*\
  !*** ./src/Trip/actions.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = goToNextStep;
/* harmony export (immutable) */ __webpack_exports__["c"] = addFetchedSleepLocations;
/* harmony export (immutable) */ __webpack_exports__["d"] = addFetchedPointsOfInterest;
/* harmony export (immutable) */ __webpack_exports__["b"] = notifyAnimationEnd;


function goToNextStep() {
    return {
        type: 'app/trip/GO_TO_NEXT_STEP'
    };
}


function addFetchedSleepLocations(sleepLocations) {
    return {
        type: 'app/trip/ADD_FETCHED_SLEEP_LOCATIONS',
        sleepLocations
    };
}

function addFetchedPointsOfInterest(pointsOfInterest) {
    return {
        type: 'app/trip/ADD_FETCHED_POINTS_OF_INTEREST',
        pointsOfInterest
    };
}

function notifyAnimationEnd() {
    return {
        type: 'app/trip/CURRENT_ANIMATION_ENDED'
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(/*! rxjs/Observable */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_merge__ = __webpack_require__(/*! rxjs/add/operator/merge */ 75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap__ = __webpack_require__(/*! rxjs/add/operator/mergeMap */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_startWith__ = __webpack_require__(/*! rxjs/add/operator/startWith */ 76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__ = __webpack_require__(/*! rxjs/add/operator/filter */ 73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__ = __webpack_require__(/*! rxjs/add/observable/fromPromise */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_empty__ = __webpack_require__(/*! rxjs/add/observable/empty */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_empty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_empty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_merge__ = __webpack_require__(/*! rxjs/add/observable/merge */ 69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_redux_observable__ = __webpack_require__(/*! redux-observable */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_redux_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_redux_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_prismic_io__ = __webpack_require__(/*! prismic.io */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_prismic_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_prismic_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Posts_epic__ = __webpack_require__(/*! ./Posts/epic */ "./src/Trip/Posts/epic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__actions__ = __webpack_require__(/*! ./actions */ "./src/Trip/actions.js");
















const getPostId = (type, apiResponse) => {
    const post = apiResponse.data[`${type}.post`];
    return post ? post.value.document.id : null;
};
const fetchSleepLocationsAfter = id => __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_9_prismic_io___default.a.api('http://vagalam.prismic.io/api').then(api => api.query(__WEBPACK_IMPORTED_MODULE_9_prismic_io___default.a.Predicates.at('document.type', 'sleep_location'), {
    orderings: '[my.sleep_location.date]',
    pageSize: 10,
    after: id
})).then(response => response.results.map(apiSleepLocation => {
    const { longitude, latitude } = apiSleepLocation.data['sleep_location.location'].value;
    const endOfDay = new Date(apiSleepLocation.data['sleep_location.date'].value);
    endOfDay.setHours(23, 59, 59, 999);
    return {
        date: endOfDay.toISOString(),
        dayNumber: apiSleepLocation.data['sleep_location.day_number'].value,
        coordinates: [longitude, latitude],
        id: apiSleepLocation.id,
        postId: getPostId('sleep_location', apiSleepLocation),
        type: 'sleep_location'
    };
})).then(__WEBPACK_IMPORTED_MODULE_11__actions__["c" /* addFetchedSleepLocations */]));

const fetchPointOfInterestsAfter = id => __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_9_prismic_io___default.a.api('http://vagalam.prismic.io/api').then(api => api.query(__WEBPACK_IMPORTED_MODULE_9_prismic_io___default.a.Predicates.at('document.type', 'point_of_interest'), {
    orderings: '[my.point_of_interest.datetime]',
    pageSize: 10,
    after: id
})).then(response => response.results.map(apiPointOfInterest => {
    const { longitude, latitude } = apiPointOfInterest.data['point_of_interest.location'].value;
    return {
        date: apiPointOfInterest.data['point_of_interest.datetime'].value,
        coordinates: [longitude, latitude],
        id: apiPointOfInterest.id,
        postId: getPostId('point_of_interest', apiPointOfInterest),
        type: 'point_of_interest'
    };
})).then(__WEBPACK_IMPORTED_MODULE_11__actions__["d" /* addFetchedPointsOfInterest */]));

const goToNextStepEpic = (action$, store) => __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(action$.ofType('app/trip/GO_TO_NEXT_STEP'), action$.ofType('persist/REHYDRATE').filter(action => action.key === 'app::trip')).mergeMap(() => {
    const {
        currentMapPointId,
        fetchingStatus: { sleepLocations, pointsOfInterest }
    } = store.getState().app.trip;
    const request$Array = [];
    if (sleepLocations.nextFetchTrigger === currentMapPointId) {
        request$Array.push(fetchSleepLocationsAfter(sleepLocations.lastFetchedId));
    }
    if (pointsOfInterest.nextFetchTrigger === currentMapPointId) {
        request$Array.push(fetchPointOfInterestsAfter(pointsOfInterest.lastFetchedId));
    }
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(...request$Array);
});

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_redux_observable__["combineEpics"])(goToNextStepEpic, __WEBPACK_IMPORTED_MODULE_10__Posts_epic__["a" /* default */]));

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda__ = __webpack_require__(/*! ramda */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(/*! react-redux */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(/*! ./actions */ "./src/Trip/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Posts_selectors__ = __webpack_require__(/*! ./Posts/selectors */ "./src/Trip/Posts/selectors.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css__ = __webpack_require__(/*! ./style.css */ "./src/Trip/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Map__ = __webpack_require__(/*! ./Map */ "./src/Trip/Map/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Posts__ = __webpack_require__(/*! ./Posts */ "./src/Trip/Posts/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_ui_element_FrameLayout__ = __webpack_require__(/*! ../shared/ui-element/FrameLayout */ "./src/shared/ui-element/FrameLayout/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_FullScreenModale_index__ = __webpack_require__(/*! ../shared/FullScreenModale/index */ "./src/shared/FullScreenModale/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__LastPointModale_index__ = __webpack_require__(/*! ./LastPointModale/index */ "./src/Trip/LastPointModale/index.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Details__ = __webpack_require__(/*! ./Details */ "./src/Trip/Details/index.jsx");
var _jsxFileName = '/home/johan/Project/Vagalam/src/Trip/index.jsx';
















// eslint-disable-next-line no-shadow
class Trip extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this.handleKeyDown = e => {
            if (e.key === ' ') {
                this.props.goToNextStep();
            }
        }, _temp;
    }

    render() {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9__shared_ui_element_FrameLayout__["a" /* default */],
            {
                top: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/', className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.brand, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 34
                        },
                        __self: this
                    },
                    'Vagalam'
                ),
                bottom: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__Details__["a" /* default */], {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 38
                    },
                    __self: this
                }),
                onKeyDown: this.handleKeyDown,
                frameBackgroundColor: this.props.hasFullScreenPost ? 'black' : 'white',
                role: 'presentation',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 32
                },
                __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Map__["a" /* default */], {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 43
                },
                __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Posts__["a" /* default */], {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 44
                },
                __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__LastPointModale_index__["a" /* default */], {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 45
                },
                __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__shared_FullScreenModale_index__["a" /* default */], {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 46
                },
                __self: this
            })
        );
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ramda__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_react_redux__["connect"])(state => ({
    hasFullScreenPost: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Posts_selectors__["a" /* hasFullScreenPostSelector */])(state)
}), { goToNextStep: __WEBPACK_IMPORTED_MODULE_4__actions__["a" /* goToNextStep */] }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_6__style_css___default.a))(Trip));

/***/ }),

/***/ "./src/Trip/reducer.js":
/* exports provided: default */
/* exports used: default */
/*!*****************************!*\
  !*** ./src/Trip/reducer.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(/*! ramda */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(/*! redux */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_pipeReducers__ = __webpack_require__(/*! ../shared/pipeReducers */ "./src/shared/pipeReducers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Posts_reducer__ = __webpack_require__(/*! ./Posts/reducer */ "./src/Trip/Posts/reducer.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// $FlowFixMe: ramda flow typed API not up to date (ascend not present)






function pointsOfInterestFetchStatusReducer(state = { nextFetchTrigger: null, lastFetchedId: null }, action) {
    switch (action.type) {
        case 'app/trip/ADD_FETCHED_POINTS_OF_INTEREST':
            const lastPlaceOfInterest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["last"])(action.pointsOfInterest);
            const penultimatePlaceOfInterest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["nth"])(-2, action.pointsOfInterest);
            return _extends({}, lastPlaceOfInterest ? { lastFetchedId: lastPlaceOfInterest.id } : {}, {
                nextFetchTrigger: penultimatePlaceOfInterest && penultimatePlaceOfInterest.id
            });
        default:
            return state;
    }
}

function sleepLocationsFetchStatusReducer(state = { nextFetchTrigger: null, lastFetchedId: null }, action) {
    switch (action.type) {
        case 'app/trip/ADD_FETCHED_SLEEP_LOCATIONS':
            const lastSleepLocation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["last"])(action.sleepLocations);
            const penultimateSleepLocation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["nth"])(-2, action.sleepLocations);
            return _extends({}, lastSleepLocation ? { lastFetchedId: lastSleepLocation.id } : {}, {
                nextFetchTrigger: penultimateSleepLocation && penultimateSleepLocation.id
            });
        default:
            return state;
    }
}

function pathReducer(state = [], action) {
    let newMapPoints;
    switch (action.type) {
        case 'app/trip/ADD_FETCHED_POINTS_OF_INTEREST':
            newMapPoints = action.pointsOfInterest;
            break;
        case 'app/trip/ADD_FETCHED_SLEEP_LOCATIONS':
            newMapPoints = action.sleepLocations;
            break;
        default:
            return state;
    }
    return state.concat(newMapPoints).sort(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["ascend"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["prop"])('date')));
}

function currentMapPointIdReducer(state, action) {
    switch (action.type) {
        case 'app/trip/GO_TO_NEXT_STEP':
            const nextMapPoint = state.path[state.path.findIndex(({ id }) => id === state.currentMapPointId) + 1];
            if (!nextMapPoint) {
                return state;
            }
            return _extends({}, state, {
                currentMapPointId: nextMapPoint.id
            });
        default:
            return state;
    }
}

function userArrivedToLastPointReducer(state, action) {
    switch (action.type) {
        case 'app/trip/GO_TO_NEXT_STEP':
            const lastMapPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["last"])(state.path);
            return _extends({}, state, {
                userArrivedToLastPoint: !!lastMapPoint && state.currentMapPointId === lastMapPoint.id && !state.fetchingStatus.sleepLocations.nextFetchTrigger && !state.fetchingStatus.pointsOfInterest.nextFetchTrigger
            });
        default:
            return state;
    }
}

function currentAnimationReducer(state = null, action) {
    switch (action.type) {
        case 'app/trip/GO_TO_NEXT_STEP':
            return 'Map';
        case 'app/trip/CURRENT_ANIMATION_ENDED':
            return null;
        default:
            return state;
    }
}

let tripReducer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__shared_pipeReducers__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["combineReducers"])({
    path: pathReducer,
    fetchingStatus: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["combineReducers"])({
        sleepLocations: sleepLocationsFetchStatusReducer,
        pointsOfInterest: pointsOfInterestFetchStatusReducer
    }),
    currentMapPointId: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["defaultTo"])(null),
    posts: __WEBPACK_IMPORTED_MODULE_3__Posts_reducer__["a" /* default */],
    currentAnimation: currentAnimationReducer,
    userArrivedToLastPoint: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["defaultTo"])(false)
}), userArrivedToLastPointReducer, currentMapPointIdReducer);

const immutableTripReducer = tripReducer;
/* harmony default export */ __webpack_exports__["a"] = (immutableTripReducer);

/***/ }),

/***/ "./src/Trip/selectors.js":
/* exports provided: postsSelector, pathSelector, currentAnimationSelector, userArrivedToLastPointSelector, currentPathSelector */
/* exports used: postsSelector, currentPathSelector, currentAnimationSelector, userArrivedToLastPointSelector, pathSelector */
/*!*******************************!*\
  !*** ./src/Trip/selectors.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(/*! reselect */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__(/*! ramda */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rootSelectors__ = __webpack_require__(/*! ../rootSelectors */ "./src/rootSelectors.js");






const postsSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["pipe"])(__WEBPACK_IMPORTED_MODULE_2__rootSelectors__["a" /* tripSelector */], trip => trip.posts);
/* harmony export (immutable) */ __webpack_exports__["a"] = postsSelector;

const pathSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["pipe"])(__WEBPACK_IMPORTED_MODULE_2__rootSelectors__["a" /* tripSelector */], trip => trip.path);
/* harmony export (immutable) */ __webpack_exports__["e"] = pathSelector;

const currentAnimationSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["pipe"])(__WEBPACK_IMPORTED_MODULE_2__rootSelectors__["a" /* tripSelector */], trip => trip.currentAnimation);
/* harmony export (immutable) */ __webpack_exports__["c"] = currentAnimationSelector;

const userArrivedToLastPointSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["pipe"])(__WEBPACK_IMPORTED_MODULE_2__rootSelectors__["a" /* tripSelector */], trip => trip.userArrivedToLastPoint);
/* harmony export (immutable) */ __webpack_exports__["d"] = userArrivedToLastPointSelector;

const currentPathSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(pathSelector, ({ app: { trip: { currentMapPointId } } }) => currentMapPointId, (path, currentMapPointId) => {
    const currentMapPointIndex = path.findIndex(({ id }) => id === currentMapPointId);
    return path.slice(0, currentMapPointIndex + 1);
});
/* harmony export (immutable) */ __webpack_exports__["b"] = currentPathSelector;


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
    mapboxAccessToken: 'pk.eyJ1IjoiZ2FuY2VhYiIsImEiOiJjajQ0OHZjZzgxOGY3MndzOTh6YTFjbmNyIn0.0pHsI5xrBMh9YMftXmLQKw',
    mailchimp: {
        masterListId: 'f92f079c89',
        APIKey: 'a8aed636c7e74b7aaca2440befc7a338-us16',
        emailFrequencyIds: {
            ALWAYS: 'c771900d17',
            SOMETIMES: '0d75f6d649',
            NEVER: '0141ce329c'
        }
    }
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable__ = __webpack_require__(/*! redux-observable */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rootEpic__ = __webpack_require__(/*! ./rootEpic */ "./src/rootEpic.js");



const epicMiddleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux_observable__["createEpicMiddleware"])(__WEBPACK_IMPORTED_MODULE_1__rootEpic__["a" /* default */]);
/* harmony default export */ __webpack_exports__["a"] = ([epicMiddleware]);

/***/ }),

/***/ "./src/rootEpic.js":
/* exports provided: default */
/* exports used: default */
/*!*************************!*\
  !*** ./src/rootEpic.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable__ = __webpack_require__(/*! redux-observable */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Trip_epic__ = __webpack_require__(/*! ./Trip/epic */ "./src/Trip/epic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_Visitor_epic__ = __webpack_require__(/*! ./shared/Visitor/epic */ "./src/shared/Visitor/epic.js");




/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux_observable__["combineEpics"])(__WEBPACK_IMPORTED_MODULE_1__Trip_epic__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__shared_Visitor_epic__["a" /* default */]));

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(/*! redux */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Trip_reducer__ = __webpack_require__(/*! ./Trip/reducer */ "./src/Trip/reducer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_Visitor_reducer__ = __webpack_require__(/*! ./shared/Visitor/reducer */ "./src/shared/Visitor/reducer.js");




/* harmony default export */ __webpack_exports__["default"] = ({
    app: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
        trip: __WEBPACK_IMPORTED_MODULE_1__Trip_reducer__["a" /* default */],
        visitor: __WEBPACK_IMPORTED_MODULE_2__shared_Visitor_reducer__["a" /* default */]
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
var _jsxFileName = '/home/johan/Project/Vagalam/src/rootRoutes.jsx',
    _this = this;








/* harmony default export */ __webpack_exports__["a"] = (function rootRoutes() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__["a" /* Route */],
        { component: __WEBPACK_IMPORTED_MODULE_2__App__["a" /* default */], __source: {
                fileName: _jsxFileName,
                lineNumber: 12
            },
            __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__["a" /* Route */], { path: '/', component: __WEBPACK_IMPORTED_MODULE_4__Landing__["a" /* default */], __source: {
                fileName: _jsxFileName,
                lineNumber: 13
            },
            __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__["a" /* Route */], { path: '/voyage', component: __WEBPACK_IMPORTED_MODULE_3__Trip__["a" /* default */], __source: {
                fileName: _jsxFileName,
                lineNumber: 14
            },
            __self: _this
        })
    );
});

/***/ }),

/***/ "./src/rootSelectors.js":
/* exports provided: tripSelector, visitorSelector */
/* exports used: tripSelector, visitorSelector */
/*!******************************!*\
  !*** ./src/rootSelectors.js ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const tripSelector = state => state.app.trip;
/* harmony export (immutable) */ __webpack_exports__["a"] = tripSelector;


const visitorSelector = state => state.app.visitor;
/* harmony export (immutable) */ __webpack_exports__["b"] = visitorSelector;


/***/ }),

/***/ "./src/shared/FullScreenModale/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!***********************************************!*\
  !*** ./src/shared/FullScreenModale/index.jsx ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(/*! ./style.css */ "./src/shared/FullScreenModale/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);
var _jsxFileName = '/home/johan/Project/Vagalam/src/shared/FullScreenModale/index.jsx';





function isFullScreen() {
    const doc = window.document;
    return doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement;
}
function goFullScreen() {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

    if (!isFullScreen()) {
        requestFullScreen.call(docEl);
    }
}

class FullScreenPopup extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.handleKeyDown = e => {
            if (e.key === ' ') {
                this.handleGoFullScreen();
            }
        };

        this.handleGoFullScreen = () => {
            this.setState({ fullScreen: true, alreadyAsked: true });
            goFullScreen();
        };

        this.handleModaleClose = () => {
            this.setState({ alreadyAsked: true });
        };

        this.state = {
            alreadyAsked: false,
            isFullScreen: false
        };
    }

    render() {
        return null;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_2__style_css___default.a)(FullScreenPopup));

/***/ }),

/***/ "./src/shared/FullScreenModale/style.css":
/* no static exports found */
/* exports used: default */
/*!***********************************************!*\
  !*** ./src/shared/FullScreenModale/style.css ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/FullScreenModale/style.css");
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
      module.hot.accept(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/FullScreenModale/style.css", function() {
        content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/FullScreenModale/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/shared/Visitor/EmailForm.jsx":
/* exports provided: default */
/* exports used: default */
/*!******************************************!*\
  !*** ./src/shared/Visitor/EmailForm.jsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(/*! react-redux */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__(/*! ramda */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(/*! ./actions */ "./src/shared/Visitor/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectors__ = __webpack_require__(/*! ./selectors */ "./src/shared/Visitor/selectors.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css__ = __webpack_require__(/*! ./style.css */ "./src/shared/Visitor/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__style_css__);
var _jsxFileName = '/home/johan/Project/Vagalam/src/shared/Visitor/EmailForm.jsx';










class EmailForm extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.handleFormSubmit = e => {
            e.preventDefault();
            this.props.onVisitorSubmitEmail(this.state.email);
            this.setState({ emailSubmitted: true });
        };

        this.handleEmailChange = e => {
            this.setState({ email: e.target.value });
        };

        this.handleEmailPreferenceChange = e => {
            this.setState({ emailPreference: e.target.value });
            this.props.onEmailPreferenceChange(e.target.value);
        };

        this.state = {
            email: null,
            emailSubmitted: false,
            emailPreference: 'SOMETIMES'
        };
    }

    render() {
        if (this.props.email) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 47
                    },
                    __self: this
                },
                this.state.emailSubmitted ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'strong',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 48
                        },
                        __self: this
                    },
                    ' C\'est not\xE9 ! '
                ) : null,
                'Tu receveras un mail',
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'select',
                    {
                        className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.select,
                        value: this.state.emailPreference,
                        onChange: this.handleEmailPreferenceChange,
                        style: { fontFamily: 'inherit', fontSize: 'inherit' },
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 50
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'option',
                        { value: 'ALWAYS', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 56
                            },
                            __self: this
                        },
                        ' d\xE8s qu\'il y a du nouveau '
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'option',
                        { value: 'SOMETIMES', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 57
                            },
                            __self: this
                        },
                        ' de temps en temps '
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'option',
                        { value: 'NEVER', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 58
                            },
                            __self: this
                        },
                        'jamais (ou presque)'
                    )
                )
            );
        }

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'form',
            { className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.form, onSubmit: this.handleFormSubmit, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 65
                },
                __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'label',
                { htmlFor: 'email', className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.label, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 66
                    },
                    __self: this
                },
                'Email'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a['input-container'], __source: {
                        fileName: _jsxFileName,
                        lineNumber: 69
                    },
                    __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                    className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.input,
                    id: 'email',
                    type: 'email',
                    onChange: this.handleEmailChange,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 70
                    },
                    __self: this
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'submit', value: 'Suivre', className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.submit, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 76
                    },
                    __self: this
                })
            )
        );
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ramda__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(state => ({ email: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__selectors__["a" /* emailSelector */])(state) }), {
    onVisitorSubmitEmail: __WEBPACK_IMPORTED_MODULE_4__actions__["a" /* suscribe */],
    onEmailPreferenceChange: __WEBPACK_IMPORTED_MODULE_4__actions__["b" /* updateEmailPreference */]
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_6__style_css___default.a))(EmailForm));

/***/ }),

/***/ "./src/shared/Visitor/actions.js":
/* exports provided: updateEmailPreference, suscribe */
/* exports used: suscribe, updateEmailPreference */
/*!***************************************!*\
  !*** ./src/shared/Visitor/actions.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = updateEmailPreference;
/* harmony export (immutable) */ __webpack_exports__["a"] = suscribe;


function updateEmailPreference(emailPreference) {
    return {
        type: 'app/visitor/UPDATE_EMAIL_PREFERENCE',
        emailPreference
    };
}


function suscribe(email) {
    return {
        type: 'app/visitor/SUSCRIBE',
        email
    };
}

/***/ }),

/***/ "./src/shared/Visitor/epic.js":
/* exports provided: default */
/* exports used: default */
/*!************************************!*\
  !*** ./src/shared/Visitor/epic.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable__ = __webpack_require__(/*! redux-observable */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(/*! rxjs/Observable */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_dom_AjaxObservable__ = __webpack_require__(/*! rxjs/observable/dom/AjaxObservable */ 77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_dom_AjaxObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_dom_AjaxObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_dom_ajax__ = __webpack_require__(/*! rxjs/add/observable/dom/ajax */ 68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_dom_ajax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_dom_ajax__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_empty__ = __webpack_require__(/*! rxjs/add/observable/empty */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_empty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_empty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectors__ = __webpack_require__(/*! ./selectors */ "./src/shared/Visitor/selectors.js");








const suscribeEpic = $action => $action.ofType('app/visitor/subscribe').mergeMap(({ email }) => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_dom_AjaxObservable__["ajaxPost"])(`/on_visitor_suscribe/${encodeURIComponent(email)}`));

const updateEmailPreferenceEpic = ($action, store) => $action.ofType('app/visitor/subscribe').mergeMap(({ emailPreference }) => {
    const email = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__selectors__["a" /* emailSelector */])(store.getState());
    if (!email) {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].empty();
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_dom_AjaxObservable__["ajaxPost"])(`/on_visitor_preference_update/${encodeURIComponent(email)}/${encodeURIComponent(emailPreference)}`);
});
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux_observable__["combineEpics"])(suscribeEpic, updateEmailPreferenceEpic));

/***/ }),

/***/ "./src/shared/Visitor/reducer.js":
/* exports provided: default */
/* exports used: default */
/*!***************************************!*\
  !*** ./src/shared/Visitor/reducer.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let visitorReducer = function visitorReducer(state = null, action) {
    switch (action.type) {
        case 'app/visitor/SUSCRIBE':
            return {
                email: action.email,
                emailPreference: 'SOMETIMES'
            };
        case 'app/visitor/UPDATE_EMAIL_PREFERENCE':
            if (!state) {
                return state;
            }
            return _extends({}, state, {
                emailPreference: action.emailPreference
            });
        default:
            return state;
    }
};


const immutableVisitorReducer = visitorReducer;
/* harmony default export */ __webpack_exports__["a"] = (immutableVisitorReducer);

/***/ }),

/***/ "./src/shared/Visitor/selectors.js":
/* exports provided: emailSelector */
/* exports used: emailSelector */
/*!*****************************************!*\
  !*** ./src/shared/Visitor/selectors.js ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(/*! ramda */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rootSelectors__ = __webpack_require__(/*! ../../rootSelectors */ "./src/rootSelectors.js");




const emailSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["pipe"])(__WEBPACK_IMPORTED_MODULE_1__rootSelectors__["b" /* visitorSelector */], visitor => visitor ? visitor.email : null);
/* harmony export (immutable) */ __webpack_exports__["a"] = emailSelector;


/***/ }),

/***/ "./src/shared/Visitor/style.css":
/* no static exports found */
/* exports used: default */
/*!**************************************!*\
  !*** ./src/shared/Visitor/style.css ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/Visitor/style.css");
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
      module.hot.accept(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/Visitor/style.css", function() {
        content = __webpack_require__(/*! !../../../~/css-loader??ref--1-1!../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/Visitor/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/shared/pipeReducers.js":
/* exports provided: default */
/* exports used: default */
/*!************************************!*\
  !*** ./src/shared/pipeReducers.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = pipeReducers;

function pipeReducers(...reducers) {
    return (state, action) => reducers.reduce((previous, reducer) => reducer(previous, action), state);
}

/** Compose reducers into one */

/***/ }),

/***/ "./src/shared/ui-element/Button/Link.jsx":
/* exports provided: default */
/* exports used: default */
/*!***********************************************!*\
  !*** ./src/shared/ui-element/Button/Link.jsx ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(/*! ./style.css */ "./src/shared/ui-element/Button/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/johan/Project/Vagalam/src/shared/ui-element/Button/Link.jsx',
    _this = this;



function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




const LinkButton = (_ref) => {
    let { children, href, registerRef } = _ref,
        props = _objectWithoutProperties(_ref, ['children', 'href', 'registerRef']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'a',
        _extends({ href: href }, props, { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.button, ref: registerRef, __source: {
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

/***/ "./src/shared/ui-element/Button/style.css":
/* no static exports found */
/* exports used: default */
/*!************************************************!*\
  !*** ./src/shared/ui-element/Button/style.css ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/ui-element/Button/style.css");
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
      module.hot.accept(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/ui-element/Button/style.css", function() {
        content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/ui-element/Button/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/shared/ui-element/FrameLayout/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!*****************************************************!*\
  !*** ./src/shared/ui-element/FrameLayout/index.jsx ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(/*! ./style.css */ "./src/shared/ui-element/FrameLayout/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/johan/Project/Vagalam/src/shared/ui-element/FrameLayout/index.jsx',
    _this = this;



function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





const FrameLayout = (_ref = {}) => {
    let {
        top,
        bottom,
        children,
        frameBackgroundColor = 'white',
        freeRatio = false
    } = _ref,
        otherProps = _objectWithoutProperties(_ref, ['top', 'bottom', 'children', 'frameBackgroundColor', 'freeRatio']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        _extends({ className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.layout }, otherProps, { style: { backgroundColor: frameBackgroundColor }, __source: {
                fileName: _jsxFileName,
                lineNumber: 24
            },
            __self: _this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.top, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 25
                },
                __self: _this
            },
            top
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.inside, style: freeRatio ? { maxWidth: 'none' } : {}, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 26
                },
                __self: _this
            },
            children
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.bottom, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 29
                },
                __self: _this
            },
            bottom
        )
    );
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_2__style_css___default.a)(FrameLayout));

/***/ }),

/***/ "./src/shared/ui-element/FrameLayout/style.css":
/* no static exports found */
/* exports used: default */
/*!*****************************************************!*\
  !*** ./src/shared/ui-element/FrameLayout/style.css ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/ui-element/FrameLayout/style.css");
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
      module.hot.accept(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/ui-element/FrameLayout/style.css", function() {
        content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/ui-element/FrameLayout/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/shared/ui-element/Modale/index.jsx":
/* exports provided: default */
/* exports used: default */
/*!************************************************!*\
  !*** ./src/shared/ui-element/Modale/index.jsx ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(/*! classnames */ 13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group__ = __webpack_require__(/*! react-transition-group */ 65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_transition_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vitaminjs__ = __webpack_require__(/*! vitaminjs */ "./node_modules/vitaminjs/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css__ = __webpack_require__(/*! ./style.css */ "./src/shared/ui-element/Modale/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style_css__);
var _jsxFileName = '/home/johan/Project/Vagalam/src/shared/ui-element/Modale/index.jsx';








class Modale extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.handleKeyDown = e => {
            if (e.key === 'Escape') {
                this.handleClose();
            }
        };

        this.handleClose = () => {
            this.props.onClose();
            this.setState({ isOpened: false });
        };

        this.state = {
            isOpened: props.isOpened
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isOpened !== nextProps.isOpened && this.state.isOpened !== nextProps.isOpened) {
            this.setState({
                isOpened: nextProps.isOpened
            });
        }
    }

    render() {
        const { children, fullScreen } = this.props;
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_transition_group__["CSSTransitionGroup"],
            {
                transitionEnterTimeout: 800,
                transitionLeaveTimeout: 500,
                transitionName: {
                    enter: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.enter,
                    enterActive: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a['enter-active'],
                    leave: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.leave,
                    leaveActive: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a['leave-active']
                },
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 56
                },
                __self: this
            },
            this.state.isOpened ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { role: 'presentation', className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.overlay, onKeyDown: this.handleKeyDown, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 67
                    },
                    __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_4__style_css___default.a.modale, { [__WEBPACK_IMPORTED_MODULE_4__style_css___default.a.fullscreen]: fullScreen }), __source: {
                            fileName: _jsxFileName,
                            lineNumber: 68
                        },
                        __self: this
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        {
                            className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a['close-button'],
                            'aria-label': 'Fermer',
                            onClick: this.handleClose,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 69
                            },
                            __self: this
                        },
                        'X'
                    ),
                    children
                )
            ) : null
        );
    }
}

Modale.defaultProps = {
    isOpened: true,
    fullScreen: false,
    onClose: () => {}
};
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_4__style_css___default.a)(Modale));

/***/ }),

/***/ "./src/shared/ui-element/Modale/style.css":
/* no static exports found */
/* exports used: default */
/*!************************************************!*\
  !*** ./src/shared/ui-element/Modale/style.css ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/ui-element/Modale/style.css");
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
      module.hot.accept(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/ui-element/Modale/style.css", function() {
        content = __webpack_require__(/*! !../../../../~/css-loader??ref--1-1!../../../../~/postcss-loader!./style.css */ "./node_modules/css-loader/index.js?{\"minimize\":false,\"discardComments\":{\"removeAll\":false},\"importLoaders\":1,\"localIdentName\":\"[name]__[local]___[hash:base64:5]\",\"modules\":true}!./node_modules/postcss-loader/index.js!./src/shared/ui-element/Modale/style.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

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
/* exports used: compose, last, pipe, prop, splitAt, nth, ascend, defaultTo */
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),

/***/ 10:
/* no static exports found */
/* exports used: combineReducers, compose, applyMiddleware, createStore */
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ 11:
/* no static exports found */
/* exports used: Observable */
/*!**********************************!*\
  !*** external "rxjs/Observable" ***!
  \**********************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/Observable");

/***/ }),

/***/ 12:
/* no static exports found */
/* all exports used */
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),

/***/ 13:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ 14:
/* no static exports found */
/* exports used: provideState, update, injectState */
/*!***************************!*\
  !*** external "freactal" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("freactal");

/***/ }),

/***/ 15:
/* no static exports found */
/* all exports used */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ 16:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "prismic.io" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("prismic.io");

/***/ }),

/***/ 17:
/* no static exports found */
/* exports used: renderToStaticMarkup, renderToString */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ 18:
/* no static exports found */
/* exports used: Motion, spring */
/*!*******************************!*\
  !*** external "react-motion" ***!
  \*******************************/
/***/ (function(module, exports) {

module.exports = require("react-motion");

/***/ }),

/***/ 19:
/* no static exports found */
/*!********************************************!*\
  !*** external "rxjs/add/observable/empty" ***!
  \********************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/observable/empty");

/***/ }),

/***/ 2:
/* no static exports found */
/* exports used: Provider, connect */
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ 20:
/* no static exports found */
/*!**************************************************!*\
  !*** external "rxjs/add/observable/fromPromise" ***!
  \**************************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/observable/fromPromise");

/***/ }),

/***/ 21:
/* no static exports found */
/*!*********************************************!*\
  !*** external "rxjs/add/operator/mergeMap" ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/mergeMap");

/***/ }),

/***/ 22:
/* no static exports found */
/* exports used: parse */
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ 23:
/* no static exports found */
/* exports used: default */
/*!*******************************!*\
  !*** external "@turf/bezier" ***!
  \*******************************/
/***/ (function(module, exports) {

module.exports = require("@turf/bezier");

/***/ }),

/***/ 24:
/* no static exports found */
/* exports used: lineString */
/*!********************************!*\
  !*** external "@turf/helpers" ***!
  \********************************/
/***/ (function(module, exports) {

module.exports = require("@turf/helpers");

/***/ }),

/***/ 25:
/* no static exports found */
/* exports used: default */
/*!**************************************!*\
  !*** external "@turf/line-distance" ***!
  \**************************************/
/***/ (function(module, exports) {

module.exports = require("@turf/line-distance");

/***/ }),

/***/ 26:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "@turf/line-slice" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("@turf/line-slice");

/***/ }),

/***/ 27:
/* no static exports found */
/* exports used: default */
/*!*****************************************!*\
  !*** external "@turf/line-slice-along" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("@turf/line-slice-along");

/***/ }),

/***/ 28:
/* no static exports found */
/* exports used: coordAll */
/*!*****************************!*\
  !*** external "@turf/meta" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("@turf/meta");

/***/ }),

/***/ 29:
/* no static exports found */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "babel-plugin-discard-module-references" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-discard-module-references");

/***/ }),

/***/ 3:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ 30:
/* no static exports found */
/* exports used: default */
/*!************************************************************!*\
  !*** external "babel-plugin-minify-dead-code-elimination" ***!
  \************************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-dead-code-elimination");

/***/ }),

/***/ 31:
/* no static exports found */
/* exports used: default */
/*!**********************************************************!*\
  !*** external "babel-plugin-minify-guarded-expressions" ***!
  \**********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-guarded-expressions");

/***/ }),

/***/ 32:
/* no static exports found */
/* exports used: default */
/*!**********************************************!*\
  !*** external "babel-plugin-minify-replace" ***!
  \**********************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-minify-replace");

/***/ }),

/***/ 33:
/* no static exports found */
/* exports used: default */
/*!*********************************************!*\
  !*** external "babel-plugin-react-require" ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-react-require");

/***/ }),

/***/ 34:
/* no static exports found */
/* exports used: default */
/*!********************************************************************!*\
  !*** external "babel-plugin-transform-export-default-name-forked" ***!
  \********************************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-export-default-name-forked");

/***/ }),

/***/ 35:
/* no static exports found */
/* exports used: default */
/*!*********************************************************!*\
  !*** external "babel-plugin-transform-node-env-inline" ***!
  \*********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-node-env-inline");

/***/ }),

/***/ 36:
/* no static exports found */
/* exports used: default */
/*!********************************************************!*\
  !*** external "babel-plugin-transform-react-jsx-self" ***!
  \********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-react-jsx-self");

/***/ }),

/***/ 37:
/* no static exports found */
/* exports used: default */
/*!**********************************************************!*\
  !*** external "babel-plugin-transform-react-jsx-source" ***!
  \**********************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-plugin-transform-react-jsx-source");

/***/ }),

/***/ 38:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "babel-preset-env" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-env");

/***/ }),

/***/ 39:
/* no static exports found */
/* exports used: default */
/*!*************************************!*\
  !*** external "babel-preset-react" ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-react");

/***/ }),

/***/ 4:
/* no static exports found */
/* exports used: default */
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),

/***/ 40:
/* no static exports found */
/* exports used: default */
/*!***************************************!*\
  !*** external "babel-preset-stage-1" ***!
  \***************************************/
/***/ (function(module, exports) {

module.exports = require("babel-preset-stage-1");

/***/ }),

/***/ 41:
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ 42:
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** external "babel-runtime/helpers/slicedToArray" ***!
  \******************************************************/
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),

/***/ 43:
/* no static exports found */
/* exports used: default */
/*!******************************************************!*\
  !*** external "case-sensitive-paths-webpack-plugin" ***!
  \******************************************************/
/***/ (function(module, exports) {

module.exports = require("case-sensitive-paths-webpack-plugin");

/***/ }),

/***/ 44:
/* no static exports found */
/* exports used: default */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ 45:
/* no static exports found */
/* exports used: default */
/*!*****************************************!*\
  !*** external "http-graceful-shutdown" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("http-graceful-shutdown");

/***/ }),

/***/ 46:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "js-string-escape" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("js-string-escape");

/***/ }),

/***/ 47:
/* no static exports found */
/* exports used: default */
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ 48:
/* no static exports found */
/* exports used: default */
/*!******************************!*\
  !*** external "koa-compose" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("koa-compose");

/***/ }),

/***/ 49:
/* no static exports found */
/* exports used: default */
/*!**************************************!*\
  !*** external "koa-conditional-get" ***!
  \**************************************/
/***/ (function(module, exports) {

module.exports = require("koa-conditional-get");

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
/* exports used: default */
/*!***************************!*\
  !*** external "koa-etag" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("koa-etag");

/***/ }),

/***/ 51:
/* no static exports found */
/* exports used: default */
/*!****************************!*\
  !*** external "koa-mount" ***!
  \****************************/
/***/ (function(module, exports) {

module.exports = require("koa-mount");

/***/ }),

/***/ 52:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),

/***/ 53:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "lodash.mergewith" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("lodash.mergewith");

/***/ }),

/***/ 54:
/* no static exports found */
/* exports used: default */
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ 55:
/* no static exports found */
/* exports used: default */
/*!*******************************************!*\
  !*** external "postcss-browser-reporter" ***!
  \*******************************************/
/***/ (function(module, exports) {

module.exports = require("postcss-browser-reporter");

/***/ }),

/***/ 56:
/* no static exports found */
/* exports used: default */
/*!**********************************!*\
  !*** external "postcss-cssnext" ***!
  \**********************************/
/***/ (function(module, exports) {

module.exports = require("postcss-cssnext");

/***/ }),

/***/ 57:
/* no static exports found */
/* exports used: default */
/*!*********************************!*\
  !*** external "postcss-import" ***!
  \*********************************/
/***/ (function(module, exports) {

module.exports = require("postcss-import");

/***/ }),

/***/ 58:
/* no static exports found */
/* exports used: default */
/*!********************************************!*\
  !*** external "postcss-omit-import-tilde" ***!
  \********************************************/
/***/ (function(module, exports) {

module.exports = require("postcss-omit-import-tilde");

/***/ }),

/***/ 59:
/* no static exports found */
/* exports used: default */
/*!***********************************!*\
  !*** external "postcss-reporter" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("postcss-reporter");

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
/* exports used: default */
/*!******************************!*\
  !*** external "postcss-url" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("postcss-url");

/***/ }),

/***/ 61:
/* no static exports found */
/* exports used: default */
/*!******************************!*\
  !*** external "prismic-dom" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("prismic-dom");

/***/ }),

/***/ 62:
/* no static exports found */
/* exports used: default */
/*!****************************************************************!*\
  !*** external "react-dev-utils/WatchMissingNodeModulesPlugin" ***!
  \****************************************************************/
/***/ (function(module, exports) {

module.exports = require("react-dev-utils/WatchMissingNodeModulesPlugin");

/***/ }),

/***/ 63:
/* no static exports found */
/* exports used: Resolver */
/*!*********************************!*\
  !*** external "react-resolver" ***!
  \*********************************/
/***/ (function(module, exports) {

module.exports = require("react-resolver");

/***/ }),

/***/ 64:
/* no static exports found */
/* exports used: routerReducer, routerMiddleware */
/*!*************************************!*\
  !*** external "react-router-redux" ***!
  \*************************************/
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),

/***/ 65:
/* no static exports found */
/* exports used: CSSTransitionGroup */
/*!*****************************************!*\
  !*** external "react-transition-group" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("react-transition-group");

/***/ }),

/***/ 66:
/* no static exports found */
/* exports used: default */
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),

/***/ 67:
/* no static exports found */
/* exports used: default */
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ 68:
/* no static exports found */
/*!***********************************************!*\
  !*** external "rxjs/add/observable/dom/ajax" ***!
  \***********************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/observable/dom/ajax");

/***/ }),

/***/ 69:
/* no static exports found */
/*!********************************************!*\
  !*** external "rxjs/add/observable/merge" ***!
  \********************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/observable/merge");

/***/ }),

/***/ 7:
/* no static exports found */
/* exports used: createEpicMiddleware, combineEpics */
/*!***********************************!*\
  !*** external "redux-observable" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("redux-observable");

/***/ }),

/***/ 70:
/* no static exports found */
/*!*****************************************!*\
  !*** external "rxjs/add/observable/of" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/observable/of");

/***/ }),

/***/ 71:
/* no static exports found */
/*!***********************************************!*\
  !*** external "rxjs/add/operator/bufferTime" ***!
  \***********************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/bufferTime");

/***/ }),

/***/ 72:
/* no static exports found */
/*!***************************************!*\
  !*** external "rxjs/add/operator/do" ***!
  \***************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/do");

/***/ }),

/***/ 73:
/* no static exports found */
/*!*******************************************!*\
  !*** external "rxjs/add/operator/filter" ***!
  \*******************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/filter");

/***/ }),

/***/ 74:
/* no static exports found */
/*!****************************************!*\
  !*** external "rxjs/add/operator/map" ***!
  \****************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/map");

/***/ }),

/***/ 75:
/* no static exports found */
/*!******************************************!*\
  !*** external "rxjs/add/operator/merge" ***!
  \******************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/merge");

/***/ }),

/***/ 76:
/* no static exports found */
/*!**********************************************!*\
  !*** external "rxjs/add/operator/startWith" ***!
  \**********************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/startWith");

/***/ }),

/***/ 77:
/* no static exports found */
/* exports used: ajaxPost */
/*!*****************************************************!*\
  !*** external "rxjs/observable/dom/AjaxObservable" ***!
  \*****************************************************/
/***/ (function(module, exports) {

module.exports = require("rxjs/observable/dom/AjaxObservable");

/***/ }),

/***/ 78:
/* no static exports found */
/* exports used: default */
/*!***********************************************!*\
  !*** external "serviceworker-webpack-plugin" ***!
  \***********************************************/
/***/ (function(module, exports) {

module.exports = require("serviceworker-webpack-plugin");

/***/ }),

/***/ 79:
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ 8:
/* no static exports found */
/* exports used: createSelector, createStructuredSelector */
/*!***************************!*\
  !*** external "reselect" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = require("reselect");

/***/ }),

/***/ 80:
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),

/***/ 81:
/* no static exports found */
/* all exports used */
/*!**********************************************************************************!*\
  !*** multi ./~/vitaminjs/config/utils/hot.js ./~/vitaminjs/src/server/server.js ***!
  \**********************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/hot.js */"./node_modules/vitaminjs/config/utils/hot.js");
module.exports = __webpack_require__(/*! /home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/server.js */"./node_modules/vitaminjs/src/server/server.js");


/***/ }),

/***/ 9:
/* no static exports found */
/* exports used: default */
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ })

/******/ });
//# sourceMappingURL=server_bundle.js.map