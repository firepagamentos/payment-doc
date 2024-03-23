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

**Errors**

- `200`: OK - Success - Payment request made successfully;
- `400`: Bad Request - Invalid payment type;
- `400`: Bad Request - Not possible to generate with negative value;
- `401`: Unauthorized - Invalid API Key;
- `500`: Internal Server Error - Communication error with Pix API;

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

**Errors**

- `200`: OK - Success - Withdraw request made successfully;
- `400`: Bad Request - Invalid payment type;
- `400`: Bad Request - Insufficient balance to withdraw;
- `401`: Unauthorized - Invalid API Key;
- `404`: Not Found - Business does not exist or is not active. Please contact financial support;
- `404`: Not Found - Transaction not found;
- `500`: Internal Server Error - Error generating withdrawal. No provider was able to generate the withdrawal;

### GET /payment/{id}

Get the details of a specific transaction.

**Request header:**

- `apiKey`: Your API Key (required, in header)

**Path Variables:**

- `id`: Transaction ID (required, in path)

**Response example:**

```json
{
  "_id": "uuid",
  "operation": {
    "type": "PAYMENT",
    "method": "PIX",
    "value": 20,
    "provider": "provider_bank",
    "status": "status",
    "chargeTableID": "uuid",
    "externalID": "uuid",
    "fee": 0.6,
    "result": 19.4,
    "info": {
      "finishedTransaction": false,
      "transactionWithError": false
    }
  },
  "negotiator": {
    "fullName": "USUARIO",
    "document": "12345678911",
    "clientType": "PF"
  },
  "businessId": "63f4edaa114abbd5f9d49cd7",
  "history": [
    {
      "status": "WAITING_CONFIRMATION",
      "error": [],
      "createdAt": "1999-04-17T19:23:24.848Z",
      "info": {
        "finishedTransaction": false,
        "transactionWithError": false
      }
    },
    {
      "status": "WAITING_PAYMENT",
      "info": {
        "finishedTransaction": false,
        "transactionWithError": false
      },
      "providerResponse": {
        "Success": "true",
        "Message": "ISI0001 - Método executado com sucesso",
        "DocumentNumber": 99999,
        "HashCode": "lorem ipsum",
        "QRCodeBase64": "lorem ipsum"
      },
      "createdAt": "1999-04-17T19:23:25.868Z"
    }
  ],
  "createdAt": "1999-04-17T19:23:24.858Z",
  "updatedAt": "1999-04-17T19:23:25.876Z",
  "__v": 0
}
```

## Webhook

When a transaction is updated, the following webhook will be sent:

```json
{
  "transactionId": "internal-transaction-id",
  "businessTransactionId": "business-transaction-id",
  "status": "PAID",
  "value": 100,
  "createdDate": "2021-01-01T00:00:00.000Z",
  "ReceiverBankISPB": "12345678",
  "ReceiverName": "John Marvin",
  "ReceiverDocumentNumber": "12345678910",
  "ReceiverBankName": "Bank Name",
  "ReceiverBankCode": "123",
  "ReceiverBankBranch": "1234",
  "ReceiverBankAccount": "123456",
  "ReceiverToBankAccountDigit": "1",
  "PayerBankISPB": "12345678",
  "PayerName": "John Doe",
  "PayerDocumentNumber": "12345678910",
  "PayerBankName": "Bank Name",
  "PayerBankCode": "123",
  "PayerBankBranch": "1234",
  "PayerBankAccount": "123456",
  "PayerBankAccountDigit": "1",
  "VoucherUrl": "https://voucher-url.com"
}
```

Description of fields:

- `transactionId`: Internal transaction ID;
- `businessTransactionId`: Business transaction ID;
- `status`: Status of the transaction - Possible statuses: PAID, REFUND;
- `value`: Value of the transaction;
- `createdDate`: Date and time when the transaction was created;
- `ReceiverBankISPB`: ISPB of the receiver;
- `ReceiverName`: Name of the receiver;
- `ReceiverDocumentNumber`: Document number of the receiver;
- `ReceiverBankName`: Name of the receiver's bank;
- `ReceiverBankCode`: Code of the receiver's bank;
- `ReceiverBankBranch`: Branch of the receiver's bank;
- `ReceiverBankAccount`: Account number of the receiver;
- `ReceiverToBankAccountDigit`: Account digit of the receiver;
- `PayerBankISPB`: ISPB of the payer;
- `PayerName`: Name of the payer;
- `PayerDocumentNumber`: Document number of the payer;
- `PayerBankName`: Name of the payer's bank;
- `PayerBankCode`: Code of the payer's bank;
- `PayerBankBranch`: Branch of the payer's bank;
- `PayerBankAccount`: Account number of the payer;
- `PayerBankAccountDigit`: Account digit of the payer;
- `VoucherUrl`: URL of the receipt of the transaction;
