'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//Requirements

module.exports = function (data, context) {
    var dataList = data.dataList;
    var totalCount = data.totalCount;

    var otherProps = _objectWithoutProperties(data, ['dataList', 'totalCount']);

    if (context.isScroll) {
        dataList = [].concat(_toConsumableArray(context.dataList), _toConsumableArray(data.dataList));
    }
    if (dataList.length === 0 && totalCount > 0) {
        throw new Error('totalCount must be equal to zero when no data are returned!!');
    }
    return _extends({
        dataList: dataList,
        totalCount: totalCount
    }, otherProps);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUVBLE9BQU8sT0FBUCxHQUFpQixVQUFDLElBQUQsRUFBTyxPQUFQLEVBQW1CO0FBQUEsUUFDM0IsUUFEMkIsR0FDWSxJQURaLENBQzNCLFFBRDJCO0FBQUEsUUFDakIsVUFEaUIsR0FDWSxJQURaLENBQ2pCLFVBRGlCOztBQUFBLFFBQ0YsVUFERSw0QkFDWSxJQURaOztBQUVoQyxRQUFHLFFBQVEsUUFBWCxFQUFvQjtBQUNoQixnREFBZSxRQUFRLFFBQXZCLHNCQUFvQyxLQUFLLFFBQXpDO0FBQ0g7QUFDRCxRQUFLLFNBQVMsTUFBVCxLQUFvQixDQUFyQixJQUE0QixhQUFhLENBQTdDLEVBQWdEO0FBQzVDLGNBQU0sSUFBSSxLQUFKLENBQVUsOERBQVYsQ0FBTjtBQUNIO0FBQ0Q7QUFDSSxrQkFBVSxRQURkO0FBRUksb0JBQVk7QUFGaEIsT0FHTyxVQUhQO0FBS0gsQ0FiRCIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1JlcXVpcmVtZW50c1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZGF0YSwgY29udGV4dCkgPT4ge1xyXG4gICAgbGV0IHtkYXRhTGlzdCwgdG90YWxDb3VudCwgLi4ub3RoZXJQcm9wc30gPSBkYXRhO1xyXG4gICAgaWYoY29udGV4dC5pc1Njcm9sbCl7XHJcbiAgICAgICAgZGF0YUxpc3QgPSBbLi4uY29udGV4dC5kYXRhTGlzdCwgLi4uZGF0YS5kYXRhTGlzdF07XHJcbiAgICB9XHJcbiAgICBpZiAoKGRhdGFMaXN0Lmxlbmd0aCA9PT0gMCkgJiYgKHRvdGFsQ291bnQgPiAwKSl7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0b3RhbENvdW50IG11c3QgYmUgZXF1YWwgdG8gemVybyB3aGVuIG5vIGRhdGEgYXJlIHJldHVybmVkISEnKTtcclxuICAgIH1cclxuICAgIHJldHVybiAoe1xyXG4gICAgICAgIGRhdGFMaXN0OiBkYXRhTGlzdCxcclxuICAgICAgICB0b3RhbENvdW50OiB0b3RhbENvdW50LFxyXG4gICAgICAgIC4uLm90aGVyUHJvcHNcclxuICAgIH0pO1xyXG59O1xyXG4iXX0=