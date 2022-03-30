const isObjectId = (val: any) => val.match(/^[a-f\d]{24}$/i);

export default isObjectId;
