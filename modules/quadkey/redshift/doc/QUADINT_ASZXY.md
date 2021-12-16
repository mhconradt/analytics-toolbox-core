### QUADINT_ASZXY

{{% bannerNote type="code" %}}
carto.QUADINT_ASZXY(quadint)
{{%/ bannerNote %}}

**Description**

Returns the zoom level `z` and coordinates `x`, `y` for a given quadint.

* `quadint`: `BIGINT` quadint we want to extract tile information from.

**Return type**

`SUPER`

**Example**

```sql
SELECT carto.QUADINT_ASZXY(4388);
-- z  x  y
-- 4  9  8
```