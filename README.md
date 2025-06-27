# Academia App

Kullanıcı ve eğitim (education) yönetimi için TypeScript, Express ve Prisma ile hazırlanmış örnek REST API projesi.

## Özellikler

- Kullanıcı oluşturma (`POST /users`)
- Kullanıcı için eğitim bilgisi ekleme (`POST /education`)
- Kullanıcının eğitim bilgilerini getirme (`GET /user/education/:userId`)
- (Ek olarak) Kullanıcı ve eğitimler arasında ilişki
- Prisma ORM ve SQLite ile kolay kurulum

## Kurulum

1. **Projeyi klonla**
    ```sh
    git clone https://github.com/kullanici_adi/academia-app.git
    cd academia-app
    ```

2. **Bağımlılıkları yükle**
    ```sh
    npm install
    ```

3. **.env dosyasını oluştur (gerekirse)**
    - Varsayılan olarak SQLite kullanılır, ek bir ayar gerekmez.
    - Farklı DB kullanacaksan `.env` dosyası oluşturup url’i güncelle.

4. **Prisma migration ve client oluştur**
    ```sh
    npx prisma generate
    npx prisma migrate dev --name init
    ```

5. **Sunucuyu başlat**
    - Geliştirme için:
      ```sh
      npx ts-node-dev academia-app.ts
      ```
    - Derleyip çalıştırmak için:
      ```sh
      npx tsc
      node dist/academia-app.js
      ```

## Kullanım

### 1. Kullanıcı Oluştur (POST /users)
```http
POST /users
Content-Type: application/json

{
  "email": "johndoe@exaple.com",
  "username": "johndoe",
  "password": "password"
}
```

### 2. Eğitim Bilgisi Ekle (POST /education)

```http
POST /education
Content-Type: application/json

{
  "type": "UNI",        // Sadece: ILK_OKUL, ORTA_OKUL, LISE, UNI
  "city": "İstanbul",
  "department": "Bilgisayar Mühendisliği", // Sadece UNI için zorunlu
  "year": 2021,
  "userId": 1           // İlgili kullanıcının ID'si
}

```

### 3. Eğitimleri Listele (GET /user/education/:userId)

```http
GET /user/education/1
```

### Notlar

- Şifreler güvenlik için hash'lenmiyor, gerçek projede hash kullanılmalı.
- Department alanı sadece UNI için doldurulmalıdır.
- Aynı kullanıcıya aynı tip eğitim bir kez eklenebilir.
- Hatalar için JSON döner.

### Geliştirme İpuçları
Prisma Studio ile DB’yi görsel olarak inceleyebilirsin:

```
npx prisma studio
```

API isteklerini test etmek için Postman veya Insomnia kullanabilirsin.

Bu proje eğitim ve örnek amaçlıdır.