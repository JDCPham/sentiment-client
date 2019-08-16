# Finatext UK sentiment API documentation

## GET api/sentiment/
Returns a list, containing an object for each cryptocurrency. Each object contains the `asset` code, a timestamp in `epoch` and `date` format, the corresponding `sentiment` score and sentiment `category`.
The `sentiment` score for each currency is updated every hour at 5 minutes past the hour.

### Request information

#### Headers
`x-api-key: {your_api_key}`

#### Parameters
`api/sentiment/?asset={ASSET_SYMBOL}`

`ASSET_SYMBOL`: 3 letters asset symbol for a specific cryptocurrency.

Available assets:
* `btc` - Bitcoin
* `eth` - Ethereum
* `xrp` - Ripple
* `ltc` - Litecoin
* `bch` - Bitcoin cash
* `eos` - EOS

To return sentiment for all available cryptocurrencies, query without any parameter.

#### Request examples
1. Returns sentiment for all available cryptocurrencies.
  * https://fywvr4qneh.execute-api.us-east-2.amazonaws.com/api/sentiment/
2. Returns sentiment for the specified cryptocurrency.
  * https://fywvr4qneh.execute-api.us-east-2.amazonaws.com/api/sentiment/?asset=btc

### Response information
If an asset is specified, an object with the following information is returned:
- asset, datetime information, numerical sentiment and its category.

If no query parameter specified, an array of all available assets containing the following information is returned:
- asset, datetime information, numerical sentiment and its category.

#### Response format
`application/json`

| Name (type)            | Description                                                                                               |
|------------------------|-----------------------------------------------------------------------------------------------------------|
| asset (string)         | 3 letters asset symbol of the cryptocurrency.                                                             |
| date (string)          | Datetime (string in isoformat) of the sentiment datapoint.                                                |
| epoch (integer)        | Timestamp (seconds) of the sentiment datapoint.                                                           |
| sentiment (float)      | Numeric form of the sentiment, between -1 and 1                                                           |
| category (string)      | Sentiment can be one of the following: Strongly negative, Negative, Neutral, Positive, Strongly positive  |

#### Response example

Single cryptocurrency:
```javascript
{
    "asset": "btc",
    "date": "2019-08-13T15:00:00+00:00",
    "epoch": 1565708400,
    "sentiment": 0.012,
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

### Sentiment categories

To standardise sentiment across different cryptocurrencies, the sentiment is normalised to output values between -1 to 1.
Historical BTC sentiment was used as a benchmark to normalise raw sentiment data from other cryptocurrencies.
Categories are linearly spaced, with intervals as shown below:

| (lower bound, upper bound] | Category          |
|----------------------------|-------------------|
| (-1.0, -0.6]               | Strongly negative |
| (-0.6, -0.2]               | Negative          |
| (-0.2, 0.2]                | Neutral           |
| (0.2, 0.6]                 | Positive          |
| (0.6, 1.0]                 | Strongly positive |

### Error handling
#### 403 Forbidden

Given that the endpoint requested is correct, user may receive the following message if requests are made from a non-whitelisted IP.
```javascript
{
    "Message":"User: anonymous is not authorized to perform: execute-api:Invoke on resource: arn:aws:execute-api:us-east-2:********1977:fywvr4qneh/api/GET/sentiment/"
}
```

Please check that the API key is present in the Headers.
```javascript
{
    "message": "Forbidden"
}
```

Please check that the request endpoint is correct.
```javascript
{
    "message": "Missing Authentication Token"
}
```

#### 404 Not Found

If a blank query parameter or an unavailable asset symbol is given, the following message will be received:
```javascript
{
    "message": "{QUERY} is not valid. Available assets: {SET_OF_AVAILABLE_ASSETS}."
} 
```

Example query:

```api/sentiment/?asset=abcd```

Returns:
```javascript
{
    "message": "abcd is not valid. Available assets: {'xrp', 'eos', 'eth', 'btc', 'bch', 'ltc'}."
} 
```

#### 429 Too Many Requests

If too many requests, please wait until quota become available again or contact support to raise the quota.
```javascript
{
    "message": "Limit Exceeded"
}
```

#### 503 Service Unavailable

In rare circumstances where sentiment data is unavailable for a prolonged period of time, API returns the following message:
```javascript
{
    "message": "Sentiment data is not available at the moment."
}
```