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
                  Resul
                </base-button>
              </div>
            </template>
            <template>
              <div class="text-center text-muted mb-4">
                <small>Or sign up with credentials</small>
              </div>
              <template>
                <form @submit.prevent="Register" role="form">
                  <input class="mb-3" placeholder="Name" v-model="name" required/>
                  <input class="mb-3" placeholder="Image url"  v-model="image"/>
                  <input
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    required
                  />

                <br><br>
                  <div
                    id ="progress-bar"
                    :style="{ width: progress + '%' }"
                  ></div>
                  <p>{{ progress }}%</p>

                  <p v-if="isRegistered === true">Kayıt Başarılı</p>
                  <p v-if="isRegistered === false">Kayıt Başarısız</p>
                  <div class="text-muted font-italic">
                    <small>
                      password strength:
                      <span class="text-success font-weight-700">strong</span>
                    </small>
                  </div>
                  <base-checkbox>
                    <span>
                      I agree with the
                      <a href="#">Privacy Policy</a>
                    </span>
                  </base-checkbox>
                  <div class="text-center">
                    <button type="primary" class="my-4" @click="Register">
                      Create account
                    </button>
                  </div>
                </form>
              </template></template
            ></card
          >
        </div>
      </div>
    </div>
  </section>
</template>

            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      name: "",
      image:"",
      password: "",
      isRegistered: null,
      progress: 0,
    };
  },
  methods: {
    async Register() {
      this.progress = 0;

      // Simülasyon için ilerlemeyi artır
      const interval = setInterval(() => {
        if (this.progress < 50) {
          this.progress += 10;
        } else {
          clearInterval(interval);
        }
      }, 500);

      if (this.isSubmitting) return; // Eğer işlem zaten devam ediyorsa çık

      this.isSubmitting = true;
      console.log("methodun içindyiz");

      try {
        const response = await axios.post(
          "http://localhost:8084/api/user/register",
          {
            userName: this.name,
            password: this.password,
            image : this.image
          }
        );

        if (response.status === 200) {
          this.isRegistered = true;
          //this.$router.push('/login'); // Başarılı kayıt sonrası yönlendirme
        } else {
          this.isRegistered = false;
        }
      } catch (error) {
        console.error("API çağrısı sırasında bir hata oluştu:", error);
        this.isRegistered = false;
      }
    },
  },
};
</script>


<style>
#progress-bar {
  height: 20px;
  background-color: #4caf50;
  width: 0%;
  transition: width 0.4s;
}
</style>
