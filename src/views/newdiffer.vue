<template>
  <div class="container">
    <div id="">
      <div class="card">
        <div class="row">
          <div class="col">
            <h4 class="text-center"> مقاله قدیمی</h4>
            <div class="card" id="outputOriginal"></div>
          </div>
          <div class="col">
            <h4 class="text-center">تغییرات</h4>
            <div class="card" id="output"></div>
          </div>
          <div class="col">
            <h4 class="text-center"> مقاله جدید</h4>
            <div class="card" id="outputNew"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import differ from "../classes/differ";
export default {
  name: "newdiffer",
  data() {
    return {};
  },
  methods: {},
  mounted() {

    let originalHTML = `
    <h5 class="text-center">چگونه از افزایش عصبانیت کودکان در محیط خانه جلوگیری کنیم؟</h5><p class="text-right">بیماری کرونا موجب ایجاد احساساتی نظیر اضطراب، استرس و پرخاشگری می گردد. این احساسات به ویژه در میان کودکان و نوجوانان، در سنین مختلف، بیشتر دیده می شوند اما با راهکارهایی می‌توان از بروز این احساسات در کودکان جلوگیری کرد.</p><div class="uploaderwrap custom-file my-3"><img class="img-fluid" src="https://img.tebyan.net/big/1400/02/542042816231242174116901885222126595592.jpg" alt="کرونا" title="کرونا" /><p class="figcaption">کرونا</p></div><p class="text-right">تعطیلی مدارس و شرایط قرنطینه ناشی از کرونا سبب شده تغییرات زیادی در خانواده­‌ها و همچنین رفتار فرزندان در محیط خانه اتفاق بیفتد. اینکه والدین چگونه با این تغییرات روبرو شوند و چه عکس‌­العمل و واکنشی نسبت به این رفتارها داشته باشند می‌­تواند در کاهش استرس و اضطراب کودکان در این دوران کمک چشمگیری کند. راهکارهایی برای جلوگیری از افزایش دعوا و عصبانیت کودکان در محیط خانه و همچنین ترس و اضطراب و اختلالات شبانه از جمله   مواردی است که در این گزارش به آنها پرداخته شده است</p><h5 class="text-right">دعوا و عصبانیت کودکان</h5><p class="text-right">یکی از تغییرات رایج فرزندان که والدین در زمان بحران کرونا با آن مواجه می­‌شوند افزایش درگیری و پرخاشگری است. این ماجرا واکنش طبیعی کودکان به تغییراتی است که در حال تجربه آن هستند. فعالیت‌های روزمره کودکان و نوع ارتباط والدین با آنها بر رفتار کودکان تأثیر می­‌گذارد. بنابراین <mark class="cdx-marker">راهکار مناسب برای جلوگیری از دعوا و پرخاشگری کودکان در محیط خانه، داشتن قوانین مشخص و روشن در مورد کارهایی است که فرزندان مجاز یا غیرمجاز به انجام آن هستند.</mark></p>
`;

    let newHTML = `
<h5 class="text-center">چگونه از افزایش عصبانیت کودکان در محیط خانه جلوگیری کنیم؟</h5><p class="text-right">بیماری کرونا موجب ایجاد احساساتی نظیر اضطراب، استرس و پرخاشگری می گردد. این احساسات به ویژه در میان کودکان و نوجوانان، در سنین مختلف، بیشتر دیده می شوند اما با راهکارهایی می‌توان از بروز این احساسات در کودکان جلوگیری کرد.</p><p class="text-right">تعطیلی مدارس و شرایط قرنطینه ناشی از کرونا سبب نشده تغییرات زیادی در خانواده­‌ها و همچنین رفتار فرزندان در محیط اتاق اتفاق بیفتد. اینکه والدین چگونه با این تغییرات روبرو شوند و چه عکس‌­العمل و واکنشی نسبت به این رفتارها داشته باشند می‌­تواند در کاهش استرس و اضطراب کودکان در این دوران کمک چشمگیری نمیکند. </p><p class="text-right">راهکارهایی برای جلوگیری از افزایش دعوا و عصبانیت کودکان در محیط خانه و همچنین ترس و اضطراب و اختلالات شبانه از جمله   مواردی است که در این گزارش به آنها پرداخته شده است</p><p class="text-right">این خط به متن اضافه شده است</p><h5 class="text-right">دعوا و عصبانیت کودکان</h5><p class="text-right">&nbsp;افزایش درگیری و پرخاشگری است. این ماجرا واکنش طبیعی کودکان به تغییراتی است که در حال تجربه آن هستند. فعالیت‌های روزمره کودکان و نوع ارتباط والدین با آنها بر رفتار کودکان تأثیر می­‌گذارد. بنابراین <mark class="cdx-marker">راهکار مناسب برای جلوگیری از دعوا و پرخاشگری کودکان در محیط خانه، داشتن قوانین مشخص و روشن در مورد کارهایی است که فرزندان مجاز یا غیرمجاز به انجام آن هستند.</mark></p><div class="uploaderwrap custom-file my-3"><img class="img-fluid" src="https://img.tebyan.net/big/1400/02/12810012215513984162323116173176121749123.jpg" alt="اکسیژن" title="اکسیژن خون" /><p class="figcaption">اکسیژن خون</p></div>
`;
// Diff HTML strings
let output = differ(originalHTML, newHTML);

// Show HTML diff output as HTML (crazy right?)!
document.getElementById("output").innerHTML = output;
document.getElementById("outputOriginal").innerHTML = originalHTML;
document.getElementById("outputNew").innerHTML = newHTML;
  },
};
</script>

<style>
html,
body {
  font: normal 14px/1.4 sans-serif;
  background: #f1f1f1;
}

p {
  margin: 0 0 1rem;
}

ins {
  background: lightgreen;
  text-decoration: none;
}

del {
  background: pink;
}

table {
  border-collapse: collapse;
  width: 100%;
}
table td {
  border: 1px solid #ccc;
}

.card {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 1rem;
  padding: 1rem;
}

.card .card {
  margin: 0;
  flex: 1 0 0;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-right: -8px;
}

.col {
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  margin-right: 8px;
}
</style>