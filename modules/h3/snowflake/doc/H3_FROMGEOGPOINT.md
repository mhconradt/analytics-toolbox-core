### H3_FROMGEOGPOINT

{{% bannerNote type="code" %}}
carto.H3_FROMGEOGPOINT(point, resolution)
{{%/ bannerNote %}}

**Description**

Returns the H3 cell index that the point belongs to in the required `resolution`. It will return `null` on error (invalid geography type or resolution out of bounds).

* `point`: `GEOGRAPHY` point to get the H3 cell from.
* `resolution`: `INT` number between 0 and 15 with the [H3 resolution](https://h3geo.org/docs/core-library/restable).

**Return type**

`STRING`

**Example**

```sql
SELECT carto.H3_FROMGEOGPOINT(ST_POINT(40.4168, -3.7038), 4);
-- 847b59dffffffff
```

{{% bannerNote type="note" title="tip"%}}
If you want the cells covered by a POLYGON see [H3_POLYFILL](#st_ash3_polyfill).
{{%/ bannerNote %}}