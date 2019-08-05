<template>
    <div>
        
    </div>
</template>


<script>
export default {
    data() {
        return{
            id: this.$route.params.id
        }
    },
    created() {
        console.log("id:", this.id)
        window.open(this.id)
    }
}
</script>