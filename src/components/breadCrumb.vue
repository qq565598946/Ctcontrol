<script>
export default {
    

    data() {
        return {
            
            
        }
    },
    computed:{
        
    }
    
}
</script>


<template>
<Breadcrumb class="breadNav">
    <BreadcrumbItem :to="item.path" v-for="(item,index) in $bus.routerBread" :key="index" >{{item.name}}</BreadcrumbItem>
</Breadcrumb> 
</template>

<style scoped>

</style>
