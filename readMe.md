# Finatext UK sentiment API documentation

## GET api/sentiment
Returns a list of sentiments or a sentiment for the specified cryptocurrency.

### Request information

#### Headers
`x-api-key: {your_api_key}`
#### Parameters
api/sentiment/?asset=btc
asset: 3 letters asset symbol for a specific cryptocurrency. (e.g. btc for bitcoin)
To return sentiment for all available cryptocurrencies, query without any parameter.

### Response information
A list of asset(s) containing their corresponding latest sentiment datapoint and sentiment category.

### Response format
`application/json`

| Name(type)       | Description                                                                                               |
|------------------|-----------------------------------------------------------------------------------------------------------|
| asset(string)    | 3 letters asset symbol of the cryptocurrency.                                                             |
| date(string)     | Datetime (string in isoformat) of the sentiment datapoint.                                                |
| epoch(integer)   | Timestamp (seconds) of the sentiment datapoint.                                                           |
| sentiment(float) | Numeric form of the sentiment.                                                                            |
| category(string) | Sentiment can be one of the following: Strongly negative, Negative, Neutral, Positive, Strongly positive  |

### Response example

Single cryptocurrency:
```javascript
{
    "asset": "btc",
    "date": "2019-08-13T15:00:00+00:00",
    "epoch": 1565708400,
    "sentiment": 0.123,
    "category": "Neutral"
}
````

Multiple cryptocurrencies:
```javascript
[
    {
        "asset": "btc",
        "date": "2019-08-13T15:00:00+00:00",
        "epoch": 1565708400,
        "sentiment": 0.012,
        "category": "Neutral"
    },
    {
        "asset": "eth",
        "date": "2019-08-13T15:00:00+00:00",
        "epoch": 1565708400,
        "sentiment": 0.123,
        "category": "Positive"
    },
    {
        "asset": "xrp",
        "date": "2019-08-13T15:00:00+00:00",
        "epoch": 1565708400,
        "sentiment": -0.123,
        "category": "Negative"
    }
]
```

### Examples
1. Returns sentiment for all available cryptocurrencies.
  * https://fywvr4qneh.execute-api.us-east-2.amazonaws.com/api/sentiment/
2. Returns sentiment for the specified cryptocurrency.
  * https://fywvr4qneh.execute-api.us-east-2.amazonaws.com/api/sentiment/?asset=btc

### Sentiment calculations detail
To standardise sentiment across different cryptocurrencies, the sentiment is normalised to output values between -1 to 1.
Historical BTC sentiment (spanning over 1.5 years) was used as a benchmark to normalise raw sentiment data from other cryptocurrencies.
Categories are linearly spaced, with intervals as shown below:

| (lower bound, upper bound] | Category          |
|----------------------------|-------------------|
| (-1.0, -0.6]               | Strongly negative |
| (-0.6, -0.2]               | Negative          |
| (-0.2, 0.2]                | Neutral           |
| (0.2, 0.6]                 | Positive          |
| (0.6, 1.0]                 | Strongly positive |
