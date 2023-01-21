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
    padding: 0.5rem;
    background-color: var(--color-background-description);
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