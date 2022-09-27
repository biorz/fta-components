// 解决组件相互依赖
const path = require("path");

const COMMON_PATH = "../common";

const basicComponents = getBasicComponents();

module.exports = function (importee, importer) {
  // 入口文件， 不做处理
  if (!importer) return;

  // common 包提出来
  if (/\.\.\/common$/.test(importee)) {
    return COMMON_PATH;
  }

  // 不是相对路径的话也不做处理
  if (!isRelativePath(importee)) return;
  const importerDir = path.dirname(importer);
  const importeeComponent = path.resolve(importerDir, importee);

  // 如果是 componentA import componentB，则需要处理
  const componentIds = [importeeComponent, importer].map((item) => {
    return basicComponents.findIndex(([_key, componentPath]) =>
      item.includes("components-basic/" + componentPath)
    );
  });

  if (
    componentIds.every((item) => item > -1) &&
    componentIds[0] != componentIds[1]
  ) {
    console.log(importee, importer);
    const [_name, componentPath] = basicComponents[componentIds[0]];
    return `../${componentPath.replace("components/", "")}`;
  }

  return null;
};

function getBasicComponents() {
  const componentMapPath = path.resolve(__dirname, `../component-map.json`);
  const components = require(componentMapPath);

  return Object.entries(components).map(([key, item]) => {
    return [key, item.replace];
  });
}

function isRelativePath(filePath) {
  return filePath.match(/^\.?\.\//);
}
