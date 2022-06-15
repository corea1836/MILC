//여기 폴더에 배고관련 코드 작성








//
const Migrations = artifacts.require("Migrations");
//                          ㄴrequire가 빌드폴더 안의 "Migrations".json을 가져와 저장

module.exports = function(deployer) {// json 안의 바이트 코드를 가지고와 deployer에 배포
  deployer.deploy(Migrations);
  //deployer => 배포를 위해서는 이더리움의 주소 필요
  // config에서 주소 지정 deployer에 저장됨 
};
