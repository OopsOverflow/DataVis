import * as codename from '../../public/data/codename.json';

const getCodename = (cname: string) => {
  const { Entity, Code } = codename;
  const index = Object.keys(Entity).find((key : any) => Entity[key] === cname);
  const code = Code[index];
  return code
}


const getCountryName = (cname: string) => {
  const { Entity, Code } = codename;
  const index = Object.keys(Code).find((key : any) => Code[key] === cname);
  const name = Entity[index];
  return name
}
export {
  getCodename,
  getCountryName
}