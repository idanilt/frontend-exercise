import { interval, from } from 'rxjs';
import { mergeMap, map, startWith } from 'rxjs/operators';

function hashCode(s) {
    var text = "";
    var possible = "ABCDEFGHJKL";

    for (var i = 0; i < s.length; i++)
        text += possible.charAt(s.charCodeAt(i)-48);

    return text;
}
const createAsset = (assetId, assetType) => {
  return {
    id: assetId,
    assetName: hashCode(assetId.toString()),
    price: Math.random()*10,
    lastUpdate: Date.now(),
    type: assetType
  }
};

const getAllAssets = (n) => {
  const result = [];
  for (let i = 10000; i < 10000 + n; i++) {
    result.push(createAsset(i, 'Stock'));
    result.push(createAsset(i+n, 'Currency'));
  }
  return result;
};

const assets = getAllAssets(200);

const mock$ = interval(1000)
  .pipe(
    startWith(0),
    mergeMap(
      () => from(assets)
        .pipe(
          map(val => {
            const random = Math.random();
            val.price = random >= 0.5 ? val.price + random : val.price - random;
            val.lastUpdate = Date.now();
            return val;
          })
        )
    )
  );


export default mock$;
