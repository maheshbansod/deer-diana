<template>
    <div class="wrapper">
        <div class="mode-description">
            <slot name="description" />
        </div>
        <div class="content">
            <slot name="content" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.mode-description {
    padding: 1rem;
    background-color: #e6e6e6;
    margin-bottom: 1rem;
}

.content {
    display: flex;
    height: 100%;
}

@media only screen and (max-width: 600px) {
    .content {
        display: block;
    }
}
</style>