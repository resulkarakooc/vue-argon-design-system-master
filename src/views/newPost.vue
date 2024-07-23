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
                <h2>Yeni Gönderi</h2>
              </div>
            </template>
            <template>
              <div class="text-center text-muted mb-4">
                <small>Ne düşünüyorsun? :D</small>
              </div>
              <template>
                <form @submit.prevent="newpost" role="form">
                  <input placeholder="Başlık" class="form-control" v-model="title"> <br>
                  <input placeholder="Görsel URL" class="form-control" v-model="image"><br>
                  <input placeholder="İçerik" class="form-control" v-model="text"><br>

                  <div class="text-center">
                    <button type="primary" class="my-4 btn btn-primary" @click="newpost">
                      Gönder
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
import Cookies from "js-cookie";

export default {
  name: "App",
  data() {
    return {
      name: "",
      image: "",
      password: "",
      isPost: null,
      
    };
  },
  methods: {
    async newpost() {
      try {
        const response = await axios.post(
          "http://localhost:8084/api/post",
          {
            title : this.title,
            image: this.image,
            text: this.text,
            userId : Cookies.get('userId')
          }
        );

        if (response.status === 200) {
          this.isPost = true;
        } else {
          this.isPost = false;
        }
      } catch (error) {
        console.error("API çağrısı sırasında bir hata oluştu:", error);
        this.isPost = false;
      }
    },
  },
};
</script>
  
  
  <style>

</style>
  