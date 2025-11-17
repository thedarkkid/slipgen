<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TextInput from '@/components/TextInput.vue';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import DatePicker from '@/components/DatePicker.vue';
import { Button } from '@/components/ui/button/index.js';
import Heading from '@/components/Heading.vue';

const form = useForm({
    name: '',
    designation: '',
    paymentMethod: '',
    date: new Date(),
    payments: [
        {
            name: '',
            net: 0,
            earnings: [
                {name: '', percentage: '0'}
            ],
            deductions: [
                {name: '', percentage: '0'}
            ]
        }
    ],
});

function removeItem<T>(arr: Array<T>, index: number): Array<T> {
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function add(field: 'earnings' | 'deductions', index: number){
    form.payments[index][field].push({name: '', percentage: '0'});
}

function remove(field: 'earnings' | 'deductions', index1: number, index: number){
    form.payments[index][field] = removeItem(form.payments[index1][field], index);
}

function addPayment(){
    form.payments.push({
        name: '',
        net: 0,
        earnings: [
            {name: '', percentage: '0'}
        ],
        deductions: [
            {name: '', percentage: '0'}
        ]
    });
}

const submit = () => {
    console.log("submitting");
    form.post(route('payslips.create'), {
        onFinish: (r) => console.log(r.data),
    });
}
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg p-5">
                    <h1 class="pb-4">Create Payslip</h1>
                    <form @submit.prevent="submit">
                        <div class="flex w-full justify-start mb-2">
                            <div class="mr-2">
                                <InputLabel for="paymentDate" value="Payment Date" />
                                <DatePicker
                                    id="paymentDate"
                                    v-model="form.date"
                                />
                                <InputError class="mt-2" />
                            </div>
                            <div class="">
                                <InputLabel for="paymentMethod" value="Mode of Payment" />

                                <select class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-[6px]"
                                        name="paymentMethod" id="paymentMethod"
                                        v-model="form.paymentMethod">
                                    <option value="">--Please choose an option--</option>
                                    <option value="Funds Transfer">Funds Transfer</option>
                                    <option value="Cheque">Cheque</option>
                                </select>

                                <InputError class="mt-2" />
                            </div>
                        </div>
                        <div class="flex w-full justify-between mb-2">
                            <div class="w-[48%]">
                                <InputLabel for="name" value="Employee Name" />

                                <TextInput
                                    v-model="form.name"
                                    id="name"
                                    type="text"
                                    class="mt-1 w-full"
                                    required
                                    autofocus
                                    autocomplete="employeeName"
                                />

                                <InputError class="mt-2" />
                            </div>
                            <div class="w-[48%]">
                                <InputLabel for="designation" value="Employee Designation" />

                                <TextInput
                                    id="designation"
                                    v-model="form.designation"
                                    type="text"
                                    class="mt-1 w-full"
                                    required
                                    autofocus
                                    autocomplete="username"
                                />

                                <InputError class="mt-2" />
                            </div>
                        </div>
                        <div class="w-full flex justify-between">
                            <Heading title="Payments" id="payments" class="mt-10 mb-2" />
<!--                            <PrimaryButton @click.prevent="addPayment" class="ms-4 px-1">-->
<!--                                +-->
<!--                            </PrimaryButton>-->
                        </div>
                        <div v-for="(payment, index1) in form.payments" :key="index1">
                            <div class="w-full flex justify-start mb-2 mt-4 ">
                                <div class="w-half mr-4">
                                    <InputLabel for="paymentName" value="Payment Name" />
                                    <TextInput
                                        v-model="payment.name"
                                        id="paymentName"
                                        type="text"
                                        class="mt-1 w-half"
                                        required
                                        autofocus
                                        autocomplete="paymentName"
                                    />
                                </div>
                                <div class="w-half">
                                    <InputLabel for="netPayment" value="Total Net Payment" />
                                    <TextInput
                                        v-model="payment.net"
                                        id="netPayment"
                                        type="text"
                                        class="mt-1 w-half"
                                        required
                                        autofocus
                                        autocomplete="netPayment"
                                    />
                                </div>
                            </div>
                            <div class="w-full flex justify-between mb-2 mt-4 ">
                                <div class="w-[48%]">
                                    <h3>Earnings | Percentages</h3>
                                    <div class="w-[80%]" v-for="(earning, index) in payment.earnings" :key="index">
                                        <TextInput
                                            v-model="earning.name"
                                            :id="`earning-${index1}-${index}`"
                                            type="text"
                                            class="mt-1 w-[40%] mr-2"
                                            placeholder="Item"
                                            required
                                            autofocus
                                            autocomplete="employeeName"
                                        />
                                        <TextInput
                                            v-model="earning.percentage"
                                            :id="`earning-percentage-${index1}-${index}`"
                                            type="number"
                                            class="mt-1 w-[20%]"
                                            placeholder="percentage"
                                            required
                                            autofocus
                                            autocomplete="employeeName"
                                        />
                                        <Button variant="outline" v-if="index !== 0" @click.prevent="remove('earnings', index1, index)"
                                                class="ms-4">
                                            -
                                        </Button>
                                        <PrimaryButton v-if="index === payment.earnings.length -1" @click.prevent="add('earnings', index1)" class="ms-4">
                                            +
                                        </PrimaryButton>
                                    </div>
                                </div>
                                <div class="w-[48%]">
                                    <h3>Deductions | Percentages</h3>
                                    <div class="w-[80%]" v-for="(deductions, index) in payment.deductions" :key="index">
                                        <TextInput
                                            v-model="deductions.name"
                                            :id="`deductions-${index1}-${index}`"
                                            type="text"
                                            class="mt-1 w-[40%] mr-2"
                                            placeholder="Item"
                                            required
                                            autofocus
                                            autocomplete="employeeName"
                                        />
                                        <TextInput
                                            v-model="deductions.percentage"
                                            :id="`deductions-percentage-${index1}-${index}`"
                                            type="number"
                                            class="mt-1 w-[20%]"
                                            placeholder="percentage"
                                            required
                                            autofocus
                                            autocomplete="employeeName"
                                        />
                                        <Button variant="outline" v-if="index !== 0" @click.prevent="remove('deductions', index1, index)"
                                                class="ms-4">
                                            -
                                        </Button>
                                        <PrimaryButton v-if="index === payment.deductions.length -1" @click.prevent="add('deductions', index1)" class="ms-4">
                                            +
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>

                        </div>
                    <div class="mt-4 flex items-center justify-end">
                        <PrimaryButton @click.prevent="submit" class="ms-4">
                            Generate Payslip
                        </PrimaryButton>
                    </div>
                    </form>

                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<style>
#payments {
    margin-bottom: .5rem !important;
}
</style>
