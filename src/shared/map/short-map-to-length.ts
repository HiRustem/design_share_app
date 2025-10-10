function shortMapToLength<MapKeyType, MapValueType>(
  map: Map<MapKeyType, MapValueType>,
  length: number,
): Map<MapKeyType, MapValueType> {
  if (map.size === length || map.size === 0) return map;

  const shortedMap = new Map<MapKeyType, MapValueType>();
  const mapKeys = Array.from(map.keys());

  for (let i = 0; i < length; i++) {
    const currentKey = mapKeys[i];
    const currentValue = map.get(currentKey);

    if (!currentValue) continue;

    shortedMap.set(currentKey, currentValue);
  }

  return shortedMap;
}

export default shortMapToLength;
