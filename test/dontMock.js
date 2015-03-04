//Exceptions.
function exception(){
  jest.dontMock('../exception.js');
  jest.dontMock('../exception/ArgumentInvalidException.js');
  jest.dontMock('../exception/ArgumentNullException.js');
  jest.dontMock('../exception/CustomException.js');
}

function util(){
  jest.dontMock('../util.js');
  jest.dontMock('../util/string/check.js')
  jest.dontMock('../util/object/check.js')
  jest.dontMock('../util/object/checkIsNotNull.js');
}

function all(){
  exception();
  util();
}

//util
