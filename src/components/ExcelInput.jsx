const ExcelInput = () => {
  return (
    <input
      id="readExcel"
      type="file"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      onChange={(e) => console.log(e.target.files[0])}
    ></input>
  );
};

export default ExcelInput;
