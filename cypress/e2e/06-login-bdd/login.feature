# language: tr
@login
Özellik: Kullanıcı Girişi

  ZincBank müşterisi olarak
  hesabıma giriş yapabilmek istiyorum
  böylece dashboard'uma ve bankacılık işlemlerime erişebileyim.

  Arka Plan:
    Diyelim ki Login sayfasındayım

  Senaryo: Geçerli bilgilerle başarılı giriş
    Eğer Geçerli bilgilerle giriş yaparım
    O zaman Dashboard sayfasındayım
    Ve Karşılama mesajını görürüm

  Senaryo: Hatalı şifre ile giriş reddedilir
    Eğer "student01@zinc.test" emaili ve "yanlis-sifre" şifresi ile giriş yaparım
    O zaman "Invalid email or password." hata mesajını görürüm

  Senaryo: Çıkış yapma
    Diyelim ki Geçerli bilgilerle giriş yaptım
    O zaman Dashboard sayfasındayım
    Eğer Çıkış yaparım
    O zaman Login sayfasına geri döndüm
