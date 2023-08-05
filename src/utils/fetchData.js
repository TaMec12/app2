async function fetchData() {
  var page1 = await fetch("https://test.create.diagnal.com/data/page3.json");
  var data = await page1.json();
  return data;
}

export default fetchData;