---
sidebar_position: 2
---

# Integration with Pix

The Payment Gateway API allows you to easily integrate your business to accept payments using methods such as Pix, TED, Credit Card, and Billet.
URL base to do requests: 
`https://api.firepagamentos.com.br`

## Endpoints

### POST /payment

Generate a new payment - Pix In.

**Request header:**

apiKey: Your API Key

**Response body fields:**

- `type`: Type of payment - Only `PIX` is available;
- `payer`: Data of the payer;
- `payer.fullName`: Full Name of Payer;
- `payer.document`: Document of Payer (CPF - only numbers);
- `payer.contact`: Contact of Payer Object;
- `payer.contact.phone`: Phone of Payer (DDD + Number - only numbers);
- `payer.contact.mail`: Mail of Payer;
- `payer.address`: Address of Payer Object;
- `payer.address.zipcode`: Address of Payer - Zipcode;
- `payer.address.street`: Address of Payer - Street;
- `payer.address.neighboor`: Address of Payer - Neighboor;
- `payer.address.number`: Address of Payer - Number;
- `payer.address.city`: Address of Payer - City;
- `payer.address.state`: Address of Payer - State;
- `payer.address.country`: Address of Payer - Country;
- `payer.transaction`: Data of Transaction;
- `payer.transaction.value`: Value of transaction;
- `payer.transaction.dueDate`: Expire date of transaction (Format: YYYY-MM-DD);
- `payer.transaction.description`: Optional - Description of Transaction;
- `payer.transaction.externalId`: Your business transaction ID from this payment. The webhook her called with this data to identifier there.

**Request body:**

```json
{
  "type": "PIX",
  "payer": {
    "fullName": "John Marvin",
    "document": "12345678910",
    "contact": {
      "phone": "11999999999",
      "mail": "your@email.com"
    },
    "address": {
      "zipCode": "60000000",
      "street": "Street Name",
      "neighboor": "Neighboor Name",
      "number": "123",
      "city": "City Name",
      "state": "State Name",
      "country": "Country Name"
    }
  },
  "transaction": {
    "value": 100,
    "description": "Description",
    "dueDate": "2021-01-01",
    "externalId": "unique-external-id"
  }
}
```

**Response example:**

```json
{
	"transactionId": "cd722e93-032f-45e1-b638-87a2490dcea7",
	"status": "WAITING_PAYMENT",
	"pixQrCode": "iVBORw0KGgoAAAANSUhEUgAABbQAAAW0CAYAAAAeooXXAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAIABJREFUeJzs2kGu5DqSRNFmI/a/ZfbwVw7+Q2XLM2UWfs4CBKdIKQIXOvfe+z8AAAAAABDuf98eAAAAAAAA...",
	"pixCode": "00020101021226880014br.gov.bcb.pix2566qrcode-h.fitbank.com.br/QR/cob/EEA7B851BBAFFB546073CE80810F56AA0F95204000053039865802BR5925VICTOR NERY TEIXEIRA CONS6009Sao Paulo610905726-10062070503***630498E0",
	"generateTime": "2023-04-14T02:58:04.997Z"
}
```

**Response example body:**
- `transactionId`: Our internal ID of this transaction;
- `status`: Status of this transaction;
- `pixQrCode`: Pix Image (QR Code) for this transaction;
- `pixCode`: Pix Code available for this transaction;
- `generateTime`: Generated time of this transaction;

### POST /payment/withdraw

Generate a new payment requisition - Pix OUT.

**Request header:**

apiKey: Your API Key


**Response body fields:**

- `type`: Type of payment - Only `PIX` is available;
- `value`: Value of transaction;
- `details`: Details of Transaction - Object;
- `details.key`: Details of Transaction;
- `details.keyType`: Type of Pix Key - You can use "DOCUMENT" or "MAIL" or "PHONE" or "RANDOM_KEY";
- `details.name`: Name of receiver;
- `details.document`: Document (CPF) of receiver;
- `externalId`: Details of Transaction - Object;

**Request Body:**

```json
{
  "value": 100,
  "type": "PIX",
  "details": {
    "key": "11999999999",
    "keyType": "PHONE",
    "name": "John Marvin",
    "document": "12345678910"
  },
  "externalId": "unique-external-id"
}
```

### GET /transaction/{id}

Get the details of a specific transaction.

**Request header:**

- `apiKey`: Your API Key (required, in header)

**Path Variables:**

- `id`: Transaction ID (required, in path)


## Webhook

When a transaction is updated, the following webhook will be sent:

```json
{
  "transactionId": "internal-transaction-id",
  "businessTransactionId": "business-transaction-id",
  "status": "PAID",
  "value": 100,
  "createdDate": "2021-01-01T00:00:00.000Z"
}
```

Description of fields:

- `transactionId`: Internal ID of the integration
- `businessTransactionId`: Your business transaction ID from this payment. This data is created at the moment of creation of Payment. On payment payload, this data is called "externalId"
- `status`: Status of the transaction (PAID or REFUND)
- `value`: Value of the transaction
- `createdDate`: Date of creation