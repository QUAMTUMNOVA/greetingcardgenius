{
    "id": "2a396f97-92f4-3075-98fa-43acf6e87412",
    "name": "payment_intent.succeeded",
    "account_id": "acct_t6nlGSCgPpWIBE-3ncOTxA",
    "data": {
      "object": {
        "additional_info": {
          "enhanced_scheme_data": {
            "customer": {
              "first_name": "John",
              "last_name": "Doe",
              "reference": "CUST12345"
            },
            "customer_tax_identifier": "DE123456789",
            "duty_amount": 12.01,
            "invoice_reference": "INV2023000123",
            "local_tax_amount": 10.01,
            "merchant_reference": "MER2749372932",
            "merchant_tax_identifier": "202312345K",
            "national_tax_amount": 5.54,
            "products": [
              {
                "code": "3414314111",
                "commodity_code": "08081000",
                "desc": "IPHONE 7",
                "discount_amount": 1.01,
                "quantity": 5,
                "tax_percent": 10.55,
                "total_amount": 45.05,
                "total_tax_amount": 1.01,
                "unit": "EAC",
                "unit_price": 10.02
              }
            ],
            "shipping": {
              "address": {
                "city": "Shanghai",
                "country_code": "CN",
                "postcode": "100000",
                "state": "Shanghai",
                "street": "Pudong District"
              },
              "date": "2024-09-29",
              "fee_amount": 1.5,
              "from_postcode": "100000"
            },
            "summary_commodity_code": "12345678",
            "total_tax_amount": 15.55,
            "vat_invoice_reference": "INV2023000123"
          },
          "customer_activity_data": {
            "account_type": "VIP",
            "first_successful_order_date": "2019-09-18",
            "last_login_ip_address": "212.121.222.123",
            "last_modified_at": "2019-09-18T12:30:00Z",
            "linked_social_networks": [
              {
                "email": "john.doe@airwallex.com",
                "name": "TWITTER",
                "profile_id": "johnd0e123"
              }
            ],
            "purchase_summaries": [
              {
                "currency": "USD",
                "first_successful_purchase_date": "2019-01-01",
                "last_successful_purchase_date": "2019-01-01",
                "payment_method_type": "klarna",
                "successful_purchase_amount": 123.45,
                "successful_purchase_count": 1
              }
            ],
            "registered_via_social_media": false,
            "registration_date": "2019-09-18",
            "registration_ip_address": "212.121.222.123"
          }
        },
        "amount": 10,
        "original_amount": 10,
        "original_currency": "HKD",
        "captured_amount": 10,
        "created_at": "2024-10-02T15:40:21+0000",
        "currency": "HKD",
        "descriptor": "vip8888",
        "id": "int_sgst8jdw8h0herze16s",
        "latest_payment_attempt": {
          "amount": 10,
          "authentication_data": {
            "avs_result": "unmatched",
            "cvc_code": "M",
            "cvc_result": "matched",
            "ds_data": {
              "retry_count_for_auth_decline": 0
            },
            "fraud_data": {
              "action": "VERIFY",
              "risk_factors": [
                {
                  "description": "Transaction triggered force 3DS"
                }
              ],
              "score": "0"
            }
          },
          "authorization_code": "NOJVKV",
          "captured_amount": 0,
          "created_at": "2024-10-02T15:40:21+0000",
          "currency": "HKD",
          "id": "att_sgst8jdw8h0herzl2bk_rze16s",
          "merchant_order_id": "a647fd73-b71f-4f0b-b25b-42c794655bc5",
          "payment_intent_id": "int_sgst8jdw8h0herze16s",
          "payment_method": {
            "card": {
              "billing": {
                "address": {
                  "city": "Shanghai",
                  "country_code": "CN",
                  "postcode": "201304",
                  "state": "Shanghai",
                  "street": "Pudong District"
                },
                "date_of_birth": "2011-10-12",
                "email": "test@example.com",
                "first_name": "Jim",
                "last_name": "He",
                "phone_number": "1367875786"
              },
              "bin": "22230000",
              "brand": "mastercard",
              "card_type": "CREDIT",
              "expiry_month": "11",
              "expiry_year": "2025",
              "fingerprint": "aE6wrBilLBQ/T/fWK1t95AjBL2I=",
              "is_commercial": false,
              "issuer_country_code": "US",
              "issuer_name": "MTF INTERNAL MEMBER ID - USA",
              "last4": "1375",
              "name": "mastercard2",
              "number_type": "PAN"
            },
            "type": "card"
          },
          "payment_method_options": {
            "card": {
              "authorization_type": "final_auth"
            }
          },
          "provider_original_response_code": "00",
          "provider_transaction_id": "MABIDTYSS1002",
          "refunded_amount": 0,
          "settle_via": "airwallex",
          "status": "AUTHORIZED",
          "updated_at": "2024-10-02T15:40:26+0000"
        },
        "merchant_order_id": "a647fd73-b71f-4f0b-b25b-42c794655bc5",
        "order": {
          "products": [
            {
              "code": "3414314111",
              "desc": "test desc",
              "name": "IPHONE7",
              "quantity": 5,
              "sku": "piece",
              "type": "physical",
              "unit_price": 10,
              "url": "test_url"
            }
          ],
          "type": "v_goods"
        },
        "payment_method_options": {
          "card": {}
        },
        "request_id": "38aef22a-3d63-43c1-850c-714bcafd03ec",
        "risk_control_options": {
          "skip_risk_processing": true
        },
        "status": "SUCCEEDED",
        "updated_at": "2024-10-02T15:40:26+0000"
      }
    },
    "created_at": "2025-04-19T09:44:36+0000",
    "version": "2025-02-14"
  }