<template>
    <div>
        <div class="beconfirmed"> 
          <div style="margin-left:10px;">
              <span></span> 
                 <slot></slot>
          </div>
         </div>
    </div>
</template>
<style scoped>
.beconfirmed{
    font-weight: bold;
    font-size: 17px;
    padding: 0px 8px; 
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
}

.beconfirmed span{
    position: absolute;
    top: 3px;
    left: 9px;
    width: 4px;
    height: 18px;
    background-color: #0B8FFFFF;
}
</style>