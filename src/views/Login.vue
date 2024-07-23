<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-muted text-center mb-3">
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/github.svg" />
                  Github
                </base-button>

                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/google.svg" />
                  Google
                </base-button>
              </div>
            </template>
            <template>
              <div class="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <form role="form">
                <input class="mb-3 form-control" placeholder="Username" v-model="name"  />

                <input
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  class="form-control"
                />
                <br />

                <p v-if="isLogin === true">Giriş Başarılı</p>
                <p v-if="isLogin === false">Giriş Başarısız</p>

                <base-checkbox> Remember me </base-checkbox>
                <div class="text-center">
                  <button type="button" class="my-4 btn btn-success" @click="Login">
                    Sign In
                  </button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light">
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a href="/#/register" class="text-light">
                <small>Create new account</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      name: "",
      password: "",
      isLogin: null, // Başlangıçta null yaparak başarılı/başarısız mesajlarının görünmesini engelleriz
      checked: false,
    };
  },
  methods: {
    async Login() {
      try {
        const response = await axios.get("http://localhost:8084/api/user"); // İstek atma
        const users = response.data;

        // Kullanıcı adı ve şifreyi kontrol et
        const user = users.find(
          (u) => u.userName === this.name && u.password === this.password
        );

        if (user) {
          // Kullanıcı başarılı bir şekilde giriş yaptıysa, bilgileri çerezlere kaydet
          Cookies.set("userId", user.id, { expires: 1 }); // 1 gün geçerlilik süresi
          Cookies.set("userName", user.userName, { expires: 1 });
          Cookies.set("userImageUrl", user.image, { expires: 1 });
          Cookies.set("isSession", true);

          const session = Cookies.get('isSession');
          console.log(session);
          this.isLogin = true;
          this.$router.push("/profile"); // Profil sayfasına yönlendirme
        } else {
          this.isLogin = false;
        }
      } catch (error) {
        console.error("API çağrısı sırasında bir hata oluştu:", error);
        this.isLogin = false;
      }
    },
  },
};
</script>

<style>
</style>
