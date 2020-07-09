const path = require('path');
const files = require.context('../../assets/img', false, /\.png$/);
// console.log(files);
// console.log(files.keys());
let arr = [];

const requireAll = requireContext => requireContext.keys().map(requireContext);
const wyc = function(requireContext){
  return requireContext.keys().map(requireContext)
};
// console.log(wyc(files));
// console.log(requireAll(files));

files.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = files(fileName)
  // Get the PascalCase version of the component name
  const componentName = fileName.split('/')
    .pop()
    .replace(/\.\w+$/, '')
   // console.log(componentConfig);
   // console.log(componentName)
  // Globally register the component

})

// console.log(require.context('./'));
