(self.webpackChunkglide = self.webpackChunkglide || []).push([
  [179],
  {
    './libs/frontend/shared/components/glide-grid/src/lib sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$':
      (module, __unused_webpack_exports, __webpack_require__) => {
        var map = {
          './frontend-shared-components-glide-grid.stories.tsx':
            './libs/frontend/shared/components/glide-grid/src/lib/frontend-shared-components-glide-grid.stories.tsx',
          './utils/canvas/canvas.stories.tsx':
            './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/canvas.stories.tsx',
        };
        function webpackContext(req) {
          var id = webpackContextResolve(req);
          return __webpack_require__(id);
        }
        function webpackContextResolve(req) {
          if (!__webpack_require__.o(map, req)) {
            var e = new Error("Cannot find module '" + req + "'");
            throw ((e.code = 'MODULE_NOT_FOUND'), e);
          }
          return map[req];
        }
        (webpackContext.keys = function webpackContextKeys() {
          return Object.keys(map);
        }),
          (webpackContext.resolve = webpackContextResolve),
          (module.exports = webpackContext),
          (webpackContext.id =
            './libs/frontend/shared/components/glide-grid/src/lib sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$');
      },
    './libs/frontend/shared/components/glide-grid/src/lib sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$':
      (module) => {
        function webpackEmptyContext(req) {
          var e = new Error("Cannot find module '" + req + "'");
          throw ((e.code = 'MODULE_NOT_FOUND'), e);
        }
        (webpackEmptyContext.keys = () => []),
          (webpackEmptyContext.resolve = webpackEmptyContext),
          (webpackEmptyContext.id =
            './libs/frontend/shared/components/glide-grid/src/lib sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$'),
          (module.exports = webpackEmptyContext);
      },
    './libs/frontend/shared/components/glide-grid/src/lib/frontend-shared-components-glide-grid.stories.tsx':
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.r(__webpack_exports__),
          __webpack_require__.d(__webpack_exports__, {
            Primary: () => Primary,
            __namedExportsOrder: () => __namedExportsOrder,
            default: () => frontend_shared_components_glide_grid_stories,
          });
        __webpack_require__(
          './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.object.assign.js'
        ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.date.to-string.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.object.to-string.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.regexp.to-string.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.concat.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.map.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.fill.js'
          );
        var js = __webpack_require__(
            './node_modules/.pnpm/@glideapps+glide-data-grid@5.2.1_hkxiktvnj65fwmoenr62ovejiy/node_modules/@glideapps/glide-data-grid/dist/js/index.js'
          ),
          react =
            (__webpack_require__(
              './node_modules/.pnpm/@glideapps+glide-data-grid@5.2.1_hkxiktvnj65fwmoenr62ovejiy/node_modules/@glideapps/glide-data-grid/dist/index.css'
            ),
            __webpack_require__(
              './node_modules/.pnpm/react@18.2.0/node_modules/react/index.js'
            )),
          noOp = function noOp() {},
          noOpObj = function noOpObj() {
            return {};
          },
          objectWithoutPropertiesLoose = __webpack_require__(
            './node_modules/.pnpm/@babel+runtime@7.20.7/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js'
          ),
          objectWithoutPropertiesLoose_default = __webpack_require__.n(
            objectWithoutPropertiesLoose
          ),
          _excluded =
            (__webpack_require__(
              './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.iterator.js'
            ),
            __webpack_require__(
              './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.map.js'
            ),
            __webpack_require__(
              './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.string.iterator.js'
            ),
            __webpack_require__(
              './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/web.dom-collections.iterator.js'
            ),
            ['data', 'displayData']),
          CellCache = (function () {
            function CellCache(_ref2) {
              var columns = _ref2.columns,
                rows = _ref2.rows,
                getRowByIndex = _ref2.getRowByIndex;
              (this.cachedContent = new Map()),
                (this.columns = void 0),
                (this.columns = columns);
              for (
                var cellGen = (function genGetCellContent(
                    columns,
                    getDataByIndex
                  ) {
                    return function (_ref) {
                      var col = _ref[0],
                        row = _ref[1],
                        item = getDataByIndex(row);
                      if (col < columns.length) {
                        var _columns$getCell = columns.getCell(col),
                          data = _columns$getCell.data,
                          displayData = _columns$getCell.displayData,
                          rest = objectWithoutPropertiesLoose_default()(
                            _columns$getCell,
                            _excluded
                          );
                        return Object.assign({}, rest, {
                          data: item[data],
                          displayData: item[displayData],
                        });
                      }
                      throw new Error(
                        "Attempting to access a column that doesn't exist"
                      );
                    };
                  })(columns, getRowByIndex),
                  row = 0;
                row < rows;
                row++
              )
                for (
                  var rowUuid = getRowByIndex(row).rowUuid, col = 0;
                  col < columns.length;
                  col++
                )
                  this.set(rowUuid, col, cellGen([col, row]));
            }
            var _proto = CellCache.prototype;
            return (
              (_proto.get = function get(rowUuid, col) {
                var rowCache = this.cachedContent.get(rowUuid);
                if (void 0 === rowCache)
                  throw new Error('Cache should be set before accessing');
                var translatedCol = this.columns.getTranslation(col);
                return rowCache.get(translatedCol);
              }),
              (_proto.hasRow = function hasRow(rowUuid) {
                return this.cachedContent.has(rowUuid);
              }),
              (_proto.has = function has(rowUuid, col) {
                var _this$cachedContent$g;
                return (
                  this.hasRow(rowUuid) &&
                  (null ==
                  (_this$cachedContent$g = this.cachedContent.get(rowUuid))
                    ? void 0
                    : _this$cachedContent$g.has(col))
                );
              }),
              (_proto.set = function set(rowUuid, col, value) {
                void 0 === this.cachedContent.get(rowUuid) &&
                  this.cachedContent.set(rowUuid, new Map()),
                  this.cachedContent.get(rowUuid).set(col, value);
              }),
              CellCache
            );
          })(),
          useCellCache = function useCellCache(_ref) {
            var columns = _ref.columns,
              getRowByIndex = _ref.getRowByIndex,
              rows = _ref.rows,
              cache = (0, react.useMemo)(
                function () {
                  return new CellCache({ columns, rows, getRowByIndex });
                },
                [columns, getRowByIndex, rows]
              );
            return {
              cacheGetRow: (0, react.useCallback)(
                function (uuid, col) {
                  return cache.get(uuid, col);
                },
                [cache]
              ),
            };
          };
        try {
          (useCellCache.displayName = 'useCellCache'),
            (useCellCache.__docgenInfo = {
              description: '',
              displayName: 'useCellCache',
              props: {
                columns: {
                  defaultValue: null,
                  description: '',
                  name: 'columns',
                  required: !0,
                  type: { name: 'Columns<T>' },
                },
                getRowByIndex: {
                  defaultValue: null,
                  description: '',
                  name: 'getRowByIndex',
                  required: !0,
                  type: { name: 'RowIndexGetter<T>' },
                },
                rows: {
                  defaultValue: null,
                  description: '',
                  name: 'rows',
                  required: !0,
                  type: { name: 'number' },
                },
              },
            }),
            'undefined' != typeof STORYBOOK_REACT_CLASSES &&
              (STORYBOOK_REACT_CLASSES[
                'libs/frontend/shared/components/glide-grid/src/lib/hooks/use-cell-cache.tsx#useCellCache'
              ] = {
                docgenInfo: useCellCache.__docgenInfo,
                name: 'useCellCache',
                path: 'libs/frontend/shared/components/glide-grid/src/lib/hooks/use-cell-cache.tsx#useCellCache',
              });
        } catch (__react_docgen_typescript_loader_error) {}
        var useGenGetCellContent = function useGenGetCellContent(_ref) {
          var columns = _ref.columns,
            getRowByIndex = _ref.getRowByIndex,
            sorted = _ref.sorted,
            rows = _ref.rows,
            cacheGetRow = useCellCache({
              columns,
              getRowByIndex,
              rows,
            }).cacheGetRow;
          return {
            getCellContent: (0, react.useCallback)(
              function (_ref2) {
                var col = _ref2[0],
                  row = _ref2[1],
                  rowUuid = sorted[row].rowUuid;
                return cacheGetRow(rowUuid, col);
              },
              [cacheGetRow, sorted]
            ),
          };
        };
        try {
          (useGenGetCellContent.displayName = 'useGenGetCellContent'),
            (useGenGetCellContent.__docgenInfo = {
              description: '',
              displayName: 'useGenGetCellContent',
              props: {
                columns: {
                  defaultValue: null,
                  description: '',
                  name: 'columns',
                  required: !0,
                  type: { name: 'Columns<T>' },
                },
                getRowByIndex: {
                  defaultValue: null,
                  description: '',
                  name: 'getRowByIndex',
                  required: !0,
                  type: { name: 'RowIndexGetter<T>' },
                },
                rows: {
                  defaultValue: null,
                  description: '',
                  name: 'rows',
                  required: !0,
                  type: { name: 'number' },
                },
                sorted: {
                  defaultValue: null,
                  description: '',
                  name: 'sorted',
                  required: !0,
                  type: { name: 'IdRow<T>[]' },
                },
              },
            }),
            'undefined' != typeof STORYBOOK_REACT_CLASSES &&
              (STORYBOOK_REACT_CLASSES[
                'libs/frontend/shared/components/glide-grid/src/lib/hooks/use-gen-get-cell-content.tsx#useGenGetCellContent'
              ] = {
                docgenInfo: useGenGetCellContent.__docgenInfo,
                name: 'useGenGetCellContent',
                path: 'libs/frontend/shared/components/glide-grid/src/lib/hooks/use-gen-get-cell-content.tsx#useGenGetCellContent',
              });
        } catch (__react_docgen_typescript_loader_error) {}
        __webpack_require__(
          './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.for-each.js'
        ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/web.dom-collections.for-each.js'
          );
        var _COMPARE_MAP,
          v4 = __webpack_require__(
            './node_modules/.pnpm/uuid@9.0.0/node_modules/uuid/dist/esm-browser/v4.js'
          ),
          addIdToRow = function addIdToRow(row) {
            var changeType = row;
            return (changeType.rowUuid = (0, v4.Z)()), changeType;
          },
          useAddIds = function useAddIds(data) {
            return {
              dataWithIds: (0, react.useMemo)(
                function () {
                  return (function addIdsToRows(rows) {
                    return rows.forEach(addIdToRow), rows;
                  })(data);
                },
                [data]
              ),
            };
          };
        __webpack_require__(
          './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.parse-float.js'
        ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.sort.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.slice.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.function.name.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.from.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.regexp.exec.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.symbol.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.symbol.description.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.symbol.iterator.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.function.bind.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.is-array.js'
          );
        function _createForOfIteratorHelperLoose(o, allowArrayLike) {
          var it =
            ('undefined' != typeof Symbol && o[Symbol.iterator]) ||
            o['@@iterator'];
          if (it) return (it = it.call(o)).next.bind(it);
          if (
            Array.isArray(o) ||
            (it = (function _unsupportedIterableToArray(o, minLen) {
              if (!o) return;
              if ('string' == typeof o) return _arrayLikeToArray(o, minLen);
              var n = Object.prototype.toString.call(o).slice(8, -1);
              'Object' === n && o.constructor && (n = o.constructor.name);
              if ('Map' === n || 'Set' === n) return Array.from(o);
              if (
                'Arguments' === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return _arrayLikeToArray(o, minLen);
            })(o)) ||
            (allowArrayLike && o && 'number' == typeof o.length)
          ) {
            it && (o = it);
            var i = 0;
            return function () {
              return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
            };
          }
          throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          );
        }
        function _arrayLikeToArray(arr, len) {
          (null == len || len > arr.length) && (len = arr.length);
          for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
          return arr2;
        }
        var SORT_TYPES_natural = 'natural',
          SORT_TYPES_numeric = 'numeric',
          SORT_STATES_initial = 'initial',
          SORT_STATES_ascending = 'asc',
          SORT_STATES_descending = 'desc',
          sortNumeric = function sortNumeric(num1, num2) {
            return parseFloat(num1) - parseFloat(num2);
          },
          COMPARE_MAP =
            (((_COMPARE_MAP = {})['date'] = function sortDates(date1, date2) {
              return sortNumeric(
                '' + new Date(date1).getTime(),
                '' + new Date(date2).getTime()
              );
            }),
            (_COMPARE_MAP[SORT_TYPES_natural] = function defaultSort(a, b) {
              return a < b ? -1 : a > b ? 1 : 0;
            }),
            (_COMPARE_MAP[SORT_TYPES_numeric] = sortNumeric),
            _COMPARE_MAP),
          initial = SORT_STATES_initial,
          TableSorter = (function () {
            function TableSorter(_ref) {
              var originalData = _ref.originalData,
                columns = _ref.columns;
              (this.originalData = void 0),
                (this.columns = void 0),
                (this.originalData = originalData),
                (this.columns = columns);
            }
            var _proto = TableSorter.prototype;
            return (
              (_proto.cloneOriginal = function cloneOriginal() {
                return [].concat(this.originalData);
              }),
              (_proto.getType = function getType(key) {
                return '' === key
                  ? SORT_TYPES_natural
                  : this.columns.getType(key);
              }),
              (_proto.stateSort = function stateSort(
                currentStateSet,
                previousStateSet
              ) {
                var currentState = currentStateSet.state,
                  currentValue = currentStateSet.value,
                  previousState = previousStateSet.state,
                  previousValue = previousStateSet.value;
                return (currentState === initial &&
                  previousState === initial) ||
                  '' === currentValue
                  ? this.cloneOriginal()
                  : (function objectSort(data, sorters) {
                      return data.sort(function (a, b) {
                        for (
                          var _step,
                            _iterator =
                              _createForOfIteratorHelperLoose(sorters);
                          !(_step = _iterator()).done;

                        ) {
                          var sorter = _step.value,
                            type = sorter.type,
                            state = sorter.state,
                            key = sorter.key;
                          if ('initial' !== state && '' !== key) {
                            var mult =
                              ('desc' === state ? -1 : 1) *
                              (0, COMPARE_MAP[type])(a[key], b[key]);
                            if (0 !== mult) return mult;
                          }
                        }
                        return 0;
                      });
                    })(this.cloneOriginal(), [
                      {
                        state: currentState,
                        type: this.getType(currentValue),
                        key: currentValue,
                      },
                      {
                        state: previousState,
                        type: this.getType(previousValue),
                        key: previousValue,
                      },
                    ]);
              }),
              TableSorter
            );
          })(),
          createClass = __webpack_require__(
            './node_modules/.pnpm/@babel+runtime@7.20.7/node_modules/@babel/runtime/helpers/createClass.js'
          ),
          createClass_default = __webpack_require__.n(createClass),
          regenerator =
            (__webpack_require__(
              './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.index-of.js'
            ),
            __webpack_require__(
              './node_modules/.pnpm/@babel+runtime@7.20.7/node_modules/@babel/runtime/regenerator/index.js'
            )),
          regenerator_default = __webpack_require__.n(regenerator),
          _marked = regenerator_default().mark(cycleStates),
          sortStatesArray = [
            SORT_STATES_initial,
            SORT_STATES_ascending,
            SORT_STATES_descending,
          ];
        function cycleStates(startingPos) {
          var i, len;
          return regenerator_default().wrap(function cycleStates$(_context) {
            for (;;)
              switch ((_context.prev = _context.next)) {
                case 0:
                  (i = startingPos), (len = sortStatesArray.length);
                case 2:
                  return (_context.next = 5), sortStatesArray[i++ % len];
                case 5:
                  _context.next = 2;
                  break;
                case 7:
                case 'end':
                  return _context.stop();
              }
          }, _marked);
        }
        var genCycleStates = function genCycleStates(initial) {
            void 0 === initial && (initial = SORT_STATES_initial);
            var generator = cycleStates(sortStatesArray.indexOf(initial));
            return function () {
              return generator.next().value;
            };
          },
          initialStateSet = { state: SORT_STATES_initial, value: '' },
          SortStateMachine = (function () {
            function SortStateMachine(stateSet) {
              void 0 === stateSet && (stateSet = {}),
                (this.currentStateSet = Object.assign({}, initialStateSet)),
                (this.previousStateSet = Object.assign({}, initialStateSet)),
                (this.stateCycler = genCycleStates(sortStatesArray[1])),
                stateSet.state && (this.currentStateSet.state = stateSet.state),
                stateSet.value && (this.currentStateSet.value = stateSet.value);
            }
            var _proto = SortStateMachine.prototype;
            return (
              (_proto.resetCycler = function resetCycler() {
                this.stateCycler = genCycleStates(sortStatesArray[1]);
              }),
              (_proto.reset = function reset() {
                (this.previousStateSet = this.currentStateSet),
                  (this.currentStateSet = Object.assign({}, initialStateSet)),
                  this.resetCycler(),
                  this.nextState();
              }),
              (_proto.nextState = function nextState() {
                this.currentStateSet.state = this.stateCycler();
              }),
              (_proto.nextValue = function nextValue(val) {
                return (
                  '' === this.currentStateSet.value
                    ? ((this.currentStateSet.value = val), this.nextState())
                    : this.currentStateSet.value === val
                    ? this.nextState()
                    : (this.reset(), (this.currentStateSet.value = val)),
                  {
                    currentStateSet: this.currentStateSet,
                    previousStateSet: this.previousStateSet,
                  }
                );
              }),
              createClass_default()(SortStateMachine, [
                {
                  key: 'previousState',
                  get: function get() {
                    return Object.assign({}, this.previousStateSet);
                  },
                },
                {
                  key: 'state',
                  get: function get() {
                    return Object.assign({}, this.currentStateSet);
                  },
                },
              ]),
              SortStateMachine
            );
          })(),
          useSort = function useSort(_ref) {
            var originalData = _ref.originalData,
              columns = _ref.columns,
              sorter = (0, react.useMemo)(
                function () {
                  return new TableSorter({ originalData, columns });
                },
                [columns, originalData]
              ),
              _useSortStateMachine = (function useSortStateMachine() {
                var stateMachine = (0, react.useMemo)(function () {
                  return new SortStateMachine();
                }, []);
                return {
                  sortMachineNextToken: (0, react.useCallback)(
                    function (value) {
                      return stateMachine.nextValue(value);
                    },
                    [stateMachine]
                  ),
                  getSortState: (0, react.useCallback)(
                    function () {
                      return {
                        currentStateSet: stateMachine.state,
                        previousStateSet: stateMachine.previousState,
                      };
                    },
                    [stateMachine.previousState, stateMachine.state]
                  ),
                };
              })(),
              sortMachineNextToken = _useSortStateMachine.sortMachineNextToken,
              getSortState = _useSortStateMachine.getSortState,
              _useState = (0, react.useState)(originalData),
              sorted = _useState[0],
              setSorted = _useState[1],
              onHeaderClickSort = (0, react.useCallback)(
                function (headerVal) {
                  var _sortMachineNextToken = sortMachineNextToken(headerVal),
                    currentStateSet = _sortMachineNextToken.currentStateSet,
                    previousStateSet = _sortMachineNextToken.previousStateSet,
                    nextSorted = sorter.stateSort(
                      currentStateSet,
                      previousStateSet
                    );
                  setSorted(nextSorted);
                },
                [sortMachineNextToken]
              ),
              refreshSort = (0, react.useCallback)(function () {
                return setSorted(function (sorted) {
                  return [].concat(sorted);
                });
              }, []);
            return { sorted, onHeaderClickSort, getSortState, refreshSort };
          },
          canvas_triangle = __webpack_require__(
            './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/triangle.ts'
          ),
          stacked_triangles = __webpack_require__(
            './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/stacked-triangles.ts'
          ),
          utils = __webpack_require__(
            './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/utils.ts'
          ),
          zoomX1Triangle = new canvas_triangle.C({ width: 8, height: 5 }),
          zoomX2Triangle = new canvas_triangle.C({ width: 16, height: 10 }),
          zoomX1StackedTriangles = new stacked_triangles.$({
            width: 8,
            height: 5,
            gap: 4,
          }),
          zoomX2StackedTriangles = new stacked_triangles.$({
            width: 16,
            height: 10,
            gap: 4,
          }),
          headerThemePriority = function headerThemePriority(header) {
            var isSelected = header.isSelected,
              isHovered = header.isHovered,
              hasSelectedCell = header.hasSelectedCell;
            return isSelected
              ? header.theme.accentColor
              : isHovered
              ? header.theme.bgHeaderHovered
              : hasSelectedCell
              ? header.theme.bgHeaderHasFocus
              : 'white';
          },
          getHeaderSortImage = function getHeaderSortImage(props) {
            var isSorted = props.isSorted,
              sortState = props.sortState,
              zoomed = props.zoomed,
              backgroundColor = props.backgroundColor,
              fillColor = props.fillColor,
              stackedTriangles = (function getStackedTriangle(zoomed, colors) {
                void 0 === zoomed && (zoomed = !1);
                var stackedTriangles = zoomed
                  ? zoomX2StackedTriangles
                  : zoomX1StackedTriangles;
                return (
                  colors.backgroundColor &&
                    stackedTriangles.background(colors.backgroundColor),
                  colors.fillColor && stackedTriangles.fill(colors.fillColor),
                  stackedTriangles
                );
              })(zoomed, { backgroundColor, fillColor }),
              triangle = (function getTriangle(zoomed, colors) {
                void 0 === zoomed && (zoomed = !1);
                var triangle = zoomed ? zoomX2Triangle : zoomX1Triangle;
                return (
                  colors.backgroundColor &&
                    triangle.background(colors.backgroundColor),
                  colors.fillColor && triangle.fill(colors.fillColor),
                  triangle
                );
              })(zoomed, { backgroundColor, fillColor });
            if (!isSorted)
              return stackedTriangles.draw(), stackedTriangles.image();
            switch (sortState) {
              case SORT_STATES_initial:
                return stackedTriangles.draw(), stackedTriangles.image();
              case SORT_STATES_ascending:
                return triangle.draw(canvas_triangle.K.up), triangle.image();
              case SORT_STATES_descending:
                return triangle.draw(canvas_triangle.K.down), triangle.image();
              default:
                return triangle.image();
            }
          };
        function row_cache_createForOfIteratorHelperLoose(o, allowArrayLike) {
          var it =
            ('undefined' != typeof Symbol && o[Symbol.iterator]) ||
            o['@@iterator'];
          if (it) return (it = it.call(o)).next.bind(it);
          if (
            Array.isArray(o) ||
            (it = (function row_cache_unsupportedIterableToArray(o, minLen) {
              if (!o) return;
              if ('string' == typeof o)
                return row_cache_arrayLikeToArray(o, minLen);
              var n = Object.prototype.toString.call(o).slice(8, -1);
              'Object' === n && o.constructor && (n = o.constructor.name);
              if ('Map' === n || 'Set' === n) return Array.from(o);
              if (
                'Arguments' === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return row_cache_arrayLikeToArray(o, minLen);
            })(o)) ||
            (allowArrayLike && o && 'number' == typeof o.length)
          ) {
            it && (o = it);
            var i = 0;
            return function () {
              return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
            };
          }
          throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          );
        }
        function row_cache_arrayLikeToArray(arr, len) {
          (null == len || len > arr.length) && (len = arr.length);
          for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
          return arr2;
        }
        var RowCache = (function () {
            function RowCache(data) {
              void 0 === data && (data = []),
                (this.rowIdArray = []),
                (this.cache = new Map());
              for (
                var _step,
                  _iterator = row_cache_createForOfIteratorHelperLoose(data);
                !(_step = _iterator()).done;

              ) {
                var row = _step.value,
                  rowUuid = row.rowUuid;
                this.rowIdArray.push(rowUuid), this.cache.set(rowUuid, row);
              }
            }
            var _proto = RowCache.prototype;
            return (
              (_proto.getRowId = function getRowId(n) {
                if (!this.hasIndex(n))
                  throw new Error(
                    'Attempting to grab row id outside of range.'
                  );
                return this.rowIdArray[n];
              }),
              (_proto.getRowByIndex = function getRowByIndex(n) {
                var uuid = this.getRowId(n),
                  row = this.cache.get(uuid);
                if (!row)
                  throw new Error('Cache should be set before accessing');
                return row;
              }),
              (_proto.hasIndex = function hasIndex(n) {
                return n >= 0 || n < this.rowIdArray.length;
              }),
              (_proto.set = function set(uuid, value) {
                this.cache.set(uuid, value);
              }),
              RowCache
            );
          })(),
          useRowCache = function useRowCache(data) {
            var cache = (0, react.useMemo)(
              function () {
                return new RowCache(data);
              },
              [data]
            );
            return {
              getRowByIndex: (0, react.useCallback)(
                function (row) {
                  return cache.getRowByIndex(row);
                },
                [cache]
              ),
            };
          };
        try {
          (useRowCache.displayName = 'useRowCache'),
            (useRowCache.__docgenInfo = {
              description: '',
              displayName: 'useRowCache',
              props: {},
            }),
            'undefined' != typeof STORYBOOK_REACT_CLASSES &&
              (STORYBOOK_REACT_CLASSES[
                'libs/frontend/shared/components/glide-grid/src/lib/hooks/use-row-cache.tsx#useRowCache'
              ] = {
                docgenInfo: useRowCache.__docgenInfo,
                name: 'useRowCache',
                path: 'libs/frontend/shared/components/glide-grid/src/lib/hooks/use-row-cache.tsx#useRowCache',
              });
        } catch (__react_docgen_typescript_loader_error) {}
        var jsx_runtime = __webpack_require__(
          './node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js'
        );
        function GlideGrid(_ref) {
          var columns = _ref.columns,
            data = _ref.data,
            rows = _ref.rows,
            _ref$onItemHovered = _ref.onItemHovered,
            onItemHovered =
              void 0 === _ref$onItemHovered ? noOp : _ref$onItemHovered,
            _ref$getRowThemeOverr = _ref.getRowThemeOverride,
            getRowThemeOverride =
              void 0 === _ref$getRowThemeOverr
                ? noOpObj
                : _ref$getRowThemeOverr,
            _ref$onHeaderClicked = _ref.onHeaderClicked,
            onHeaderClicked =
              void 0 === _ref$onHeaderClicked ? noOp : _ref$onHeaderClicked,
            dataWithIds = useAddIds(data).dataWithIds,
            getRowByIndex = useRowCache(dataWithIds).getRowByIndex,
            columnsRef = (0, react.useRef)(columns),
            _useSort = useSort({ originalData: dataWithIds, columns }),
            sorted = _useSort.sorted,
            onHeaderClickSort = _useSort.onHeaderClickSort,
            getSortState = _useSort.getSortState,
            refreshSort = _useSort.refreshSort,
            _useHeaderClicked = (function useHeaderClicked(_ref) {
              var columns = _ref.columns,
                onHeaderClicked = _ref.onHeaderClicked;
              return {
                onHeaderClicked: (0, react.useCallback)(
                  function (col) {
                    var selectedHeader = columns.getDisplayData(col);
                    onHeaderClicked(selectedHeader, col);
                  },
                  [columns, onHeaderClicked]
                ),
              };
            })({
              columns,
              onHeaderClicked: (0, react.useCallback)(
                function (headerVal) {
                  onHeaderClicked(headerVal), onHeaderClickSort(headerVal);
                },
                [onHeaderClickSort, onHeaderClicked]
              ),
            }),
            _onHeaderClicked = _useHeaderClicked.onHeaderClicked,
            _useRowHoverHighlight = (function useRowHoverHighlight() {
              var _useState = (0, react.useState)(-1),
                hoverRow = _useState[0],
                setHoverRow = _useState[1],
                onItemHovered = (0, react.useCallback)(function (args) {
                  var row = args.location[1];
                  setHoverRow('cell' !== args.kind ? -1 : row);
                }, []),
                getRowThemeOverride = (0, react.useCallback)(
                  function (row) {
                    if (row === hoverRow)
                      return { bgCell: '#f7f7f7', bgCellMedium: '#f0f0f0' };
                  },
                  [hoverRow]
                );
              return { hoverRow, onItemHovered, getRowThemeOverride };
            })(),
            onItemHoveredHighlight = _useRowHoverHighlight.onItemHovered,
            getRowHoveredThemeOverride =
              _useRowHoverHighlight.getRowThemeOverride,
            _onItemHovered = (0, react.useCallback)(
              function (args) {
                onItemHoveredHighlight(args), onItemHovered(args);
              },
              [onItemHovered, onItemHoveredHighlight]
            ),
            _getRowThemeOverride = (0, react.useCallback)(
              function (row) {
                return Object.assign(
                  {},
                  getRowThemeOverride(row),
                  getRowHoveredThemeOverride(row)
                );
              },
              [getRowHoveredThemeOverride, getRowThemeOverride]
            ),
            getCellContent = useGenGetCellContent({
              columns,
              getRowByIndex,
              sorted,
              rows,
            }).getCellContent;
          return (0, jsx_runtime.jsx)(js.Nd, {
            width: '100%',
            verticalBorder: !1,
            columns: columns.getColumns(),
            getCellsForSelection: !0,
            getCellContent,
            onCellClicked: function onCellClicked(item) {},
            onColumnMoved: function onColumnMoved(col1, col2) {
              columnsRef.current.swap(col1, col2), refreshSort();
            },
            onHeaderClicked: _onHeaderClicked,
            smoothScrollX: !0,
            smoothScrollY: !0,
            drawHeader: function drawHeader(args) {
              return (
                (function drawHeaderSort(headerProps, stateHistory) {
                  var ctx = headerProps.ctx,
                    rect = headerProps.rect,
                    theme = headerProps.theme,
                    id = headerProps.column.id,
                    _stateHistory$current = stateHistory.currentStateSet,
                    curValue = _stateHistory$current.key,
                    curState = _stateHistory$current.state,
                    _stateHistory$previou = stateHistory.previousStateSet,
                    prevValue = _stateHistory$previou.key,
                    prevState = _stateHistory$previou.state,
                    x = rect.x,
                    y = rect.y,
                    width = rect.width,
                    height = rect.height,
                    zoomed = window.devicePixelRatio > 1,
                    zoomFactor = zoomed ? 2 : 1,
                    image = getHeaderSortImage({
                      isSorted: curValue === id || prevValue === id,
                      sortState: curValue === id ? curState : prevState,
                      backgroundColor: headerThemePriority(headerProps),
                      fillColor: theme.textHeaderSelected,
                      zoomed,
                    }),
                    pos = (0, utils.Vd)({
                      containerWidth: width,
                      containerHeight: zoomFactor * height,
                      itemWidth: image.width,
                      itemHeight: image.height,
                      position: 'midRight',
                      padding: 8,
                    });
                  ctx.putImageData(image, zoomFactor * (pos.x + x), pos.y + y);
                })(args, getSortState()),
                !1
              );
            },
            theme: {
              accentColor: '#e1dbfc',
              accentLight: '#f8f7fe',
              textHeaderSelected: '#3d3c5a',
            },
            onItemHovered: _onItemHovered,
            getRowThemeOverride: _getRowThemeOverride,
            rows,
          });
        }
        try {
          (GlideGrid.displayName = 'GlideGrid'),
            (GlideGrid.__docgenInfo = {
              description: '',
              displayName: 'GlideGrid',
              props: {
                onItemHovered: {
                  defaultValue: { value: '() => {}' },
                  description: '',
                  name: 'onItemHovered',
                  required: !1,
                  type: { name: 'HoverHandler' },
                },
                data: {
                  defaultValue: null,
                  description: '',
                  name: 'data',
                  required: !0,
                  type: { name: 'T[]' },
                },
                getRowThemeOverride: {
                  defaultValue: { value: '() => ({})' },
                  description: '',
                  name: 'getRowThemeOverride',
                  required: !1,
                  type: { name: 'GetRowThemeCallback' },
                },
                onHeaderClicked: {
                  defaultValue: { value: '() => {}' },
                  description: '',
                  name: 'onHeaderClicked',
                  required: !1,
                  type: { name: 'HeaderClickHandler' },
                },
                columns: {
                  defaultValue: null,
                  description: '',
                  name: 'columns',
                  required: !0,
                  type: { name: 'Columns<T>' },
                },
                rows: {
                  defaultValue: null,
                  description: '',
                  name: 'rows',
                  required: !0,
                  type: { name: 'number' },
                },
              },
            }),
            'undefined' != typeof STORYBOOK_REACT_CLASSES &&
              (STORYBOOK_REACT_CLASSES[
                'libs/frontend/shared/components/glide-grid/src/lib/frontend-shared-components-glide-grid.tsx#GlideGrid'
              ] = {
                docgenInfo: GlideGrid.__docgenInfo,
                name: 'GlideGrid',
                path: 'libs/frontend/shared/components/glide-grid/src/lib/frontend-shared-components-glide-grid.tsx#GlideGrid',
              });
        } catch (__react_docgen_typescript_loader_error) {}
        var index_esm = __webpack_require__(
            './node_modules/.pnpm/@ngneat+falso@6.4.0/node_modules/@ngneat/falso/index.esm.js'
          ),
          generators_excluded = [
            'data',
            'displayData',
            'allowOverlay',
            'sortType',
          ],
          genGridCell = function genGridCell(_ref) {
            var data = _ref.data,
              _ref$displayData = _ref.displayData,
              displayData =
                void 0 === _ref$displayData ? data : _ref$displayData,
              _ref$allowOverlay = _ref.allowOverlay,
              allowOverlay = void 0 !== _ref$allowOverlay && _ref$allowOverlay,
              _ref$sortType = _ref.sortType,
              sortType =
                void 0 === _ref$sortType ? SORT_TYPES_natural : _ref$sortType,
              rest = objectWithoutPropertiesLoose_default()(
                _ref,
                generators_excluded
              );
            return Object.assign(
              { data, displayData, allowOverlay, sortType },
              rest
            );
          },
          genTextCell = function genTextCell(props) {
            return genGridCell(Object.assign({ kind: js.p6.Text }, props));
          },
          genNumericCell = function genNumericCell(props) {
            return genGridCell(
              Object.assign(
                { kind: js.p6.Text, sortType: SORT_TYPES_numeric },
                props
              )
            );
          };
        function columns_createForOfIteratorHelperLoose(o, allowArrayLike) {
          var it =
            ('undefined' != typeof Symbol && o[Symbol.iterator]) ||
            o['@@iterator'];
          if (it) return (it = it.call(o)).next.bind(it);
          if (
            Array.isArray(o) ||
            (it = (function columns_unsupportedIterableToArray(o, minLen) {
              if (!o) return;
              if ('string' == typeof o)
                return columns_arrayLikeToArray(o, minLen);
              var n = Object.prototype.toString.call(o).slice(8, -1);
              'Object' === n && o.constructor && (n = o.constructor.name);
              if ('Map' === n || 'Set' === n) return Array.from(o);
              if (
                'Arguments' === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return columns_arrayLikeToArray(o, minLen);
            })(o)) ||
            (allowArrayLike && o && 'number' == typeof o.length)
          ) {
            it && (o = it);
            var i = 0;
            return function () {
              return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
            };
          }
          throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          );
        }
        function columns_arrayLikeToArray(arr, len) {
          (null == len || len > arr.length) && (len = arr.length);
          for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
          return arr2;
        }
        var Columns = (function () {
          function Columns(columns) {
            (this.columns = void 0),
              (this.columnMap = new Map()),
              (this.uuidOrder = []),
              (this.translate = []),
              (this.sortMap = void 0),
              (this.dirty = !0),
              (this.columnsCache = []),
              (this.columns = columns),
              this.addColumnsToMap(),
              (this.sortMap = this.processColumns(columns));
          }
          var _proto = Columns.prototype;
          return (
            (_proto.addColumnsToMap = function addColumnsToMap() {
              for (
                var _step,
                  i = 0,
                  _iterator = columns_createForOfIteratorHelperLoose(
                    this.columns
                  );
                !(_step = _iterator()).done;

              ) {
                var column = _step.value,
                  id = (0, v4.Z)();
                this.uuidOrder.push(id),
                  this.columnMap.set(id, column),
                  this.translate.push(i++);
              }
            }),
            (_proto.getTranslation = function getTranslation(pos) {
              if (pos > this.translate.length || pos < 0)
                throw new Error('Out of bounds access');
              return this.translate[pos];
            }),
            (_proto.processColumns = function processColumns(columns) {
              for (
                var _step2,
                  sortMap = new Map(),
                  _iterator2 = columns_createForOfIteratorHelperLoose(columns);
                !(_step2 = _iterator2()).done;

              ) {
                var _column$cell = _step2.value.cell,
                  sortType = _column$cell.sortType,
                  displayData = _column$cell.displayData;
                sortMap.set(displayData, sortType);
              }
              return sortMap;
            }),
            (_proto.getDisplayData = function getDisplayData(colPos) {
              return this.getCell(colPos).displayData;
            }),
            (_proto.getType = function getType(key) {
              return this.sortMap.get(key) || SORT_TYPES_natural;
            }),
            (_proto.getColumns = function getColumns() {
              if (!this.dirty) return this.columnsCache;
              for (
                var _step3,
                  out = [],
                  _iterator3 = columns_createForOfIteratorHelperLoose(
                    this.translate
                  );
                !(_step3 = _iterator3()).done;

              ) {
                var colPos = _step3.value,
                  _uuid = this.uuidOrder[colPos],
                  val = this.columnMap.get(_uuid);
                val && out.push(val);
              }
              return (this.dirty = !1), (this.columnsCache = out), out;
            }),
            (_proto.getCell = function getCell(colPos) {
              if (colPos > this.uuidOrder.length || colPos < 0)
                throw new Error('Out of bounds access');
              var pos = this.translate[colPos],
                id = this.uuidOrder[pos],
                column = this.columnMap.get(id);
              if (column) return column.cell;
              throw new Error('Column does not exist');
            }),
            (_proto.swap = function swap(col1, col2) {
              if (col1 > this.uuidOrder.length || col1 < 0)
                throw new Error('col1 Out of bounds access');
              if (col2 > this.uuidOrder.length || col2 < 0)
                throw new Error('col2 Out of bounds access');
              for (
                var max = Math.max(col1, col2),
                  min = Math.min(col1, col2),
                  i = max - 1;
                i >= min;
                i--
              ) {
                var _ref = [this.translate[i + 1], this.translate[i]];
                (this.translate[i] = _ref[0]),
                  (this.translate[i + 1] = _ref[1]);
              }
              this.dirty = !0;
            }),
            createClass_default()(Columns, [
              {
                key: 'length',
                get: function get() {
                  return this.uuidOrder.length;
                },
              },
            ]),
            Columns
          );
        })();
        const frontend_shared_components_glide_grid_stories = {
          title: 'GlideGrid/PropertiesPage',
          component: GlideGrid,
          decorators: [
            function (Story) {
              return (0, jsx_runtime.jsxs)('div', {
                children: [
                  (0, jsx_runtime.jsx)(Story, {}),
                  (0, jsx_runtime.jsx)('div', { id: 'portal' }),
                ],
              });
            },
          ],
        };
        var Primary = function Primary(args) {
            return (0, jsx_runtime.jsx)('div', {
              style: { width: '80vw', height: '60vh', margin: '0 auto' },
              children: (0, jsx_runtime.jsx)(
                GlideGrid,
                Object.assign({}, args)
              ),
            });
          },
          columns = new Columns([
            {
              title: 'Property',
              id: 'property',
              grow: 2,
              cell: (function genUriCell(props) {
                return genGridCell(Object.assign({ kind: js.p6.Uri }, props));
              })({
                data: 'property',
                displayData: 'property',
                cursor: 'pointer',
                themeOverride: {
                  textDark: 'blue',
                  baseFontStyle: '12px underlined',
                },
              }),
            },
            {
              title: 'Address',
              id: 'address',
              grow: 2,
              cell: genTextCell({ data: 'address' }),
            },
            {
              title: 'Investor',
              id: 'investor',
              grow: 2,
              cell: genTextCell({ data: 'investor' }),
            },
            {
              title: 'Units',
              id: 'units',
              grow: 1,
              cell: genNumericCell({ data: 'units' }),
            },
            {
              title: 'Rent Owed',
              id: 'rentOwed',
              grow: 1,
              cell: genNumericCell({ data: 'rentOwed', contentAlign: 'right' }),
            },
          ]),
          RENT_OWED_SET = [1300.32, 1500, 700.12, 900.43, 4300.99, 543.53];
        var data = [].concat(
          Array(50)
            .fill(0)
            .map(function genProperty() {
              return {
                property: (0, index_esm.wJl)().street,
                address: (0, index_esm.wJl)().street,
                investor: (0, index_esm.T1i)(),
                units: Math.round(6 * Math.random() + 1).toString(),
                rentOwed:
                  RENT_OWED_SET[
                    Math.floor(Math.random() * RENT_OWED_SET.length)
                  ] + '',
              };
            })
        );
        Primary.args = { columns, data, rows: data.length };
        var __namedExportsOrder = ['Primary'];
      },
    './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/canvas.stories.tsx':
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.r(__webpack_exports__),
          __webpack_require__.d(__webpack_exports__, {
            Primary: () => Primary,
            __namedExportsOrder: () => __namedExportsOrder,
            default: () => __WEBPACK_DEFAULT_EXPORT__,
          });
        __webpack_require__(
          './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.fill.js'
        ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/web.timers.js'
          );
        var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
            './node_modules/.pnpm/react@18.2.0/node_modules/react/index.js'
          ),
          _easel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
            './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/easel.ts'
          ),
          _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
            './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/utils.ts'
          ),
          _stacked_triangles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
            './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/stacked-triangles.ts'
          ),
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
            './node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js'
          ),
          CanvasDemo = function CanvasDemo() {
            var canvasRef = (0, react__WEBPACK_IMPORTED_MODULE_2__.useRef)(
                null
              ),
              easel = (0, react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(
                function () {
                  return new _easel__WEBPACK_IMPORTED_MODULE_3__.N5({
                    width: 1024,
                    height: 512,
                  });
                },
                []
              ),
              triangle = (0, react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(
                function () {
                  return new _stacked_triangles__WEBPACK_IMPORTED_MODULE_5__.$({
                    width: 100,
                    height: 50,
                    gap: 24,
                  });
                },
                []
              ),
              innerDraw = (0, react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(
                function () {
                  var _canvasRef$current,
                    context =
                      null == (_canvasRef$current = canvasRef.current)
                        ? void 0
                        : _canvasRef$current.getContext('2d');
                  if (!context) throw new Error('Could not obtain context');
                  triangle.fill('red'), triangle.draw();
                  var image = triangle.image(),
                    pos = (0, _utils__WEBPACK_IMPORTED_MODULE_4__.Vd)({
                      containerWidth: 1024,
                      containerHeight: 512,
                      itemWidth: triangle.width,
                      itemHeight: triangle.height,
                      position: 'midRight',
                      padding: 32,
                    });
                  easel.putImageData(image, pos),
                    context.putImageData(easel.image(), 0, 0),
                    easel.clear();
                },
                []
              );
            return (
              (0, react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(
                function () {
                  var timeoutRef = setInterval(innerDraw, 100);
                  return function () {
                    return clearTimeout(timeoutRef);
                  };
                },
                [innerDraw]
              ),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)('div', {
                style: {
                  height: 'SIZE%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                children: (0,
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)('div', {
                  style: {
                    width: '1024px',
                    height: '512px}',
                    border: '1px solid black',
                  },
                  children: (0,
                  react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(
                    'canvas',
                    { width: 1024, height: 512, ref: canvasRef }
                  ),
                }),
              })
            );
          };
        const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Canvas',
          component: CanvasDemo,
        };
        var Primary = function Primary() {
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(
            CanvasDemo,
            {}
          );
        };
        Primary.args = {};
        var __namedExportsOrder = ['Primary'];
      },
    './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/easel.ts':
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.d(__webpack_exports__, {
          $7: () => DEFAULT_WIDTH,
          N5: () => Easel,
          R$: () => DEFAULT_HEIGHT,
        });
        __webpack_require__(
          './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.fill.js'
        );
        var DEFAULT_WIDTH = 512,
          DEFAULT_HEIGHT = 512,
          Easel = (function () {
            function Easel(props) {
              if (
                ((this.canvasRef = void 0),
                (this.context = void 0),
                (this._width = void 0),
                (this._height = void 0),
                (this._background = 'white'),
                (this.imageCache = void 0),
                (this._width =
                  null != props && props.width ? props.width : DEFAULT_WIDTH),
                (this._height =
                  null != props && props.height
                    ? props.height
                    : DEFAULT_HEIGHT),
                !document.createElement)
              )
                throw new Error(
                  'OffscreenCanvas only works in DOM environment'
                );
              this.canvasRef = new OffscreenCanvas(this._width, this._height);
              var context = this.canvasRef.getContext('2d');
              if (!context) throw new Error('Context could not be created');
              this.context = context;
            }
            var _proto = Easel.prototype;
            return (
              (_proto.drawBackground = function drawBackground() {
                (this.context.fillStyle = this._background),
                  this.context.beginPath(),
                  this.context.rect(0, 0, this._width, this._height),
                  this.context.fill();
              }),
              (_proto.background = function background(color) {
                this._background = color;
              }),
              (_proto.clearCache = function clearCache() {
                this.imageCache = void 0;
              }),
              (_proto.clearScreen = function clearScreen() {
                this.context.clearRect(0, 0, this._width, this._height);
              }),
              (_proto.clear = function clear() {
                this.clearCache(), this.clearScreen();
              }),
              (_proto.putImageData = function putImageData(image, _ref) {
                var x = _ref.x,
                  y = _ref.y;
                this.context.putImageData(image, x, y);
              }),
              (_proto.image = function image() {
                if (this.imageCache) return this.imageCache;
                var imageData = this.context.getImageData(
                  0,
                  0,
                  this._width,
                  this._height
                );
                return (this.imageCache = imageData), this.imageCache;
              }),
              (_proto.draw = function draw(processor) {
                this.imageCache && this.clearCache(), processor(this.context);
              }),
              Easel
            );
          })();
      },
    './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/stacked-triangles.ts':
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.d(__webpack_exports__, {
          $: () => StackedTriangles,
        });
        var _Users_Diatta_WebstormProjects_glide_node_modules_pnpm_babel_runtime_7_20_7_node_modules_babel_runtime_helpers_createClass_js__WEBPACK_IMPORTED_MODULE_0__ =
            __webpack_require__(
              './node_modules/.pnpm/@babel+runtime@7.20.7/node_modules/@babel/runtime/helpers/createClass.js'
            ),
          _Users_Diatta_WebstormProjects_glide_node_modules_pnpm_babel_runtime_7_20_7_node_modules_babel_runtime_helpers_createClass_js__WEBPACK_IMPORTED_MODULE_0___default =
            __webpack_require__.n(
              _Users_Diatta_WebstormProjects_glide_node_modules_pnpm_babel_runtime_7_20_7_node_modules_babel_runtime_helpers_createClass_js__WEBPACK_IMPORTED_MODULE_0__
            ),
          _easel__WEBPACK_IMPORTED_MODULE_3__ =
            (__webpack_require__(
              './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.fill.js'
            ),
            __webpack_require__(
              './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.object.assign.js'
            ),
            __webpack_require__(
              './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/easel.ts'
            )),
          _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
            './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/utils.ts'
          ),
          _triangle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
            './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/triangle.ts'
          ),
          StackedTriangles = (function () {
            function StackedTriangles(props) {
              (this._width = void 0),
                (this.itemHeight = void 0),
                (this._height = void 0),
                (this.triangle = void 0),
                (this.easel = void 0),
                (this.dirty = !0);
              var gap = null != props && props.gap ? props.gap : 0;
              this._width =
                null != props && props.width
                  ? props.width
                  : _easel__WEBPACK_IMPORTED_MODULE_3__.$7;
              var height =
                null != props && props.height
                  ? props.height
                  : _easel__WEBPACK_IMPORTED_MODULE_3__.R$;
              (this.itemHeight = height),
                (this._height = 2 * height + gap),
                (this.triangle = new _triangle__WEBPACK_IMPORTED_MODULE_5__.C({
                  width: this._width,
                  height,
                })),
                (this.easel = new _easel__WEBPACK_IMPORTED_MODULE_3__.N5({
                  width: this._width,
                  height: this._height,
                }));
            }
            var _proto = StackedTriangles.prototype;
            return (
              (_proto.image = function image() {
                return this.easel.image();
              }),
              (_proto.fill = function fill(color) {
                this.triangle.fill(color), this.clear();
              }),
              (_proto.background = function background(color) {
                this.triangle.background(color),
                  this.easel.background(color),
                  this.clear();
              }),
              (_proto.clear = function clear() {
                this.triangle.clear(), this.easel.clear(), (this.dirty = !0);
              }),
              (_proto.draw = function draw() {
                if (this.dirty) {
                  this.triangle.draw(
                    _triangle__WEBPACK_IMPORTED_MODULE_5__.K.up
                  );
                  var triangleUpImage = this.triangle.image();
                  this.triangle.clear(),
                    this.triangle.draw(
                      _triangle__WEBPACK_IMPORTED_MODULE_5__.K.down
                    );
                  var triangleDownImage = this.triangle.image();
                  this.triangle.clear(), this.easel.drawBackground();
                  var baseOptions = {
                      containerWidth: this._width,
                      containerHeight: this._height,
                      itemWidth: this._width,
                      itemHeight: this.itemHeight,
                    },
                    pos1 = (0, _utils__WEBPACK_IMPORTED_MODULE_4__.Vd)(
                      Object.assign({}, baseOptions, {
                        position: _utils__WEBPACK_IMPORTED_MODULE_4__.Eu.topMid,
                      })
                    ),
                    pos2 = (0, _utils__WEBPACK_IMPORTED_MODULE_4__.Vd)(
                      Object.assign({}, baseOptions, {
                        position: _utils__WEBPACK_IMPORTED_MODULE_4__.Eu.botMid,
                      })
                    );
                  this.easel.putImageData(triangleUpImage, pos1),
                    this.easel.putImageData(triangleDownImage, pos2),
                    (this.dirty = !1);
                }
              }),
              _Users_Diatta_WebstormProjects_glide_node_modules_pnpm_babel_runtime_7_20_7_node_modules_babel_runtime_helpers_createClass_js__WEBPACK_IMPORTED_MODULE_0___default()(
                StackedTriangles,
                [
                  {
                    key: 'width',
                    get: function get() {
                      return this._width;
                    },
                  },
                  {
                    key: 'height',
                    get: function get() {
                      return this._height;
                    },
                  },
                ]
              ),
              StackedTriangles
            );
          })();
      },
    './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/triangle.ts':
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.d(__webpack_exports__, {
          C: () => Triangle,
          K: () => TRIANGLE_DIRECTIONS,
        });
        __webpack_require__(
          './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.fill.js'
        );
        var _easel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/easel.ts'
          ),
          _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
            './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/utils.ts'
          ),
          TRIANGLE_DIRECTIONS = {
            up: 'up',
            down: 'down',
            left: 'left',
            right: 'right',
          },
          Triangle = (function () {
            function Triangle(props) {
              (this._width = void 0),
                (this._height = void 0),
                (this.easel = void 0),
                (this.fillColor = 'black'),
                (this.lastDirection = void 0),
                (this._width =
                  null != props && props.width
                    ? props.width
                    : _easel__WEBPACK_IMPORTED_MODULE_1__.$7),
                (this._height =
                  null != props && props.height
                    ? props.height
                    : _easel__WEBPACK_IMPORTED_MODULE_1__.R$),
                (this.easel = new _easel__WEBPACK_IMPORTED_MODULE_1__.N5(
                  props
                ));
            }
            var _proto = Triangle.prototype;
            return (
              (_proto.image = function image() {
                return this.easel.image();
              }),
              (_proto.fill = function fill(color) {
                this.fillColor = color;
              }),
              (_proto.background = function background(color) {
                this.easel.background(color);
              }),
              (_proto.drawUp = function drawUp() {
                var _this = this;
                this.easel.draw(function (ctx) {
                  _this.easel.drawBackground();
                  var _midPoint = (0, _utils__WEBPACK_IMPORTED_MODULE_2__.kh)(
                    0,
                    _this._width
                  );
                  (ctx.fillStyle = _this.fillColor),
                    ctx.beginPath(),
                    ctx.moveTo(_midPoint, 0),
                    ctx.lineTo(0, _this._height),
                    ctx.lineTo(_this._width, _this._height),
                    ctx.fill();
                });
              }),
              (_proto.drawDown = function drawDown() {
                var _this2 = this;
                this.easel.draw(function (ctx) {
                  _this2.easel.drawBackground();
                  var _midPoint = (0, _utils__WEBPACK_IMPORTED_MODULE_2__.kh)(
                    0,
                    _this2._width
                  );
                  (ctx.fillStyle = _this2.fillColor),
                    ctx.beginPath(),
                    ctx.moveTo(_midPoint, _this2._height),
                    ctx.lineTo(0, 0),
                    ctx.lineTo(_this2._width, 0),
                    ctx.fill();
                });
              }),
              (_proto.drawRight = function drawRight() {
                var _this3 = this;
                this.easel.draw(function (ctx) {
                  _this3.easel.drawBackground();
                  var _midPoint = (0, _utils__WEBPACK_IMPORTED_MODULE_2__.kh)(
                    0,
                    _this3._height
                  );
                  (ctx.fillStyle = _this3.fillColor),
                    ctx.beginPath(),
                    ctx.moveTo(_this3._width, _midPoint),
                    ctx.lineTo(0, 0),
                    ctx.lineTo(0, _this3._height),
                    ctx.fill();
                });
              }),
              (_proto.drawLeft = function drawLeft() {
                var _this4 = this;
                this.easel.draw(function (ctx) {
                  _this4.easel.drawBackground();
                  var _midPoint = (0, _utils__WEBPACK_IMPORTED_MODULE_2__.kh)(
                    0,
                    _this4._height
                  );
                  (ctx.fillStyle = _this4.fillColor),
                    ctx.beginPath(),
                    ctx.moveTo(0, _midPoint),
                    ctx.lineTo(_this4._width, _this4._height),
                    ctx.lineTo(_this4._width, 0),
                    ctx.fill();
                });
              }),
              (_proto.clear = function clear() {
                this.easel.clear(), (this.lastDirection = void 0);
              }),
              (_proto.draw = function draw(direction) {
                if (
                  (void 0 === direction && (direction = TRIANGLE_DIRECTIONS.up),
                  this.lastDirection !== direction)
                )
                  switch (((this.lastDirection = direction), direction)) {
                    case TRIANGLE_DIRECTIONS.up:
                      return void this.drawUp();
                    case TRIANGLE_DIRECTIONS.right:
                      return void this.drawRight();
                    case TRIANGLE_DIRECTIONS.left:
                      return void this.drawLeft();
                    case TRIANGLE_DIRECTIONS.down:
                      return void this.drawDown();
                  }
              }),
              Triangle
            );
          })();
      },
    './libs/frontend/shared/components/glide-grid/src/lib/utils/canvas/utils.ts':
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        'use strict';
        __webpack_require__.d(__webpack_exports__, {
          Eu: () => ALIGNMENTS,
          Vd: () => positioner,
          kh: () => midPoint,
        });
        var midPoint = function midPoint(start, end) {
            return (end + start) / 2;
          },
          ALIGNMENTS = {
            topLeft: 'topLeft',
            topMid: 'topMid',
            topRight: 'topRight',
            midLeft: 'midLeft',
            midMid: 'midMid',
            midRight: 'midRight',
            botLeft: 'botLeft',
            botMid: 'botMid',
            botRight: 'botRight',
          },
          midPointShift = function midPointShift(containerWidth, itemWidth) {
            return midPoint(0, containerWidth) - midPoint(0, itemWidth);
          },
          positioner = function positioner(props) {
            var containerWidth = props.containerWidth,
              containerHeight = props.containerHeight,
              itemWidth = props.itemWidth,
              itemHeight = props.itemHeight,
              position = props.position,
              _props$padding = props.padding,
              padding = void 0 === _props$padding ? 0 : _props$padding,
              widthDiff = containerWidth - itemWidth - padding,
              heightDiff = containerHeight - itemHeight - padding;
            switch (position) {
              case ALIGNMENTS.topLeft:
                return { x: padding, y: padding };
              case ALIGNMENTS.topMid:
                return {
                  x: midPointShift(containerWidth, itemWidth),
                  y: padding,
                };
              case ALIGNMENTS.topRight:
                return { x: widthDiff, y: padding };
              case ALIGNMENTS.midLeft:
                return {
                  x: padding,
                  y: midPointShift(containerHeight, itemHeight),
                };
              case ALIGNMENTS.midMid:
                return {
                  x: midPointShift(containerWidth, itemWidth),
                  y: midPointShift(containerHeight, itemHeight),
                };
              case ALIGNMENTS.midRight:
                return {
                  x: widthDiff,
                  y: midPointShift(containerHeight, itemHeight),
                };
              case ALIGNMENTS.botLeft:
                return { x: padding, y: heightDiff };
              case ALIGNMENTS.botMid:
                return {
                  x: midPointShift(containerWidth, itemWidth),
                  y: heightDiff,
                };
              case ALIGNMENTS.botRight:
                return { x: widthDiff, y: heightDiff };
            }
            return { x: 0, y: 0 };
          };
      },
    './libs/frontend/shared/components/glide-grid/.storybook/preview.js-generated-config-entry.js':
      (
        __unused_webpack_module,
        __unused_webpack___webpack_exports__,
        __webpack_require__
      ) => {
        'use strict';
        var preview_namespaceObject = {};
        __webpack_require__.r(preview_namespaceObject);
        __webpack_require__(
          './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.object.keys.js'
        ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.symbol.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.filter.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.object.to-string.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.object.get-own-property-descriptor.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.for-each.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/web.dom-collections.for-each.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.object.get-own-property-descriptors.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.object.define-properties.js'
          ),
          __webpack_require__(
            './node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.object.define-property.js'
          );
        var ClientApi = __webpack_require__(
          './node_modules/.pnpm/@storybook+client-api@6.5.15_biqbaboplfbrettd7655fr4n2y/node_modules/@storybook/client-api/dist/esm/ClientApi.js'
        );
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            enumerableOnly &&
              (symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              })),
              keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _defineProperty(obj, key, value) {
          return (
            key in obj
              ? Object.defineProperty(obj, key, {
                  value,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (obj[key] = value),
            obj
          );
        }
        Object.keys(preview_namespaceObject).forEach(function (key) {
          var value = preview_namespaceObject[key];
          switch (key) {
            case 'args':
              return (0, ClientApi.uc)(value);
            case 'argTypes':
              return (0, ClientApi.v9)(value);
            case 'decorators':
              return value.forEach(function (decorator) {
                return (0, ClientApi.$9)(decorator, !1);
              });
            case 'loaders':
              return value.forEach(function (loader) {
                return (0, ClientApi.HZ)(loader, !1);
              });
            case 'parameters':
              return (0, ClientApi.h1)(
                (function _objectSpread(target) {
                  for (var i = 1; i < arguments.length; i++) {
                    var source = null != arguments[i] ? arguments[i] : {};
                    i % 2
                      ? ownKeys(Object(source), !0).forEach(function (key) {
                          _defineProperty(target, key, source[key]);
                        })
                      : Object.getOwnPropertyDescriptors
                      ? Object.defineProperties(
                          target,
                          Object.getOwnPropertyDescriptors(source)
                        )
                      : ownKeys(Object(source)).forEach(function (key) {
                          Object.defineProperty(
                            target,
                            key,
                            Object.getOwnPropertyDescriptor(source, key)
                          );
                        });
                  }
                  return target;
                })({}, value),
                !1
              );
            case 'argTypesEnhancers':
              return value.forEach(function (enhancer) {
                return (0, ClientApi.My)(enhancer);
              });
            case 'argsEnhancers':
              return value.forEach(function (enhancer) {
                return (0, ClientApi._C)(enhancer);
              });
            case 'render':
              return (0, ClientApi.$P)(value);
            case 'globals':
            case 'globalTypes':
              var v = {};
              return (v[key] = value), (0, ClientApi.h1)(v, !1);
            case '__namedExportsOrder':
            case 'decorateStory':
            case 'renderToDOM':
              return null;
            default:
              return console.log(key + ' was not supported :( !');
          }
        });
      },
    './storybook-init-framework-entry.js': (
      __unused_webpack_module,
      __unused_webpack___webpack_exports__,
      __webpack_require__
    ) => {
      'use strict';
      __webpack_require__(
        './node_modules/.pnpm/@storybook+react@6.5.15_6nzrhyfphmh5keix3mwc3iy6zq/node_modules/@storybook/react/dist/esm/client/index.js'
      );
    },
    '?1f41': () => {},
    '?69c0': () => {},
    './generated-stories-entry.cjs': (
      module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      'use strict';
      (module = __webpack_require__.nmd(module)),
        (0,
        __webpack_require__(
          './node_modules/.pnpm/@storybook+react@6.5.15_6nzrhyfphmh5keix3mwc3iy6zq/node_modules/@storybook/react/dist/esm/client/index.js'
        ).configure)(
          [
            __webpack_require__(
              './libs/frontend/shared/components/glide-grid/src/lib sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$'
            ),
            __webpack_require__(
              './libs/frontend/shared/components/glide-grid/src/lib sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$'
            ),
          ],
          module,
          !1
        );
    },
  },
  (__webpack_require__) => {
    var __webpack_exec__ = (moduleId) =>
      __webpack_require__((__webpack_require__.s = moduleId));
    __webpack_require__.O(
      0,
      [988],
      () => (
        __webpack_exec__(
          './node_modules/.pnpm/@storybook+core-client@6.5.15_vknrbelhugdkckamahrfl2bl2m/node_modules/@storybook/core-client/dist/esm/globals/polyfills.js'
        ),
        __webpack_exec__(
          './node_modules/.pnpm/@storybook+core-client@6.5.15_vknrbelhugdkckamahrfl2bl2m/node_modules/@storybook/core-client/dist/esm/globals/globals.js'
        ),
        __webpack_exec__('./storybook-init-framework-entry.js'),
        __webpack_exec__(
          './node_modules/.pnpm/@storybook+react@6.5.15_6nzrhyfphmh5keix3mwc3iy6zq/node_modules/@storybook/react/dist/esm/client/docs/config-generated-config-entry.js'
        ),
        __webpack_exec__(
          './node_modules/.pnpm/@storybook+react@6.5.15_6nzrhyfphmh5keix3mwc3iy6zq/node_modules/@storybook/react/dist/esm/client/preview/config-generated-config-entry.js'
        ),
        __webpack_exec__(
          './node_modules/.pnpm/@storybook+addon-actions@6.5.15_biqbaboplfbrettd7655fr4n2y/node_modules/@storybook/addon-actions/preview.js-generated-config-entry.js'
        ),
        __webpack_exec__(
          './node_modules/.pnpm/@storybook+addon-backgrounds@6.5.15_biqbaboplfbrettd7655fr4n2y/node_modules/@storybook/addon-backgrounds/preview.js-generated-config-entry.js'
        ),
        __webpack_exec__(
          './node_modules/.pnpm/@storybook+addon-measure@6.5.15_biqbaboplfbrettd7655fr4n2y/node_modules/@storybook/addon-measure/preview.js-generated-config-entry.js'
        ),
        __webpack_exec__(
          './node_modules/.pnpm/@storybook+addon-outline@6.5.15_biqbaboplfbrettd7655fr4n2y/node_modules/@storybook/addon-outline/preview.js-generated-config-entry.js'
        ),
        __webpack_exec__(
          './libs/frontend/shared/components/glide-grid/.storybook/preview.js-generated-config-entry.js'
        ),
        __webpack_exec__('./generated-stories-entry.cjs')
      )
    );
    __webpack_require__.O();
  },
]);