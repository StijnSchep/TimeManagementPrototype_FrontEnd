<template>
    <Page class="body" actionBarHidden="true">
        <FlexboxLayout class="page">
            <Label :text="'Welkom ' + employee.firstname + ' ' + employee.lastname" class="welcome-txt"/>
            <ActivityIndicator :busy="busy" color="#fff" @busyChange="onBusyChanged" />
        </FlexboxLayout>
    </Page>
</template>

<script>
    import Dashboard from "../dashboard/Dashboard";

    export default {
        props: ['employee', 'token'],
        data() {
            return {
                busy: true
            }
        },
        methods: {
            onBusyChanged() {
                this.goToDashboard()
            },
            goToDashboard() {
                this.$navigateTo(Dashboard, {
                    clearHistory: true,
                    transition: {
                        name: 'fade',
                        duration: 400
                    },
                    props: {
                        token: this.token
                    }
                })
            },
            sleep(self) {
                setTimeout(() => {
                    self.busy = false;
                }, 2000)
            }
        },
        created() {
            this.sleep(this);
        }
    }
</script>

<style scoped>
    .body {
        background-image: url("~/assets/images/SplashScreen.jpg");
        background-repeat: no-repeat;
        background-position: center top;
        background-size: cover;
    }

    .page {
        align-items: center;
        vertical-align: center;
        flex-direction: column;
    }

    .welcome-txt {
        text-align: center;
        color: white;
        font-size: 30px;
        margin-bottom: 10px;
    }
</style>
