import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertArticleSchema, type Article, type InsertArticle } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import SmartEditor from "./SmartEditor";

interface ArticleFormProps {
  article?: Article | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ArticleForm({ article, onSuccess, onCancel }: ArticleFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertArticle>({
    resolver: zodResolver(insertArticleSchema),
    defaultValues: article
      ? {
          title: article.title,
          summary: article.summary,
          content: article.content || "",
          category: article.category as "world" | "politics" | "technology" | "sports" | "business",
          language: article.language as "en" | "ar",
          author: article.author,
          imageUrl: article.imageUrl || "",
          readMinutes: article.readMinutes || 5,
          isBreaking: article.isBreaking || false,
          publishedAt: article.publishedAt || undefined,
        }
      : {
          title: "",
          summary: "",
          content: "",
          category: "world" as const,
          language: "en" as const,
          author: "",
          imageUrl: "",
          readMinutes: 5,
          isBreaking: false,
        },
  });

  const onSubmit = async (data: InsertArticle) => {
    setIsSubmitting(true);
    try {
      if (article) {
        await apiRequest("PATCH", `/api/articles/${article.id}`, data);

        toast({
          title: "Success",
          description: "Article updated successfully",
        });
      } else {
        await apiRequest("POST", "/api/articles", data);

        toast({
          title: "Success",
          description: "Article created successfully",
        });
      }

      await queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      onSuccess?.();
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${article ? "update" : "create"} article`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter article title"
                    {...field}
                    data-testid="input-title"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter article summary"
                    rows={3}
                    {...field}
                    data-testid="input-summary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <SmartEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="اكتب محتوى المقال هنا... يمكنك استخدام الأزرار أعلاه للتنسيق"
                    minHeight="400px"
                    data-testid="smart-editor-content"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="world">World</SelectItem>
                    <SelectItem value="politics">Politics</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger data-testid="select-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter author name"
                    {...field}
                    data-testid="input-author"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="readMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Read Time (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="5"
                    value={field.value || 5}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 5)}
                    data-testid="input-read-minutes"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter image URL"
                    {...field}
                    value={field.value || ""}
                    data-testid="input-image-url"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isBreaking"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-md border p-4 md:col-span-2">
                <div className="space-y-0.5">
                  <FormLabel>Breaking News</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Mark this article as breaking news
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                    data-testid="switch-breaking"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 justify-end">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            data-testid="button-submit"
          >
            {isSubmitting
              ? "Saving..."
              : article
              ? "Update Article"
              : "Create Article"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
