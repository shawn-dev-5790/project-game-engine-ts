import fs from "fs";
import path from "path";

// 디렉토리 내 모든 파일의 이름을 소문자로 변경하고 정보를 수집하는 함수
function renameAllPublicAssetsByFormat(directory, assets = []) {
  // 디렉토리 내 파일들에 대한 반복문
  fs.readdirSync(directory).forEach((file) => {
    const oldFilePath = path.join(directory, file);
    const newFilePath = path.join(directory, file.toLowerCase());
    const assetPath = newFilePath.split("public")[1];
    const assetName = newFilePath
      .split("public")[1]
      .slice(1)
      .replaceAll("/", "_")
      .replace(path.extname(file), "");

    // 만약 디렉토리라면 재귀적으로 함수 호출
    if (fs.statSync(oldFilePath).isDirectory()) {
      return renameAllPublicAssetsByFormat(oldFilePath, assets);
    }

    // 파일 이름을 소문자로 변경하고 정보 수집
    fs.renameSync(oldFilePath, newFilePath);

    assets.push({
      [assetName]: assets.length,
      name: assetName,
      path: assetPath,
    });
  });

  return assets;
}

// assets 정보를 파일로 생성하는 함수
function createAssetsConfigFile(path, assets = []) {
  fs.writeFileSync(path, JSON.stringify(assets, null, 2), "utf-8");

  return assets;
}

const configFilePath = "./src/config/assets.json"; // 생성될 파일 경로
const configFileData = renameAllPublicAssetsByFormat("./public"); // 디렉토리 내 파일들을 소문자로 변경하고 정보 수집

createAssetsConfigFile(configFilePath, configFileData); // assets 정보를 파일로 생성
