-----------------------------------------------------------------------
--
-- Copyright (C) 2021 CARTO
--
-----------------------------------------------------------------------

CREATE OR REPLACE FUNCTION `@@BQ_PROJECTID@@.@@BQ_DATASET_MEASUREMENTS@@.__AZIMUTH`
    (geojsonStart STRING, geojsonEnd STRING)
    RETURNS FLOAT64
    DETERMINISTIC
    LANGUAGE js
    OPTIONS (library=["@@MEASUREMENTS_BQ_LIBRARY@@"])
AS """
    if (!geojsonStart || !geojsonEnd) {
        return null;
    }
    return turf.bearing(JSON.parse(geojsonStart), JSON.parse(geojsonEnd));
""";

CREATE OR REPLACE FUNCTION `@@BQ_PROJECTID@@.@@BQ_DATASET_MEASUREMENTS@@.ST_AZIMUTH`
    (startPoint GEOGRAPHY, endPoint GEOGRAPHY)
AS (
    `@@BQ_PROJECTID@@`.@@BQ_DATASET_MEASUREMENTS@@.__AZIMUTH(ST_ASGEOJSON(startPoint), ST_ASGEOJSON(endPoint))
);