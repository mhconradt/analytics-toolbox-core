### ST_DELAUNAYLINES

{{% bannerNote type="code" %}}
carto.ST_DELAUNAYLINES(points)
{{%/ bannerNote %}}

**Description**

Calculates the Delaunay triangulation of the points provided. An array of linestring is returned.

* `points`: `ARRAY<GEOGRAPHY>` input to the Delaunay triangulation.

**Return type**

`ARRAY<GEOGRAPHY>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

``` sql
SELECT `carto-os`.carto.ST_DELAUNAYLINES([ST_GEOGPOINT(-74.5366825512491, 43.6889777784079), ST_GEOGPOINT(-74.4821382017478, 43.3096147774153), ST_GEOGPOINT(-70.7632814028801, 42.9679602005825), ST_GEOGPOINT(-73.3262122666779, 41.2706174323278), ST_GEOGPOINT(-70.2005131676838, 43.8455720129728), ST_GEOGPOINT(-73.9704330709753, 35.3953164724094), ST_GEOGPOINT(-72.3402283537205, 35.8941454568627), ST_GEOGPOINT(-72.514071762468, 36.5823995124737)]);
-- LINESTRING(-74.5366825512491 43.6889777784079, -70.7632814028801 ...
-- LINESTRING(-74.4821382017478 43.3096147774153, -74.5366825512491  ...
-- LINESTRING(-73.3262122666779 41.2706174323278, -74.4821382017478 ... 
-- LINESTRING(-73.9704330709753 35.3953164724094, -72.3402283537205 ...
-- LINESTRING(-73.9704330709753 35.3953164724094, -72.514071762468 ...
-- LINESTRING(-72.514071762468 36.5823995124737, -73.3262122666779 ...
```