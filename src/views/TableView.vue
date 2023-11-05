<template>
  <div class="flex-c-c outer-container">
    <main class="main-card rc">
      <div class="left-content">
        <h1 class="jockey rc text-center">Create Table Reservation</h1>
        <div>
          <form class="flex column gap-big" @submit="">
            <div class="input-container">
              <label>Choose a Date</label>
              <input type="date">
            </div>

            <div class="input-container">
              <label>Choose a Time</label>
              <input type="time">
            </div>

            <div class="input-container">
              <label>Number of Guests <span class="font-normal italic">max 6</span></label>
              <input type="number" min="1" max="6">
            </div>

            <button class="main-btn-full reserve-btn">Make Reservation</button>
          </form>
        </div>
      </div>
      <div class="img-container">
        <img src="../images/table.webp" alt="" class="table-image">
      </div>
    </main>
  </div>
</template>

<style scoped>
.reserve-btn{
  letter-spacing:2px;
}
.left-content{
  padding:2rem;
}
.table-image{
  min-height:100%;
  object-fit:cover;
  border-radius: 0 1rem 1rem 0;
  
}
.main-card{
  background: rgb(0, 0, 0);
  width: clamp(350px, 60rem, 100rem);
  display:grid;
  gap:1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
.outer-container{
  min-height:100vh;
}
form{
  margin-top:2rem;
}
label{
  font-size:1.8rem;
  font-family:'Jockey';
}
.input-container{
  display:flex;
  flex-direction: column;
}
input{
  border-radius: 5px;
  border: 1px solid black;
  width:100%;
  height: 3rem;
  padding-left:1.25rem;
  background: #514c57;
  font-size: 1.4rem;
}

</style>