import { useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";

export function useRegisterSurveryModelView() {
    const { params } = useRoute();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    return {
        control,
        handleSubmit,
        errors,
        params,
    };
}
