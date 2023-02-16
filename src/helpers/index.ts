import * as codename from '../../public/data/codename.json';

const getCodename = (cname: string) => {
  const { Entity, Code } = codename as unknown as {
    Entity: string[];
    Code: string[];
  };
  const index = Object.keys(Entity).find(
    (key: any) => Entity[key] === cname,
  ) as unknown as number;
  const code = Code[index];
  return code;
};

const getCountryName = (cname: string) => {
  const { Entity, Code } = codename as unknown as {
    Entity: string[];
    Code: string[];
  };
  const index = Object.keys(Code).find(
    (key: any) => Code[key] === cname,
  ) as unknown as number;
  const name = Entity[index];
  return name;
};
export { getCodename, getCountryName };
